import * as grpc from '@grpc/grpc-js';
import { IDHTServiceServer } from './proto/dht_grpc_pb';
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
} from './proto/dht_pb';
import { Node } from './node';

// Implementação do DHT service para o servidor gRPC
// @ts-ignore 
export class DHTService implements IDHTServiceServer {
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

    console.log('(API GRPC)', `NODE_GONE - Recebido NODE_GONE do nó ${request.getNodeid()} indicando que ${request.getIp()}:${request.getPort()} é o novo predecessor.`);

    // Atualiza o predecessor do nó sucessor para apontar para o novo predecessor
    this.node.predecessor = this.node.createNode(request.getIp(), request.getPort());

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

    // console.log(`Recebido findSuccessor para ${request.getNodeid()} de ${request.getIp()}:${request.getPort()}`);

    let successorNode: Node = this.node.successor;
    if (this.node.between(request.getNodeid(), this.node.id, this.node.successor.id)) {
      successorNode = this.node.successor;
    }

    const response = new JoinResponse();
    response.setNodeid(successorNode.id);
    response.setSuccessorip(successorNode.ip);
    response.setSuccessorport(successorNode.port);

    console.log('(API GRPC)', `JOIN_OK - Para o nó ingressante ${request.getIp()}:${request.getPort()} com o sucessor ${successorNode.ip}:${successorNode.port} ${this.node.predecessor ? 'e predecessor' + `${this.node.predecessor?.ip}:${this.node.predecessor?.port}` : ''}`);
    
    callback(null, response);
  }

}