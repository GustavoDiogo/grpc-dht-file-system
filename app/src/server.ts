/* eslint-disable @typescript-eslint/no-loop-func */
import * as grpc from '@grpc/grpc-js';
import { JoinResponse, RetrieveResponse, Empty } from './proto/dht_pb';
import { IDHTServiceServer, DHTServiceService } from './proto/dht_grpc_pb';
import { DHTNode } from './apis/dhtGRPC';
import { DHTClient } from './client';

export const startServer = async (node: DHTNode) => {
  const DHTService: IDHTServiceServer = {
    async join(call, callback): Promise<void> {
      const request = call.request;
      const incomingNodeId = request.getNodeid();
      const incomingNodeIp = request.getIp();
      const incomingNodePort = request.getPort();
    
      console.log(`Recebido JOIN de ${incomingNodeIp}:${incomingNodePort} com ID ${incomingNodeId}`);
    
      // Verifica se o nó que está tentando se conectar já é o sucessor ou predecessor
      if (node.id === incomingNodeId) {
        console.warn('Loop detectado: O nó que está tentando se conectar já é o atual. Evitando loop.');
        const response = new JoinResponse();
        response.setNodeid(node.id);
        response.setSuccessorip(node.successor.ip);
        response.setSuccessorport(node.successor.port);
        response.setPredecessorip(node.predecessor?.ip || '');
        response.setPredecessorport(node.predecessor?.port || 0);
        callback(null, response);
        return;
      }
    
      // Verifica se o nó que está se conectando deve ser inserido entre o nó atual e o sucessor
      if (node.between(incomingNodeId, node.id, node.successor.id)) {
        const newNode = node.createNode(incomingNodeIp, incomingNodePort, incomingNodeId);
    
        if (node.successor.id !== newNode.id) {
          // Atualiza as referências de sucessor e predecessor
          newNode.successor = node.successor;
          newNode.predecessor = node;
          node.successor.predecessor = newNode;
          node.successor = newNode;
    
          console.log(`Novo nó ${incomingNodeIp}:${incomingNodePort} inserido na rede.`);
    
          // Responde com os dados do nó predecessor e sucessor
          const response = new JoinResponse();
          response.setNodeid(newNode.id);
          response.setSuccessorip(newNode.successor.ip);
          response.setSuccessorport(newNode.successor.port);
          response.setPredecessorip(newNode.predecessor.ip);
          response.setPredecessorport(newNode.predecessor.port);
    
          // Transfere os dados que agora são de responsabilidade do novo nó
          await node.transferDataToNewNode();
    
          callback(null, response);
        } else {
          console.log(`O nó ${newNode.ip}:${newNode.port} já está inserido na rede. Evitando inserção duplicada.`);
          const response = new JoinResponse();
          response.setNodeid(node.id);
          response.setSuccessorip(node.successor.ip);
          response.setSuccessorport(node.successor.port);
          response.setPredecessorip(node.predecessor?.ip || '');
          response.setPredecessorport(node.predecessor?.port || 0);
          callback(null, response);
        }
      } else {
        // Encaminha para o sucessor
        const client = new DHTClient(node.successor.ip, node.successor.port);
        try {
          const joinResponse = await client.join(incomingNodeIp, incomingNodePort, incomingNodeId);
    
          // Responde com os dados recebidos do sucessor
          const response = new JoinResponse();
          response.setNodeid(joinResponse.getNodeid());
          response.setSuccessorip(joinResponse.getSuccessorip());
          response.setSuccessorport(joinResponse.getSuccessorport());
          response.setPredecessorip(joinResponse.getPredecessorip());
          response.setPredecessorport(joinResponse.getPredecessorport());
    
          callback(null, response);
        } catch (error) {
          console.error(`Erro ao encaminhar JOIN para ${node.successor.ip}:${node.successor.port}:`, error);
          callback(null, null);
        }
      }
    },
  
    async newNode(call, callback) {
      const { ip, port } = call.request.toObject();
      console.log('(API NODE)', `NEW_NODE for ${ip}:${port}`);
  
      node.predecessor = node.createNode(ip, port);
      node.predecessor.successor = node;
  
      callback(null, new Empty());
    },
  
    async leave(call, callback) {
      const { ip, port } = call.request.toObject();
  
      console.log('(API NODE)', `LEAVE from ${ip}:${port}`);
  
      await node.leave();
      callback(null, new Empty());
    },
  
    async nodeGone(call, callback) {
      const { ip, port } = call.request.toObject();
  
      console.log('(API NODE)', `NODE_GONE from ${ip}:${port}`);
  
      node.successor = node.createNode(ip, port);
      callback(null, new Empty());
    },
  
    async store(call, callback) {
      const { key, value } = call.request.toObject();
      
      const readableValue = atob(Buffer.from(value).toString('utf-8'));
      console.log('(API NODE)', 'Stored key:', key, 'with value:', readableValue, `in dht ${node.ip}:${node.port} with value length of ${value.length}`); 
 
      await node.store(key, Buffer.from(call.request.getValue_asU8()));
      callback(null, new Empty());
    },
  
    async retrieve(call, callback) {
      const { key } = call.request.toObject();
  
      const value = await node.retrieve(key);
      if (value) {
        const okResponse = new RetrieveResponse();
        okResponse.setKey(key);
        okResponse.setValue(value);
  
        callback(null, okResponse);
      } else {
        const notFoundResponse = new RetrieveResponse();
        callback(null, notFoundResponse);
      }
    },
  
    transfer(call, callback) {
      const { pairsList } = call.request.toObject();
  
      console.log('(API NODE)', 'Recebendo dados de transferência');
  
      pairsList.forEach((pair) => {
        const { key, value } = pair;
  
        node.data.set(key, Buffer.from(value));
      });
  
      callback(null, new Empty());
    },
  };

  const server = new grpc.Server();
  server.addService(DHTServiceService, DHTService); 

  const address = `${node.ip}:${node.port}`;
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`DHT Node running on ${address}`);
  });

};