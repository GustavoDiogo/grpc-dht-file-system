import { DHTNode  } from '../models/dht';
import { IDHTChatServer } from '../proto/dht_grpc_pb';
import { JoinResponse, NodeInfo, RetrieveResponse } from '../proto/dht_pb';
import { DHTChatClient } from '../proto/dht_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const node = new DHTNode('0.0.0.0', 50051);

const client = new DHTChatClient('0.0.0.0:50051', grpc.credentials.createInsecure());

export const DHTChatServer: IDHTChatServer = {
  join(call, callback) {
    const { ip, port, nodeid } = call.request.toObject();

    node.join([{ ip, port, id: nodeid }]);

    const joinResponse = new JoinResponse();
    joinResponse.setNodeid(node.id);
    joinResponse.setSuccessorip(node.successor.ip);
    joinResponse.setSuccessorport(node.successor.port);
    joinResponse.setPredecessorip(node.predecessor?.ip || '');
    joinResponse.setPredecessorport(node.predecessor?.port || 0);

    callback(null, joinResponse);
  },

  async newNode(call, callback) {
    const { nodeid, ip, port } = call.request.toObject();

    // Atualiza o predecessor para apontar para o novo nó
    if (node.predecessor) {

      node.storeNode(nodeid, ip, port);

      // // Cria uma instância do novo nó
      // const newNode = new DHTNode(ip, port, nodeid);

      // // Atualiza o sucessor do predecessor para o novo nó
      // node.predecessor.successor = newNode;

      // const clientNewNodeRequest = new Promise((resolve, reject) => {
      //   // Envia mensagem NEW_NODE ao predecessor
      //   const newNodeRequest = new NodeInfo();
      //   newNodeRequest.setNodeid(node.id);
      //   newNodeRequest.setIp(node.ip);
      //   newNodeRequest.setPort(node.port);

      //   client.newNode(newNodeRequest, (error: grpc.ServiceError | null, response: Empty) => {
      //     if (error) {
      //       reject(error);
      //     } else {
      //       console.log('Success sending NEW_NODE');
      //       callback(null, new Empty());
      //       resolve(response);
      //     }
      //   }); 
      // });

      // await clientNewNodeRequest;
    } else {
      // Caso o predecessor não exista (o nó recém-criado é o único na rede)
      callback({ details: 'No predecessor available' }, null);
    }
  },

  async leave(call, callback) {
    const { nodeid, ip, port } = call.request.toObject();

    // Lógica para lidar com a saída do nó
    node.leave();

    // Notificar o sucessor
    if (node.successor) {

      node.receiveLeaveRequest({
        predecessorip: ip,
        predecessorport: port,
      });
      
      // const clientLeaveRequest = new Promise((resolve, reject) => {
      //   console.log('Sending LEAVE to successor');
      //   const leaveRequest = new NodeInfo();
      //   leaveRequest.setNodeid(nodeid);
      //   leaveRequest.setIp(ip);
      //   leaveRequest.setPort(port);

      //   client.leave(leaveRequest, (error: grpc.ServiceError | null, response: Empty) => {
      //     if (error) {
      //       reject(error);
      //     } else {
      //       console.log('Success sending LEAVE');
      //       callback(null, new Empty());
      //       resolve(response);
      //     }
      //   }); 
      // });

      // await clientLeaveRequest;
    } else {
      callback({ details: 'No successor available' }, null);
    }
  },

  async nodeGone(call, callback) {
    const { nodeid, ip, port } = call.request.toObject();

    // Atualizar predecessor com o novo sucessor
    if (node.predecessor) {
      node.predecessor.successor = node.successor;


      // const clientNodeGoneRequest = new Promise((resolve, reject) => {
      // const nodeGoneRequest = new NodeInfo();
      // nodeGoneRequest.setNodeid(nodeid);
      // nodeGoneRequest.setIp(ip);
      // nodeGoneRequest.setPort(port);

      node.receiveNodeGoneRequest({
        nodeid,
        ip,
        port,
      });

      // client.leave(nodeGoneRequest, (error: grpc.ServiceError | null, response: Empty) => {
      //   if (error) {
      //     reject(error);
      //   } else {
      //     console.log('Success sending NODE_GONE');
      //     callback(null, new Empty());
      //     resolve(response);
      //   }
      // }); 
      // });

      // await clientNodeGoneRequest;
    } else {
      callback({ details: 'No predecessor available' }, null);
    }

  },

  store(call, callback) {
    const { key, value } = call.request.toObject();
    node.store(key, Buffer.from(value));

    callback(null, new Empty());
  },

  retrieve(call, callback) {
    const { key } = call.request.toObject();
    const value = node.retrieve(key);

    if (value) {
      const okResponse = new RetrieveResponse();
      okResponse.setKey(key);
      okResponse.setValue(value.toString('base64')); // Converte para string base64

      callback(null, okResponse);
    } else {
      const notFoundResponse = new RetrieveResponse();
      callback(null, notFoundResponse);
    }
  },

  ok(call, callback) {
    const { key, value } = call.request.toObject();

    // const okResponse = new RetrieveResponse();
    // okResponse.setKey(key);
    // okResponse.setValue(value); // valor deve ser em base64

    callback(null, new Empty());
  },

  notFound(call, callback) {
    // Cria uma resposta NOT_FOUND vazia
    callback(null, new Empty());
  },

  transfer(call, callback) {
    const { key, value } = call.request.toObject();
    node.store(key, Buffer.from(value));

    callback(null, new Empty());
  },
};