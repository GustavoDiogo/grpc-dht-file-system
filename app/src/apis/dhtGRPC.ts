import * as crypto from 'crypto';
import { DHTClient } from '../client';
import { JoinRequest, KeyValue } from '../proto/dht_pb';

type NodeId = string;
type Key = string;

const M_BITS = 160; // Tamanho dos identificadores e chaves em bits

interface Node {
  id: NodeId;
  ip: string;
  port: number;
  predecessor: Node | null;
  successor: Node;
  data: Map<Key, Buffer>;
}

export class DHTNode implements Node {
  id: NodeId;

  ip: string;

  port: number;

  predecessor: Node | null = null;

  successor: Node;

  data: Map<Key, Buffer> = new Map();

  constructor(ip: string, port: number, id?: NodeId) {
    this.ip = ip;
    this.port = port;
    this.id = id ?? this.generateRandomId();
    this.successor = this; // Inicialmente, o nó aponta para si mesmo
  }

  generateRandomId(): NodeId {
    return crypto.randomBytes(M_BITS / 8).toString('hex');
  }

  private hashKey(key: Key): NodeId {
    return crypto.createHash('sha1').update(key).digest('hex');
  }

  between(id: NodeId, start: NodeId, end: NodeId): boolean {
    if (start < end) {
      return id > start && id <= end;
    } else {
      return id > start || id <= end;
    }
  }

  async join(knownHosts: { ip: string; port: number }[]): Promise<void> {
    if (knownHosts.length === 0) {
      // Se não houver hosts conhecidos, este nó é o primeiro na rede
      this.predecessor = null;
      this.successor = this;
      console.log(`Nó inicializado como o primeiro na rede: ${this.ip}:${this.port}`);
    } else {
      let connected = false;
  
      for (const host of knownHosts) {
        try {
          const client = new DHTClient(host.ip, host.port);
          const joinResponse = await client.join(this.ip, this.port, this.id);
  
          if (joinResponse.getNodeid() === this.id || 
              (joinResponse.getSuccessorip() === this.ip && joinResponse.getSuccessorport() === this.port) ||
              (joinResponse.getPredecessorip() === this.ip && joinResponse.getPredecessorport() === this.port)) {
            console.warn(`Loop detectado: Recebido próprio ID ou conectado de volta a si mesmo (${this.ip}:${this.port}). Ignorando este nó para evitar loop.`);
            continue;
          }
  
          this.successor = this.createNode(joinResponse.getSuccessorip(), joinResponse.getSuccessorport(), joinResponse.getNodeid());
          this.predecessor = this.createNode(joinResponse.getPredecessorip(), joinResponse.getPredecessorport());
          this.successor.predecessor = this;
  
          if (this.predecessor && this.predecessor.ip && this.predecessor.port && this.predecessor.id !== this.id) {
            const predecessorClient = new DHTClient(this.predecessor.ip, this.predecessor.port);
            await predecessorClient.newNode(this.ip, this.port);
          }
  
          await this.transferDataToNewNode();
          connected = true;
          console.log(`Nó conectado com sucesso: ${this.ip}:${this.port}`);
          break;
        } catch (error) {
          console.error(`Erro ao tentar conectar ao nó ${host.ip}:${host.port}:`, error);
        }
      }
  
      if (!connected) {
        console.warn('Falha ao conectar a nós conhecidos. Este nó será o primeiro na rede.');
        this.predecessor = null;
        this.successor = this;
      }
    }
  }
  
    
  async leave(): Promise<void> {
    console.log('(API DHT)', `Node ${this.ip}:${this.port} leaving the DHT`);

    if (this.predecessor) {
      const predecessorClient = new DHTClient(this.predecessor.ip, this.predecessor.port);
      await predecessorClient.nodeGone(this.successor.id, this.successor.ip, this.successor.port);
    }
    if (this.successor) {
      await this.transferDataToSuccessor();
      this.successor.predecessor = this.predecessor;
    }
  }

  async store(key: Key, value: Buffer): Promise<void> {
    const hashedKey = this.hashKey(key);
    const responsibleNode = await this.findSuccessor(hashedKey);
  
    if (responsibleNode.id === this.id) {
      // Armazena localmente se este nó é o responsável pela chave
      this.data.set(key, value);
      console.log(`Chave ${key} armazenada no nó ${this.id} (${this.ip}:${this.port})`);
    } else {
      // Caso contrário, encaminha para o nó responsável sem alterar a estrutura da DHT
      const client = new DHTClient(responsibleNode.ip, responsibleNode.port);
      await client.store(key, value);
    }
  }
  
  async retrieve(key: Key) {
    const hashedKey = this.hashKey(key);
    const responsibleNode = await this.findSuccessor(hashedKey);
  
    if (responsibleNode.id === this.id) {
      // Recupera localmente se este nó é o responsável pela chave
      const value = this.data.get(key) || null;
      console.log(`Chave ${key} recuperada no nó ${this.id} (${this.ip}:${this.port})`);
      return value;
    } else {
      // Encaminha para o nó responsável sem alterar a estrutura da DHT
      const client = new DHTClient(responsibleNode.ip, responsibleNode.port);
      const retrieveResponse = await client.retrieve(key);

      return retrieveResponse.getValue_asU8();
    }
  }
  

  private async findSuccessor(id: NodeId): Promise<Node> {
    if (this.between(id, this.id, this.successor.id) || this.id === this.successor.id) {
      return this.successor;
    } else if (this.successor.id === this.id) {
      // Se o sucessor aponta para si mesmo, significa que este é o único nó na rede
      return this;
    } else {
      // Encaminha a busca para o sucessor sem alterar a estrutura da DHT
      const client = new DHTClient(this.successor.ip, this.successor.port);

  
      const response = await client.join(this.ip, this.port, id);

      return this.createNode(response.getSuccessorip(), response.getSuccessorport(), response.getNodeid());
    }
  }
  

  async transferDataToNewNode(): Promise<void> {
    const keysToTransfer: Key[] = [];
    for (const [key, value] of this.successor.data.entries()) {
      if (this.between(this.hashKey(key), this.predecessor!.id, this.id)) {
        this.data.set(key, value);
        keysToTransfer.push(key);
      }
    }
    for (const key of keysToTransfer) {
      this.successor.data.delete(key);
    }
  }

  private async transferDataToSuccessor(): Promise<void> {
    const dataToTransfer: KeyValue[] = [];
    for (const [key, value] of this.data.entries()) {
      dataToTransfer.push(new KeyValue().setKey(key).setValue(value));
    }
    this.data.clear();

    const client = new DHTClient(this.successor.ip, this.successor.port);
    await client.transfer(dataToTransfer);
  }

  createNode(ip: string, port: number, id?: NodeId): Node {
    return {
      id: id || this.generateRandomId(),
      ip,
      port,
      predecessor: null,
      successor: this, // Referência a este nó como sucessor para simplificação
      data: new Map(),
    };
  }
}