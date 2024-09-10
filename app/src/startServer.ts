import * as grpc from '@grpc/grpc-js';
import { Node } from './node';
import { DHTService } from './DHTService';
import { DHTServiceService } from './proto/dht_grpc_pb';

// Função principal para iniciar o servidor gRPC
export function startServer(node: Node) {
  const server = new grpc.Server();
  // @ts-ignore
  server.addService(DHTServiceService, new DHTService(node));
  const address = `${node.ip}:${node.port}`;
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('(API GRPC)', `Servidor DHT rodando em ${address}`);
  });
}
