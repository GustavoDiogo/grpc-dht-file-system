import * as crypto from 'crypto';

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

  private between(id: NodeId, start: NodeId, end: NodeId): boolean {
    if (start < end) {
      return id > start && id <= end;
    } else {
      return id > start || id <= end;
    }
  }

  join(knownHosts: { ip: string; port: number }[]): void {
    if (knownHosts.length === 0) {
      this.predecessor = null;
      this.successor = this;
    } else {
      for (const host of knownHosts) {
        const hostNode = this.createNode(host.ip, host.port);
        const successor = this.findSuccessor(this.id, hostNode);
        this.successor = successor;
        this.predecessor = this.successor.predecessor;
        this.successor.predecessor = this;
        if (this.predecessor) {
          this.predecessor.successor = this;
        }
        this.transferData();
        break;
      }
    }
    console.log('(API DHT)', `Node ${this.ip}:${this.port} joined the DHT with ID ${this.id}`);
  }

  leave(): void {
    console.log('(API DHT)', `Node ${this.ip}:${this.port} leaving the DHT`);

    if (this.predecessor) {
      this.predecessor.successor = this.successor;
    }
    if (this.successor) {
      this.successor.predecessor = this.predecessor;
      this.successor.data = new Map([...this.successor.data, ...this.data]);
    }
  }

  store(key: Key, value: Buffer): void {
    console.log('(API DHT)', `Node ${this.ip}:${this.port} storing value ${value} for key ${key}`);

    const node = this.findSuccessor(this.hashKey(key));
    node.data.set(key, value);
  }

  retrieve(key: Key): Buffer | null {
    const node = this.findSuccessor(this.hashKey(key));

    const message = node.data.get(key) || null;
    console.log('(API DHT)', `Node ${this.ip}:${this.port} retrieved value for key ${key}: ${message?.toString()}`);

    return message;
  }

  private findSuccessor(id: NodeId, currentNode: Node = this): Node {
    if (this.between(id, currentNode.id, currentNode.successor.id)) {
      return currentNode.successor;
    } else {
      // Implementar aqui a lógica para busca de nós em redes maiores
      return currentNode.successor; // Simplificação
    }
  }

  private transferData(): void {
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

  createNode(ip: string, port: number): Node {
    return {
      id: this.generateRandomId(),
      ip,
      port,
      predecessor: null,
      successor: this, // Referência a este nó como sucessor para simplificação
      data: new Map(),
    };
  }
}