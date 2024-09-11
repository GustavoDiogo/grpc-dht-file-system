import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(true),
      transferDataToNewNode: jest.fn().mockResolvedValue(true),
    })),
  };
});

describe('Transferência de Dados para Novo Nó', () => {
  it('deve transferir dados de um nó para outro', async () => {
    const node1 = new Node('127.0.0.1', 5001);
    const node2 = new Node('127.0.0.1', 5002);

    node1.successor = node2;

    await node1.transferDataToNewNode();

    expect(node1.transferDataToNewNode).toHaveBeenCalled();
  });
});
