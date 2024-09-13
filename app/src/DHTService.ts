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

// Implementation of the DHT service for the gRPC server
// @ts-ignore 
export class DHTService implements IDHTServiceServer {
  private node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  async join(call: grpc.ServerUnaryCall<JoinRequest, JoinResponse>, callback: grpc.sendUnaryData<JoinResponse>): Promise<void> {
    const request = call.request;

    console.log('(gRPC API)', `JOIN_OK - Received JOIN from ${request.getIp()}:${request.getPort()}`);

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

    console.log('(gRPC API)', `NEW_NODE - Received NEW_NODE for ${request.getIp()}:${request.getPort()}`);

    const newNode = this.node.createNode(request.getIp(), request.getPort());
    newNode.successor = this.node;
    
    // Update the current node's predecessor
    this.node.predecessor = newNode;

    callback(null, new Empty());
  }

  async leave(call: grpc.ServerUnaryCall<LeaveRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(gRPC API)', `LEAVE - Received LEAVE from ${request.getIp()}:${request.getPort()}`);

    await this.node.leave();
    callback(null, new Empty());
  }

  async nodeGone(call: grpc.ServerUnaryCall<NodeGoneRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(gRPC API)', `NODE_GONE - Received NODE_GONE from node ${request.getNodeid()} indicating that ${request.getIp()}:${request.getPort()} is the new predecessor.`);

    // Update the successor node's predecessor to point to the new predecessor
    this.node.predecessor = this.node.createNode(request.getIp(), request.getPort());

    callback(null, new Empty());
  }

  async store(call: grpc.ServerUnaryCall<StoreRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;
    const key = request.getKey();
    const value = request.getValue();

    if (this.node.data.has(key)) {
      console.log('(gRPC API)', `STORE - Key ${key} is already stored. Ignoring operation.`);
      callback(null, new Empty());
      return;
    }

    console.log('(gRPC API)', `STORE - Storing key ${key} with value size ${value.length}`);

    await this.node.store(key, value);
    callback(null, new Empty());
  }

  async retrieve(call: grpc.ServerUnaryCall<RetrieveRequest, RetrieveResponse>, callback: grpc.sendUnaryData<RetrieveResponse>): Promise<void> {
    const request = call.request;
    const key = request.getKey();

    console.log('(gRPC API)', `RETRIEVE - Receiving request to retrieve key ${key}`);

    const value = await this.node.retrieve(key);
    const response = new RetrieveResponse();

    if (value) {
      console.log('(gRPC API)', `OK - Key ${key} found.`);

      response.setKey(key);
      response.setValue(value);
    } else {
      console.log('(gRPC API)', `NOT_FOUND - Key ${key} not found.`);
      response.setValue(new Uint8Array());
    }
    
    callback(null, response);
  }

  async transfer(call: grpc.ServerUnaryCall<TransferRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void> {
    const request = call.request;

    console.log('(gRPC API)', 'TRANSFER - Receiving transfer data');

    request.getPairsList().forEach((pair) => {
      this.node.data.set(pair.getKey(), pair.getValue_asU8());
    });

    callback(null, new Empty());
  }

  async findSuccessor(call: grpc.ServerUnaryCall<JoinRequest, JoinResponse>, callback: grpc.sendUnaryData<JoinResponse>): Promise<void> {
    const request = call.request;

    // console.log(`Received findSuccessor for ${request.getNodeid()} from ${request.getIp()}:${request.getPort()}`);

    let successorNode: Node = this.node.successor;
    if (this.node.between(request.getNodeid(), this.node.id, this.node.successor.id)) {
      successorNode = this.node.successor;
    }

    const response = new JoinResponse();
    response.setNodeid(successorNode.id);
    response.setSuccessorip(successorNode.ip);
    response.setSuccessorport(successorNode.port);

    console.log('(gRPC API)', `JOIN_OK - For the joining node ${request.getIp()}:${request.getPort()} with successor ${successorNode.ip}:${successorNode.port} ${this.node.predecessor ? 'and predecessor' + `${this.node.predecessor?.ip}:${this.node.predecessor?.port}` : ''}`);
    
    callback(null, response);
  }
}
