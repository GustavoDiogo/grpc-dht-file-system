import inquirer from 'inquirer';
import * as fs from 'fs';
import { startServer } from './startServer'; 
import { Node } from './node';
import path from 'path';

const nodes: Node[] = [];

// Função para exibir o menu principal
async function showMainMenu() {
  const choices = [
    { name: 'Criar um novo nó', value: 'create_node' },
    { name: 'Enviar arquivo', value: 'send_file' },
    { name: 'Recuperar arquivo por chave', value: 'retrieve_file' },
    { name: 'Encerrar um nó', value: 'close_node' }, // Nova opção para encerrar um nó
    { name: 'Sair', value: 'exit' },
  ];
  
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Selecione uma opção:',
      choices,
    },
  ]);
  
  return option;
}
  
// Função para criar um nó
async function createNode() {
  const { port } = await inquirer.prompt([
    { type: 'input', name: 'port', message: 'Digite a porta do nó:' },
  ]);
  
  const ip = '127.0.0.1'; // IP fixo
  const node = new Node(ip, parseInt(port));
  
  if (nodes.length > 0) {
    // Se já houver nós, juntar-se ao primeiro nó da lista
    const knownHosts = [{ ip: nodes[0].ip, port: nodes[0].port }];
    await node.join(knownHosts);
    console.log(`Nó ${ip}:${port} juntou-se à rede por meio do nó ${nodes[0].ip}:${nodes[0].port}`);
  } else {
    console.log(`Nó ${ip}:${port} inicializado como o nó inicial da rede.`);
  }
  
  await startServer(node); // Inicia o servidor gRPC
  nodes.push(node);
  console.log(`Nó criado em ${ip}:${port}`);
}
  
// Função para enviar um arquivo, permitindo escolher o servidor
async function sendFile() {
  if (nodes.length === 0) {
    console.log('É necessário criar pelo menos 1 nó para enviar arquivos.');
    return;
  }
  
  const filePath = path.join(__dirname, 'files');
  const files = fs.readdirSync(filePath);
  
  const { nodeIndex, fileName, customKey } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Selecione o nó para enviar o arquivo:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
    {
      type: 'list',
      name: 'fileName',
      message: 'Selecione o arquivo para enviar:',
      choices: files,
    },
    {
      type: 'input',
      name: 'customKey',
      message: 'Digite a chave personalizada para o arquivo:',
    },
  ]);
  
  const fileBuffer = fs.readFileSync(path.join(filePath, fileName));
  const selectedNode = nodes[nodeIndex]; // Escolher o nó específico para enviar o arquivo
  
  console.log(`Enviando o arquivo ${fileName} com a chave ${customKey} para ${selectedNode.ip}:${selectedNode.port}`);
    
  await selectedNode.store(customKey, fileBuffer);
  
  console.log(`Arquivo ${fileName} armazenado na rede com a chave ${customKey}.`);
}
  
// Função para recuperar arquivo a partir de uma chave, selecionando o nó
async function retrieveFile() {
  if (nodes.length === 0) {
    console.log('Nenhum nó disponível para recuperação de arquivos.');
    return;
  }
  
  const { nodeIndex, key } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Selecione o nó de onde recuperar o arquivo:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
    {
      type: 'input',
      name: 'key',
      message: 'Digite a chave do arquivo (ex: page.html):',
    },
  ]);
  
  const selectedNode = nodes[nodeIndex]; // Seleciona o nó escolhido pelo usuário
  
  const retrievedFile = await selectedNode.retrieve(key);
    
  if (retrievedFile) {
    const filePath = path.join(__dirname, 'retrieved_files', key);
    fs.writeFileSync(filePath, Buffer.from(retrievedFile));
    console.log(`Arquivo ${key} recuperado com sucesso e salvo em ${filePath}`);
  } else {
    console.log('Erro: Arquivo não encontrado.');
  }
}
  
// Função para encerrar um nó e executar o leave
async function closeNode() {
  if (nodes.length === 0) {
    console.log('Nenhum nó disponível para encerrar.');
    return;
  }
  
  const { nodeIndex } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeIndex',
      message: 'Selecione o nó para encerrar:',
      choices: nodes.map((node, index) => ({ name: `${node.ip}:${node.port}`, value: index })),
    },
  ]);
  
  const selectedNode = nodes[nodeIndex]; // Seleciona o nó escolhido pelo usuário
  
  console.log(`Encerrando o nó ${selectedNode.ip}:${selectedNode.port}...`);
    
  await selectedNode.leave();  // Executa a operação leave no nó
  
  nodes.splice(nodeIndex, 1); // Remove o nó da lista de nós ativos
  
  console.log(`Nó ${selectedNode.ip}:${selectedNode.port} foi encerrado e removido da rede.`);
}
  
// Função principal para rodar o menu
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
      case 'retrieve_file':  // Chamada para recuperar arquivo por chave, escolhendo nó
        await retrieveFile();
        break;
      case 'close_node':  // Chamada para encerrar um nó (leave)
        await closeNode();
        break;
      case 'exit':
        console.log('Encerrando o programa...');
        exit = true;
        process.exit(0);  // Encerra o processo do Node.js
        break;
    }
  }
}
  
runMenu().catch(err => console.error(err));