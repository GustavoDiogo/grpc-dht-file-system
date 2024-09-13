import inquirer from 'inquirer';
import * as fs from 'fs';
import { startServer } from './startServer'; 
import { Node } from './node';
import path from 'path';

const nodes: Node[] = [];

// Function to display the main menu
async function showMainMenu() {
  const choices = [
    { name: 'Create a new node', value: 'create_node' },
    { name: 'Send file', value: 'send_file' },
    { name: 'Retrieve file by key', value: 'retrieve_file' },
    { name: 'Close a node', value: 'close_node' }, // New option to close a node
    { name: 'Exit', value: 'exit' },
  ];
  
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices,
    },
  ]);
  
  return option;
}
  
// Function to create a node
async function createNode() {
  const { port } = await inquirer.prompt([
    { type: 'input', name: 'port', message: 'Enter the node port:' },
  ]);
  
  const ip = '127.0.0.1'; // Fixed IP
  const node = new Node(ip, parseInt(port));
  
  if (nodes.length > 0) {
    // If there are already nodes, join the first node in the list
    const knownHosts = [{ ip: nodes[0].ip, port: nodes[0].port }];
    await node.join(knownHosts);
    console.log(`Node ${ip}:${port} joined the network through node ${nodes[0].ip}:${nodes[0].port}`);
  } else {
    console.log(`Node ${ip}:${port} initialized as the initial node of the network.`);
  }
  
  await startServer(node); // Start the gRPC server
  nodes.push(node);
  console.log(`Node created at ${ip}:${port}`);
}
  
// Function to send a file, allowing you to choose the server
async function sendFile() {
  if (nodes.length === 0) {
    console.log('You need to create at least 1 node to send files.');
    return;
  }
  
  const filePath = path.join(__dirname, 'files');
  const files = fs.readdirSync(filePath);
  
  const { nodeIndex, fileName, customKey } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Select the node to send the file:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
    {
      type: 'list',
      name: 'fileName',
      message: 'Select the file to send:',
      choices: files,
    },
    {
      type: 'input',
      name: 'customKey',
      message: 'Enter a custom key for the file:',
    },
  ]);
  
  const fileBuffer = fs.readFileSync(path.join(filePath, fileName));
  const selectedNode = nodes[nodeIndex]; // Choose the specific node to send the file
  
  console.log(`Sending file ${fileName} with key ${customKey} to ${selectedNode.ip}:${selectedNode.port}`);
    
  await selectedNode.store(customKey, fileBuffer);
  
  console.log(`File ${fileName} stored in the network with key ${customKey}.`);
}
  
// Function to retrieve a file by key, selecting the node
async function retrieveFile() {
  if (nodes.length === 0) {
    console.log('No node available to retrieve files.');
    return;
  }
  
  const { nodeIndex, key } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Select the node from where to retrieve the file:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
    {
      type: 'input',
      name: 'key',
      message: 'Enter the file key (e.g., page.html):',
    },
  ]);
  
  const selectedNode = nodes[nodeIndex]; // Select the node chosen by the user
  
  const retrievedFile = await selectedNode.retrieve(key);
    
  if (retrievedFile) {
    const filePath = path.join(__dirname, 'retrieved_files', key);
    fs.writeFileSync(filePath, Buffer.from(retrievedFile));
    console.log(`File ${key} successfully retrieved and saved at ${filePath}`);
  } else {
    console.log('Error: File not found.');
  }
}
  
// Function to close a node and perform the leave operation
async function closeNode() {
  if (nodes.length === 0) {
    console.log('No node available to close.');
    return;
  }
  
  const { nodeIndex } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Select the node to close:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
  ]);
  
  const selectedNode = nodes[nodeIndex]; // Select the node chosen by the user
  
  console.log(`Closing node ${selectedNode.ip}:${selectedNode.port}...`);
    
  await selectedNode.leave();  // Perform the leave operation on the node
  
  nodes.splice(nodeIndex, 1); // Remove the node from the list of active nodes
  
  console.log(`Node ${selectedNode.ip}:${selectedNode.port} has been closed and removed from the network.`);
}
  
// Main function to run the menu
async function runMenu() {
  let exit = false;
  while (!exit) {
    const option = await showMainMenu();
    switch (option) {
      case 'create_node':
        await createNode();
        break;
      case 'send_file':
        await sendFile();
        break;
      case 'retrieve_file':  // Call to retrieve file by key, selecting node
        await retrieveFile();
        break;
      case 'close_node':  // Call to close a node (leave)
        await closeNode();
        break;
      case 'exit':
        console.log('Exiting the program...');
        exit = true;
        process.exit(0);  // Exits the Node.js process
        break;
    }
  }
}
  
runMenu().catch(err => console.error(err));
