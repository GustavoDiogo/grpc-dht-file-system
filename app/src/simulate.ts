import fs from 'fs';
import { Node } from './node';
import { startServer } from './startServer';
import { DHTClient } from './DHTClient';

const nodes: Node[] = [];

// Function to create and start a node
async function createAndStartNode(ip: string, port: number, knownHosts: { ip: string; port: number }[] = []): Promise<Node> {
  const node = new Node(ip, port);
  await node.join(knownHosts); // Connect the node to the DHT using knownHosts
  nodes.push(node);
  await startServer(node); // Start the gRPC server
  console.log(`(SCRIPT) Node started at ${ip}:${port} with ID ${node.id}`);
  return node;
}

// Requirements:
// The JOIN, STORE, and RETRIEVE messages must be routed through
// the ring until they reach the node where they will actually be processed.
//
// The JOIN_OK, OK, LEAVE, NEW_NODE, NODE_GONE, TRANSFER, and
// NOT_FOUND messages should be sent directly to the recipient,
// without being routed through the ring.
async function simulateNodes() {
  try {
    const node1 = await createAndStartNode('127.0.0.1', 5001);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const node2 = await createAndStartNode('127.0.0.1', 5002, [{ ip: '127.0.0.1', port: 5001 }]);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const node3 = await createAndStartNode('127.0.0.1', 5003, [{ ip: '127.0.0.1', port: 5002 }]);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store and retrieve data to validate functionality
    const htmlFile = fs.readFileSync(__dirname + '/files/page.html');
    console.log('(SCRIPT) Storing key1');
    await node1.store('key1', htmlFile);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('(SCRIPT) Trying to retrieve key1 on node3');
    const retrievedValue = await node3.retrieve('key1');
    if (retrievedValue) {
      console.log(`(SCRIPT) Value retrieved on node3: ${new TextDecoder().decode(retrievedValue)}`);
    } else {
      console.log('(SCRIPT) Key key1 not found on node3');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
      
    // Start the fourth node and connect it to the third node
    const node4 = await createAndStartNode('127.0.0.1', 5004, [{ ip: '127.0.0.1', port: 5003 }]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate a node leaving
    const node2Client = new DHTClient('127.0.0.1', 5002);
    await node2Client.leave('127.0.0.1', 5002); 
    console.log('(SCRIPT) Node 2 left the network.');
      
    await new Promise(resolve => setTimeout(resolve, 2000));
      
    // Store and retrieve another value to ensure consistency after the node leaves
    const txtFile = fs.readFileSync(__dirname + '/files/text.txt');
    await node1.store('key2', txtFile);
      
    await new Promise(resolve => setTimeout(resolve, 1000));
      
    const retrievedValue2 = await node4.retrieve('key2');
    if (retrievedValue2) {
      console.log(`(SCRIPT) Value retrieved on node4: ${new TextDecoder().decode(retrievedValue2)}`);
    } else {
      console.log('(SCRIPT) Key key2 not found on node4');
    }

    // Simulate the NOT_FOUND message
    const notFoundValue = await node4.retrieve('key3');
    if (!notFoundValue) {
      console.log('(SCRIPT) Key key3 not found');
    }
    console.warn('Final integration test completed, please review the results.');
    process.exit(0);  // Exit the Node.js process
  } catch (error) {
    console.error('(SCRIPT) Error during node simulation:', error);
  }
}

simulateNodes().catch(err => {
  console.error('(SCRIPT) Error during node simulation:', err);
});
