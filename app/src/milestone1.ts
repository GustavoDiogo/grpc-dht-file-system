import * as readline from 'readline';
import { DHTNode }  from './apis/dht';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nodeIp = process.argv[2] || '127.0.0.1';
const nodePort = parseInt(process.argv[3], 10) || 5000;
const knownHostIp = process.argv[4] || '';
const knownHostPort = parseInt(process.argv[5], 10) || 0;

const node = new DHTNode(nodeIp, nodePort);

if (knownHostIp && knownHostPort) {
  node.join([{ ip: knownHostIp, port: knownHostPort }]);
} else {
  node.join([]);
}

console.log(`Node started at ${nodeIp}:${nodePort}`);

function showMenu() {
  console.log('\nMenu:');
  console.log('1. Send message');
  console.log('2. Retrieve message');
  console.log('3. Leave chat');
  console.log('4. Exit');
  rl.question('Choose an option: ', handleMenuSelection);
}

function handleMenuSelection(option: string) {
  switch (option) {
    case '1':
      sendMessage();
      break;
    case '2':
      retrieveMessage();
      break;
    case '3':
      leaveChat();
      break;
    case '4':
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('Invalid option. Please try again.');
      showMenu();
  }
}

function sendMessage() {
  rl.question('Enter the recipient key: ', (key) => {
    rl.question('Enter your message: ', (message) => {
      node.store(key, Buffer.from(message));
      console.log(`Message sent to ${key}`);
      showMenu();
    });
  });
}

function retrieveMessage() {
  rl.question('Enter the key to retrieve: ', (key) => {
    const message = node.retrieve(key);
    if (message) {
      console.log(`Message retrieved: ${message.toString()}`);
    } else {
      console.log('Message not found.');
    }
    showMenu();
  });
}

function leaveChat() {
  node.leave();
  console.log('You have left the chat.');
  rl.close();
  process.exit(0);
}

showMenu();
