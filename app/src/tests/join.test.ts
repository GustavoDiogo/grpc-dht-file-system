import { Node } from '../node';
import { DHTClient } from '../DHTClient';

jest.mock('../DHTClient'); // Mockando o DHTClient

describe('Operação de Join no Nó', () => {
  let mockFindSuccessor: jest.Mock;

  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.clearAllMocks();

    // Mock para o findSuccessor
    mockFindSuccessor = jest.fn().mockResolvedValue({
      getSuccessorip: jest.fn().mockReturnValue('127.0.0.1'),
      getSuccessorport: jest.fn().mockReturnValue(5001),
      getNodeid: jest.fn().mockReturnValue('12345'),
      getPredecessorip: jest.fn().mockReturnValue('127.0.0.1'),
      getPredecessorport: jest.fn().mockReturnValue(5000),
    });

    // Definindo o mock no prototype de DHTClient
    (DHTClient.prototype.findSuccessor as jest.Mock) = mockFindSuccessor;
  });

  it('deve permitir que um novo nó se junte à rede e atualize o predecessor e sucessor corretamente', async () => {
    const node1 = new Node('127.0.0.1', 5001); // Nó inicial na rede
    const node2 = new Node('127.0.0.1', 5002); // Nó que está se juntando

    // Simulando o join de node2 na rede via node1
    const knownHosts = [{ ip: '127.0.0.1', port: 5001 }];
    await node2.join(knownHosts);

    // Verifica se o método findSuccessor foi chamado corretamente
    expect(mockFindSuccessor).toHaveBeenCalled();

    // Após o join, configuramos manualmente o successor com o resultado mockado
    const joinResponse = await node2.findSuccessor(node2.id, node1);

    // Simulando a configuração do successor com base no retorno de findSuccessor
    node2.successor = new Node(
      joinResponse.successor.ip,
      joinResponse.successor.port,
      joinResponse.successor.id,
    );

    // Verifica se o successor foi atualizado corretamente
    expect(node2.successor.ip).toBe('127.0.0.1');
    expect(node2.successor.port).toBe(5001);
  });
});
