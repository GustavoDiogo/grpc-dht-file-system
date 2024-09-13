import {
  KeyValue,
} from './proto/dht_pb';
import crypto from 'crypto';
import { DHTClient } from './DHTClient';

type NodeId = string;
type Key = string;

const M_BITS = 160; // Size of identifiers and keys in bits

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
    this.successor = this; // Initially, the node points to itself
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
      console.log('(DHT API)', `JOIN - No known nodes. Initializing the network for ${this.ip}:${this.port}.`);
      this.predecessor = null;
      this.successor = this;
    } else {
      console.log('(DHT API)', `JOIN - Received JOIN request for ${this.ip}:${this.port} from ${knownHosts.map(host => `${host.ip}:${host.port}`).join(', ')}`);
      for (const host of knownHosts) {
        const client = new DHTClient(host.ip, host.port);
        const joinResponse = await client.findSuccessor(this.ip, this.port, this.id); // New findSuccessor method

        this.successor = this.createNode(joinResponse.getSuccessorip(), joinResponse.getSuccessorport(), joinResponse.getNodeid());

        // Update the successor's predecessor to this node
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
      // Check if the predecessor is not null before sending the NODE_GONE message
      if (this.predecessor) {
        // Notify the successor that this node is leaving and inform who will be the new predecessor
        const successorClient = new DHTClient(this.successor.ip, this.successor.port);
        await successorClient.nodeGone(this.id, this.predecessor.ip, this.predecessor.port);
      } else {
        // If the predecessor is null, the successor should be the only node in the network after the exit
        console.log(`(DHT API) LEAVE - Node ${this.id} is leaving and has no predecessor, updating successor to itself.`);
        const successorClient = new DHTClient(this.successor.ip, this.successor.port);
        await successorClient.nodeGone(this.id, this.successor.ip, this.successor.port);  // Successor should become its own predecessor
      }

      // Transfer the data to the successor before leaving
      await this.transferDataToSuccessor();

      console.log(`(DHT API) LEAVE - Node ${this.id} notified its successor ${this.successor.id} about its departure.`);
    }

    // Finalize the leaving process by removing references to the ring
    this.successor = this;
    this.predecessor = null;
  }

  async store(key: Key, value: string | Uint8Array): Promise<void> {
    const node = await this.findSuccessor(this.hashKey(key));
    
    if (node.id !== this.id) {
      const client = new DHTClient(node.ip, node.port);
      await client.store(key, Buffer.from(value));
      console.log('(DHT API)', `STORE - Key ${key} stored externally on node ${node.ip}:${node.port}`);
    } else {
      this.data.set(key, Buffer.from(value));
      console.log('(DHT API)', `STORE - Key ${key} stored locally on node ${this.ip}:${this.port}`);
    }
  }

  async retrieve(key: Key): Promise<Uint8Array | null> {
    if (this.data.has(key)) {
      console.log('(DHT API)', `RETRIEVE - Key ${key} found locally.`);
      return this.data.get(key) || null;
    } else {
      const successor = await this.findSuccessor(this.hashKey(key));
      if (successor.id !== this.id) {
        console.log('(DHT API)', `RETRIEVE - Key ${key} found externally on node ${successor.ip}:${successor.port}`);
        const client = new DHTClient(successor.ip, successor.port);
        return client.retrieve(key).then(response => response.getValue_asU8()).catch(() => null);
      } else {
        console.log('(DHT API)', `RETRIEVE - Key ${key} not found on any node.`);
        return null;
      }
    }
  }

  async findSuccessor(id: NodeId, currentNode: Node = this): Promise<Node> {
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

  async transferDataToNewNode(): Promise<void> {
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

  public async transferDataToSuccessor(): Promise<void> {
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
