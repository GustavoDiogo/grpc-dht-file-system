import { DHTNode as Node } from './apis/dhtGRPC'; // Supondo que o código Node e gRPC Server estejam em node.ts
import { startServer } from './server'; // Supondo que o código startServer esteja em server.ts
import { DHTClient } from './client';

const nodes: Node[] = [];

// Função para criar e iniciar um nó
async function createAndStartNode(ip: string, port: number, knownHosts: { ip: string; port: number }[] = []): Promise<Node> {
  const node = new Node(ip, port);
  await startServer(node); // Inicia o servidor gRPC
  await node.join(knownHosts); // Conecta o nó à DHT usando knownHosts
  nodes.push(node);
  console.log(`Nó iniciado em ${ip}:${port} com ID ${node.id}`);
  return node;
}

// Função para simular a interação entre nós
async function simulateNodes() {
  try {
    // Inicia o primeiro nó (não conhece nenhum host)
    const node1 = await createAndStartNode('127.0.0.1', 5001);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Inicia o segundo nó e conecta ao primeiro nó
    const node2 = await createAndStartNode('127.0.0.1', 5002, [{ ip: '127.0.0.1', port: 5001 }]);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Inicia o terceiro nó e conecta ao segundo nó
    const node3 = await createAndStartNode('127.0.0.1', 5003, [{ ip: '127.0.0.1', port: 5002 }]);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Teste de armazenamento e recuperação
    const node1Client = new DHTClient('127.0.0.1', 5001);
    await node1Client.store('key1', Buffer.from('value1'));

    await new Promise(resolve => setTimeout(resolve, 2000));

    const node3Client = new DHTClient('127.0.0.1', 5003);
    const retrievedValue = await node3Client.retrieve('key1');
    console.log(`Valor recuperado em node3: ${Buffer.from(retrievedValue.getValue_asU8())}`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Inicia o quarto nó e conecta ao terceiro nó
    const node4 = await createAndStartNode('127.0.0.1', 5004, [{ ip: '127.0.0.1', port: 5003 }]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simula a saída de um nó
    await node2.leave();
    console.log('Nó 2 deixou a rede.');

    // Armazena e recupera outro valor para garantir a consistência após a saída do nó
    // await node1Client.store('key2', Buffer.from('value2'));

    // await new Promise(resolve => setTimeout(resolve, 2000));

    // const node4Client = new DHTClient('127.0.0.1', 5003);

    // const retrievedValue2 = await node4Client.retrieve('key2');
    // console.log(`Valor recuperado em node4: ${Buffer.from(retrievedValue2.getValue_asU8())}`);

  } catch (error) {
    console.error('Erro na simulação dos nós:', error);
  }
}

simulateNodes().catch(err => {
  console.error('Erro na simulação dos nós:', err);
});
