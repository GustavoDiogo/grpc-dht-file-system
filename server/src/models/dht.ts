import crypto from 'crypto';

const M_BITS = 160; // Definindo o tamanho dos identificadores e chaves (por exemplo, 160 bits)

type NodeId = string;
type Key = string;

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

  private generateRandomId(): NodeId {
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

  join(knownHosts: { id: NodeId; ip: string; port: number }[]): void {
    if (knownHosts.length === 0) {
      this.predecessor = null;
      this.successor = this;
    } else {
      for (const host of knownHosts) {
        if (this.ping(host)) {
          const hostNode = this.createNode(host.id, host.ip, host.port);
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
    }
  }

  leave(): void {
    if (this.predecessor) {
      this.predecessor.successor = this.successor;
    }
    if (this.successor) {
      this.successor.predecessor = this.predecessor;
      this.successor.data = new Map([...this.successor.data, ...this.data]);
    }
  }

  store(key: Key, value: Buffer): void {
    const node = this.findSuccessor(this.hashKey(key));
    node.data.set(key, value);
  }

  retrieve(key: Key): Buffer | null {
    const node = this.findSuccessor(this.hashKey(key));
    return node.data.get(key) || null;
  }

  private findSuccessor(id: NodeId, currentNode: Node = this): Node {
    // Simulação de lógica para encontrar o sucessor
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

  private ping(node: { id: NodeId; ip: string; port: number }): boolean {
    // Simulação de um ping, deve ser substituído por uma real verificação de conectividade
    console.log(`Pinging ${node.ip}:${node.port}`);
    return true;
  }

  private createNode(id: NodeId, ip: string, port: number): Node {
    return {
      id,
      ip,
      port,
      predecessor: null,
      successor: this, // Referência a este nó como sucessor para simplificação
      data: new Map(),
    };
  }

  // Funções adicionais

  storeNode(nodeId: NodeId, ip: string, port: number): void {
    const newNode = this.createNode(nodeId, ip, port);
    // Atualizar o sucessor para o novo nó
    this.successor = newNode;
    newNode.predecessor = this;
  }

  receiveLeaveRequest(leaveRequest: { predecessorip: string, predecessorport: number }): void {
    // Atualizar o sucessor para o nó que está saindo
    const leavePredecessor = this.createNode('', leaveRequest.predecessorip, leaveRequest.predecessorport);
    this.successor.predecessor = leavePredecessor;
  }

  receiveNodeGoneRequest(nodeGoneRequest: { nodeid: NodeId, ip: string, port: number }): void {
    // Atualizar o predecessor para o novo sucessor do nó que está saindo
    const newSuccessor = this.createNode(nodeGoneRequest.nodeid, nodeGoneRequest.ip, nodeGoneRequest.port);
    this.predecessor!.successor = newSuccessor;
  }
}
