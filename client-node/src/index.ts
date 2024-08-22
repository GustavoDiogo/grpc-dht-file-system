import * as grpc from '@grpc/grpc-js';
import { DHTChatClient } from './proto/dht_grpc_pb';
import { JoinRequest, JoinResponse, NodeInfo, RetrieveRequest, RetrieveResponse, StoreRequest, TransferData } from './proto/dht_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const client = new DHTChatClient('localhost:50051', grpc.credentials.createInsecure());

// Função para simular JOIN
const simulateJoin = async () => {
  return new Promise((resolve, reject) => {
    const joinRequest = new JoinRequest();
    joinRequest.setIp('127.0.0.1');
    joinRequest.setPort(50051);
    joinRequest.setNodeid(Math.random().toString(36).substring(7)); // Gera um ID aleatório

    client.join(joinRequest, (error: any, response: JoinResponse) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Join Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular STORE
const simulateStore = async () => {
  return new Promise((resolve, reject) => {
    const storeRequest = new StoreRequest();
    storeRequest.setKey('example-key');
    storeRequest.setValue(Buffer.from('example-value').toString('base64')); // Codificado em base64

    client.store(storeRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Store Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular RETRIEVE
const simulateRetrieve = async () => {
  return new Promise((resolve, reject) => {
    const retrieveRequest = new RetrieveRequest();
    retrieveRequest.setKey('example-key');
    
    client.retrieve(retrieveRequest, (error: any, response: RetrieveResponse) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        const formattedResponse = response.toObject();

        console.log('Retrieve Response:', {
          ...formattedResponse,
          value: atob(Buffer.from(formattedResponse.value as string, 'base64').toString('utf-8')),
        });
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular LEAVE
const simulateLeave = async () => {
  return new Promise((resolve, reject) => {
    const leaveRequest = new NodeInfo();
    leaveRequest.setNodeid(Math.random().toString(36).substring(7));
    leaveRequest.setIp('127.0.0.1');
    leaveRequest.setPort(50051);

    client.leave(leaveRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Leave Response:', response.toObject());
        resolve(response.toObject());
      }
    });

  });
};

// Função para simular NEW_NODE
const simulateNewNode = async () => {
  return new Promise((resolve, reject) => {
    const newNodeRequest = new NodeInfo();
    newNodeRequest.setNodeid(Math.random().toString(36).substring(7));
    newNodeRequest.setIp('127.0.0.2');
    newNodeRequest.setPort(50052);

    client.newNode(newNodeRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('New Node Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular NODE_GONE
const simulateNodeGone = async () => {
  return new Promise((resolve, reject) => {
    const nodeGoneRequest = new NodeInfo();
    nodeGoneRequest.setNodeid(Math.random().toString(36).substring(7));
    nodeGoneRequest.setIp('127.0.0.2');
    nodeGoneRequest.setPort(50052);

    client.nodeGone(nodeGoneRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Node Gone Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });

};

// Função para simular TRANSFER
const simulateTransfer = async () => {
  return new Promise((resolve, reject) => { 
    const transferRequest = new TransferData();
    transferRequest.setKey('example-key');
    transferRequest.setValue(Buffer.from('example-value').toString('base64')); // Codificado em base64

    client.transfer(transferRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Transfer Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular OK
const simulateOk = async () => {
  return new Promise((resolve, reject) => { 
    const okRequest = new RetrieveResponse();
    okRequest.setKey('example-key');
    okRequest.setValue(Buffer.from('example-value').toString('base64')); // Codificado em base64

    client.ok(okRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('OK Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Função para simular NOT_FOUND
const simulateNotFound = async () => {
  return new Promise((resolve, reject) => { 
    const notFoundRequest = new RetrieveRequest();
    
    client.notFound(notFoundRequest, (error: any, response: Empty) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Not Found Response:', response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

// Execute as simulações
simulateJoin();
simulateStore();
simulateRetrieve();
simulateLeave();
simulateNewNode();
simulateNodeGone();
simulateTransfer();
simulateOk();
simulateNotFound();