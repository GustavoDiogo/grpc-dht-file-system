import * as grpc from '@grpc/grpc-js';
import { DHTServiceService, IDHTServiceServer, DHTServiceClient } from './proto/dht_grpc_pb';
import {
  JoinRequest,
  JoinResponse,
  NewNodeRequest,
  LeaveRequest,
  NodeGoneRequest,
  StoreRequest,
  RetrieveRequest,
  RetrieveResponse,
  TransferRequest,
  Empty,
  KeyValue,
} from './proto/dht_pb';
import crypto from 'crypto';

// Implementação do cliente gRPC
export class DHTClient {
  private client: DHTServiceClient;

  constructor(ip: string, port: number) {
    this.client = new DHTServiceClient(`${ip}:${port}`, grpc.credentials.createInsecure());
  }

  join(ip: string, port: number, nodeId: string): Promise<JoinResponse> {
    return new Promise((resolve, reject) => {
      const request = new JoinRequest();
      request.setIp(ip);
      request.setPort(port);
      request.setNodeid(nodeId);

      this.client.join(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  newNode(ip: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new NewNodeRequest();
      request.setIp(ip);
      request.setPort(port);

      this.client.newNode(request, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  leave(ip: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new LeaveRequest();
      request.setIp(ip);
      request.setPort(port);

      this.client.leave(request, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  nodeGone(nodeId: string, ip: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new NodeGoneRequest();
      request.setNodeid(nodeId);
      request.setIp(ip);
      request.setPort(port);

      this.client.nodeGone(request, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  store(key: string, value: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new StoreRequest();
      request.setKey(key);
      request.setValue(value);

      this.client.store(request, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  retrieve(key: string): Promise<RetrieveResponse> {
    return new Promise((resolve, reject) => {
      const request = new RetrieveRequest();
      request.setKey(key);

      this.client.retrieve(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  transfer(data: KeyValue[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new TransferRequest();
      request.setPairsList(
        data.map((item) => {
          const pair = new KeyValue();
          pair.setKey(item.getKey());
          pair.setValue(item.getValue());
          return pair;
        }),
      );

      this.client.transfer(request, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  findSuccessor(ip: string, port: number, nodeId: string): Promise<JoinResponse> {
    return new Promise((resolve, reject) => {
      const request = new JoinRequest();
      request.setIp(ip);
      request.setPort(port);
      request.setNodeid(nodeId);

      this.client.findSuccessor(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

}

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
          this.predecessor = this.createNode(joinResponse.getPredecessorip(), joinResponse.getPredecessorport(), joinResponse.getNodeid());
        } else {
          this.predecessor = this.successor;  // Se não houver predecessor, o próprio sucessor se torna o predecessor
        }

        console.log(`(API DHT) JOIN - Nó ${this.ip}:${this.port} definido com predecessor ${this.predecessor?.ip}:${this.predecessor?.port} e sucessor ${this.successor?.ip}:${this.successor?.port}`);
        await this.transferDataToNewNode();
        break;
      }
    }
  }

  async leave(): Promise<void> {
    if (this.predecessor && this.successor && this.predecessor.id !== this.id && this.successor.id !== this.id) {
      // Notifica o predecessor para atualizar o sucessor
      const predecessorClient = new DHTClient(this.predecessor.ip, this.predecessor.port);
      await predecessorClient.nodeGone(this.id, this.successor.ip, this.successor.port);

      // Notifica o sucessor para atualizar o predecessor
      const successorClient = new DHTClient(this.successor.ip, this.successor.port);
      await successorClient.newNode(this.predecessor.ip, this.predecessor.port);

      // Transfere todos os dados do nó atual para o sucessor
      await this.transferDataToSuccessor();

      console.log(`(API DHT) Nó ${this.ip}:${this.port} saiu da rede. Predecessor atualizado para ${this.predecessor.ip}:${this.predecessor.port}, Sucessor atualizado para ${this.successor.ip}:${this.successor.port}`);
    } else {
      console.log('(API DHT) Nó é o único na rede ou não possui um predecessor/sucessor válido.');
    }
  }

  async store(key: Key, value: string | Uint8Array): Promise<void> {
    const node = await this.findSuccessor(this.hashKey(key));

    // Se o nó é seu próprio sucessor, ou não tem outros nós para redirecionar, armazene localmente ou interrompa
    if (node.id === this.id) {
      this.data.set(key, Buffer.from(value));
      console.log('(API DHT)', `STORE - Chave ${key} armazenada localmente no nó ${this.ip}:${this.port}`);
    } else if (node.ip === this.ip && node.port === this.port) {
      console.log('(API DHT)', `STORE - Loop detectado ao tentar armazenar chave ${key}. Operação abortada.`);
    } else {
      const client = new DHTClient(node.ip, node.port);
      await client.store(key, Buffer.from(value));
      console.log('(API DHT)', `STORE - Chave ${key} armazenada no nó ${node.ip}:${node.port}`);
    }
  }

  async retrieve(key: Key): Promise<Uint8Array | null> {
    if (this.data.has(key)) {
      console.log('(API DHT)', `RETRIEVE - Chave ${key} encontrada localmente.`);
      return this.data.get(key) || null;
    } else {
      // Se o nó é seu próprio sucessor, ou não tem outros nós para redirecionar, isso indica que a chave não pode ser encontrada
      if (this.successor.id === this.id) {
        console.log('(API DHT)', `RETRIEVE - Chave ${key} não encontrada. Nenhum sucessor válido.`);
        return null;
      }

      const successor = await this.findSuccessor(this.hashKey(key));
      if (successor.id === this.id || (successor.ip === this.ip && successor.port === this.port)) {
        console.log('(API DHT)', `RETRIEVE - Chave ${key} não encontrada em nenhum nó. Interrompendo.`);
        return null;
      }

      const client = new DHTClient(successor.ip, successor.port);
      return client.retrieve(key).then(response => {
        if (response.getValue_asU8().length === 0) {
          console.log('(API DHT)', `RETRIEVE - Chave ${key} não encontrada após consulta ao sucessor.`);
          return null;
        }
        return response.getValue_asU8();
      }).catch(() => {
        console.log('(API DHT)', `RETRIEVE - Erro ao tentar recuperar a chave ${key} de ${successor.ip}:${successor.port}`);
        return null;
      });
    }
  }

  private async findSuccessor(id: NodeId, currentNode: Node = this): Promise<Node> {
    if (this.successor.id === this.id) {
      return this; // Evita ciclos infinitos
    }

    if (this.between(id, currentNode.id, currentNode.successor.id)) {
      return currentNode.successor;
    } else {
      const client = new DHTClient(currentNode.successor.ip, currentNode.successor.port);
      const joinResponse = await client.findSuccessor(this.ip, this.port, id);

      if (joinResponse.getSuccessorip() === this.ip && joinResponse.getSuccessorport() === this.port) {
        console.log('(API DHT)', 'Loop detectado no findSuccessor. Retornando nó atual para evitar ciclo.');
        return this;
      }

      return this.createNode(joinResponse.getSuccessorip(), joinResponse.getSuccessorport(), joinResponse.getNodeid());
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

// Implementação do servidor gRPC
// @ts-ignore
class DHTServiceImpl implements IDHTServiceServer {
  private node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  async join(call: grpc.ServerUnaryCall<JoinRequest, JoinResponse>, callback: grpc.sendUnaryData<JoinResponse>): Promise<void> {
    const request = call.request;

    console.log('(API GRPC)', `JOIN_OK - Recebido JOIN de ${request.getIp()}:${request.getPort()}`);

    await this.node.join([{ ip: request.getIp(), port: request.getPort() }]);

    const response = new JoinResponse();
    response.setNodeid(this.node.id);
    response.setSuccessorip(this.node.successor.ip);
    response.setSuccessorport(this.node.successor.port);
    if (this.node.predecessor) {
      response.setPredecessorip(this.node.predecessor.ip);
      response.setPredecessorport(this.node.predecessor.port);
    }

    callback(null, response);
  }

  async newNode(call: grpc.ServerUnaryCall<NewNodeRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(API GRPC)', `NEW_NODE - Recebido NEW_NODE para ${request.getIp()}:${request.getPort()}`);

    const newNode = this.node.createNode(request.getIp(), request.getPort());
    newNode.successor = this.node;
    
    // Atualiza o predecessor do nó atual
    this.node.predecessor = newNode;

    callback(null, new Empty());
  }

  async leave(call: grpc.ServerUnaryCall<LeaveRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(API GRPC)', `LEAVE - Recebido LEAVE de ${request.getIp()}:${request.getPort()}`);

    await this.node.leave();
    callback(null, new Empty());
  }

  async nodeGone(call: grpc.ServerUnaryCall<NodeGoneRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log(`(API GRPC) NODE_GONE - Nó ${request.getNodeid()} saiu da rede. Atualizando sucessor para ${request.getIp()}:${request.getPort()}`);

    // Atualiza o sucessor do nó atual para o nó informado na mensagem NODE_GONE
    this.node.successor = this.node.createNode(request.getIp(), request.getPort());
    this.node.successor.predecessor = this.node;

    callback(null, new Empty());
  }


  async store(call: grpc.ServerUnaryCall<StoreRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;
    const key = request.getKey();
    const value = request.getValue();

    if (this.node.data.has(key)) {
      console.log('(API GRPC)', `STORE - Chave ${key} já está armazenada. Ignorando a operação.`);
      callback(null, new Empty());
      return;
    }

    console.log('(API GRPC)', `STORE - Armazenando chave ${key} com valor de tamanho ${value.length}`);

    await this.node.store(key, value);
    callback(null, new Empty());
  }

  async retrieve(call: grpc.ServerUnaryCall<RetrieveRequest, RetrieveResponse>, callback: grpc.sendUnaryData<RetrieveResponse>): Promise<void> {
    const request = call.request;
    const key = request.getKey();

    console.log('(API GRPC)', `RETRIEVE - Recebendo pedido para recuperar a chave ${key}`);

    const value = await this.node.retrieve(key);
    const response = new RetrieveResponse();

    if (value) {
      console.log('(API GRPC)', `OK - Chave ${key} encontrada.`);

      response.setKey(key);
      response.setValue(value);
    } else {
      console.log('(API GRPC)', `NOT_FOUND - Chave ${key} não encontrada.`);
      response.setValue(new Uint8Array());
    }
    
    callback(null, response);
  }

  async transfer(call: grpc.ServerUnaryCall<TransferRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(API GRPC)', 'TRANSFER - Recebendo dados de transferência');

    request.getPairsList().forEach((pair) => {
      this.node.data.set(pair.getKey(), pair.getValue_asU8());
    });

    callback(null, new Empty());
  }

  async findSuccessor(call: grpc.ServerUnaryCall<JoinRequest, JoinResponse>, callback: grpc.sendUnaryData<JoinResponse>): Promise<void> {
    const request = call.request;

    // Para fins de debug
    // console.log(`Recebido findSuccessor para ${request.getNodeid()} de ${request.getIp()}:${request.getPort()}`);

    let successorNode: Node = this.node.successor;
    if (this.node.between(request.getNodeid(), this.node.id, this.node.successor.id)) {
      successorNode = this.node.successor;
    }

    const response = new JoinResponse();
    response.setNodeid(successorNode.id);
    response.setSuccessorip(successorNode.ip);
    response.setSuccessorport(successorNode.port);
    
    callback(null, response);
  }

}

// Função principal para iniciar o servidor gRPC

export function startServer(node: Node) {
  const server = new grpc.Server();
  // @ts-ignore
  server.addService(DHTServiceService, new DHTServiceImpl(node));
  const address = `${node.ip}:${node.port}`;
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('(API GRPC)', `Servidor DHT rodando em ${address}`);
  });
}
