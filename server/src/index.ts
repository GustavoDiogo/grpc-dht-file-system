import * as grpc from '@grpc/grpc-js';
import { DHTChatService } from './proto/dht_grpc_pb';
import { DHTChatServer } from './services/dhtChatServer';

function main() {
  const server = new grpc.Server();
  server.addService(DHTChatService, DHTChatServer); 
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
  });
}

main();
