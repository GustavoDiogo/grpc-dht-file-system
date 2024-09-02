import {  Node, startServer, DHTClient } from './index';

import fs from 'fs';

const nodes: Node[] = [];

// Função para criar e iniciar um nó
async function createAndStartNode(ip: string, port: number, knownHosts: { ip: string; port: number }[] = []): Promise<Node> {
  const node = new Node(ip, port);
  await node.join(knownHosts); // Conecta o nó à DHT usando knownHosts
  nodes.push(node);
  await startServer(node); // Inicia o servidor gRPC
  console.log(`(SCRIPT) Nó iniciado em ${ip}:${port} com ID ${node.id}`);
  return node;
}

// Requisitos:
// As mensagens JOIN, STORE e RETRIEVE devem ser roteadas através
// do anel até alcançarem o nó onde serão efetivamente processadas.
//
// As mensagens JOIN_OK, OK, LEAVE, NEW_NODE, NODE_GONE, TRANSFER e
// NOT_FOUND devem ser enviadas diretamente ao destinatário, sem
// serem roteadas pelo anel.
async function simulateNodes() {
  try {
    const node1 = await createAndStartNode('127.0.0.1', 5001);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const node2 = await createAndStartNode('127.0.0.1', 5002, [{ ip: '127.0.0.1', port: 5001 }]);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const node3 = await createAndStartNode('127.0.0.1', 5003, [{ ip: '127.0.0.1', port: 5002 }]);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Armazenar e recuperar dados para validar funcionamento
    const htmlFile = fs.readFileSync(__dirname + '/files/page.html');
    console.log('(SCRIPT) Armazenando key1');
    await node1.store('key1', htmlFile);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('(SCRIPT) Tentando recuperar key1 no node3');
    const retrievedValue = await node3.retrieve('key1');
    if (retrievedValue) {
      console.log(`(SCRIPT) Valor recuperado em node3: ${new TextDecoder().decode(retrievedValue)}`);
    } else {
      console.log('(SCRIPT) Chave key1 não encontrada em node3');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
      
    // Inicia o quarto nó e conecta ao terceiro nó
    const node4 = await createAndStartNode('127.0.0.1', 5004, [{ ip: '127.0.0.1', port: 5003 }]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simula a saída de um nó
    const node2Client = new DHTClient('127.0.0.1', 5002);
    await node2Client.leave('127.0.0.1', 5002); 
    console.log('(SCRIPT) Nó 2 deixou a rede.');
      
    await new Promise(resolve => setTimeout(resolve, 2000));
      
    // Armazena e recupera outro valor para garantir a consistência após a saída do nó
    const txtFile = fs.readFileSync(__dirname + '/files/text.txt');
    await node1.store('key2', txtFile);
      
    await new Promise(resolve => setTimeout(resolve, 1000));
      
    const retrievedValue2 = await node4.retrieve('key2');
    if (retrievedValue2) {
      console.log(`(SCRIPT) Valor recuperado em node4: ${new TextDecoder().decode(retrievedValue2)}`);
    } else {
      console.log('(SCRIPT) Chave key2 não encontrada em node4');
    }

    // Simula a mensagem NOT_FOUND
    const notFoundValue = await node4.retrieve('key3');
    if (!notFoundValue) {
      console.log('(SCRIPT) Chave key3 não encontrada');
    }
  } catch (error) {
    console.error('(SCRIPT) Erro na simulação dos nós:', error);
  }
}

simulateNodes().catch(err => {
  console.error('(SCRIPT) Erro na simulação dos nós:', err);
});
