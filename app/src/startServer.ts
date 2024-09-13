import * as grpc from '@grpc/grpc-js';
import { Node } from './node';
import { DHTService } from './DHTService';
import { DHTServiceService } from './proto/dht_grpc_pb';

// Main function to start the gRPC server
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
    console.log('(GRPC API)', `DHT server running at ${address}`);
  });
}
