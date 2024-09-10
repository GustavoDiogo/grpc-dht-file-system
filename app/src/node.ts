import {
  KeyValue,
} from './proto/dht_pb';
import crypto from 'crypto';
import { DHTClient } from './DHTClient';

type NodeId = string;
type Key = string;

const M_BITS = 160; // Tamanho dos identificadores e chaves em bits

export class Node {
  id: NodeId;

  ip: string;

  port: number;

  predecessor: Node | null = null;

  successor: Node;

  data: Map<Key, Uint8Array> = new Map();

  constructor(ip: string, port: number, id?: NodeId) {
    this.ip = ip;
    this.port = port;
    this.id = id ?? this.generateRandomId();
    this.successor = this; // Inicialmente, o nó aponta para si mesmo
  }

  private generateRandomId(): NodeId {
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
      console.log('(API DHT)', `JOIN - Nenhum nó conhecido. Inicializando a rede para ${this.ip}:${this.port}.`);
      this.predecessor = null;
      this.successor = this;
    } else {
      console.log('(API DHT)', `JOIN - Recebido pedido de JOIN para ${this.ip}:${this.port} de ${knownHosts.map(host => `${host.ip}:${host.port}`).join(', ')}`);
      for (const host of knownHosts) {
        const client = new DHTClient(host.ip, host.port);
        const joinResponse = await client.findSuccessor(this.ip, this.port, this.id); // Novo método findSuccessor

        this.successor = this.createNode(joinResponse.getSuccessorip(), joinResponse.getSuccessorport(), joinResponse.getNodeid());

        // Atualiza o predecessor do sucessor para este nó
        const successorClient = new DHTClient(this.successor.ip, this.successor.port);
        await successorClient.newNode(this.ip, this.port);

        if (joinResponse.getPredecessorip()) {
          this.predecessor = this.createNode(joinResponse.getPredecessorip(), joinResponse.getPredecessorport());
        } else {
          this.predecessor = null;
        }

        await this.transferDataToNewNode();
        break;
      }
    }
  }

  async leave(): Promise<void> {
    if (this.successor && this.successor.id !== this.id) {
      // Verifica se o predecessor não é nulo antes de enviar a mensagem NODE_GONE
      if (this.predecessor) {
        // Notifica o sucessor que este nó está saindo e informa quem será o novo predecessor
        const successorClient = new DHTClient(this.successor.ip, this.successor.port);
        await successorClient.nodeGone(this.id, this.predecessor.ip, this.predecessor.port);
      } else {
        // Se o predecessor é nulo, o sucessor deve ser o único nó na rede após a saída
        console.log(`(API DHT) LEAVE - Nó ${this.id} está saindo e não tem predecessor, atualizando sucessor para si mesmo.`);
        const successorClient = new DHTClient(this.successor.ip, this.successor.port);
        await successorClient.nodeGone(this.id, this.successor.ip, this.successor.port);  // Sucessor deve se tornar seu próprio predecessor
      }

      // Transfere os dados para o sucessor antes de sair
      await this.transferDataToSuccessor();

      console.log(`(API DHT) LEAVE - Nó ${this.id} notificou seu sucessor ${this.successor.id} sobre sua saída.`);
    }

    // Finaliza o processo de saída, removendo referências ao anel
    this.successor = this;
    this.predecessor = null;
  }

  async store(key: Key, value: string | Uint8Array): Promise<void> {
    const node = await this.findSuccessor(this.hashKey(key));
    
    if (node.id !== this.id) {
      const client = new DHTClient(node.ip, node.port);
      await client.store(key, Buffer.from(value));
      console.log('(API DHT)', `STORE - Chave ${key} armazenada exteriormente no nó ${node.ip}:${node.port}`);
    } else {
      this.data.set(key, Buffer.from(value));
      console.log('(API DHT)', `STORE - Chave ${key} armazenada localmente no nó ${this.ip}:${this.port}`);
    }
  }

  async retrieve(key: Key): Promise<Uint8Array | null> {
    if (this.data.has(key)) {
      console.log('(API DHT)', `RETRIEVE - Chave ${key} encontrada localmente.`);
      return this.data.get(key) || null;
    } else {
      const successor = await this.findSuccessor(this.hashKey(key));
      if (successor.id !== this.id) {
        console.log('(API DHT)', `RETRIEVE - Chave ${key} encontrada exteriormente no nó ${successor.ip}:${successor.port}`);
        const client = new DHTClient(successor.ip, successor.port);
        return client.retrieve(key).then(response => response.getValue_asU8()).catch(() => null);
      } else {
        console.log('(API DHT)', `RETRIEVE - Chave ${key} não encontrada em nenhum nó.`);
        return null;
      }
    }
  }

  private async findSuccessor(id: NodeId, currentNode: Node = this): Promise<Node> {
    if (this.between(id, currentNode.id, currentNode.successor.id)) {
      return currentNode.successor;
    } else if (currentNode.successor.id !== this.id) {
      const client = new DHTClient(currentNode.successor.ip, currentNode.successor.port);
      const joinResponse = await client.findSuccessor(this.ip, this.port, id);
      return this.createNode(joinResponse.getSuccessorip(), joinResponse.getSuccessorport(), joinResponse.getNodeid());
    } else {
      return this;
    }
  }

  private async transferDataToNewNode(): Promise<void> {
    const keysToTransfer: Key[] = [];
    for (const [key, value] of this.data.entries()) {
      if (this.between(this.hashKey(key), this.id, this.successor.id)) {
        keysToTransfer.push(key);
      }
    }

    if (keysToTransfer.length > 0) {
      const dataToTransfer: KeyValue[] = keysToTransfer.map(key => {
        const pair = new KeyValue();
        pair.setKey(key);
        pair.setValue(this.data.get(key)!);
        return pair;
      });

      const client = new DHTClient(this.successor.ip, this.successor.port);
      await client.transfer(dataToTransfer);

      for (const key of keysToTransfer) {
        this.data.delete(key);
      }
    }
  }

  private async transferDataToSuccessor(): Promise<void> {
    const dataToTransfer: KeyValue[] = [];
    for (const [key, value] of this.data.entries()) {
      const keyValue = new KeyValue();
      keyValue.setKey(key);
      keyValue.setValue(value);
      dataToTransfer.push(keyValue);
    }
    this.data.clear();

    const client = new DHTClient(this.successor.ip, this.successor.port);
    await client.transfer(dataToTransfer);
  }

  createNode(ip: string, port: number, id?: NodeId): Node {
    return new Node(ip, port, id || this.generateRandomId());
  }
}