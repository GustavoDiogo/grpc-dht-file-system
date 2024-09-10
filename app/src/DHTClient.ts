import * as grpc from '@grpc/grpc-js';
import { DHTServiceClient } from './proto/dht_grpc_pb';
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
  KeyValue,
} from './proto/dht_pb';

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
  