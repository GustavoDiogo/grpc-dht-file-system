import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      leave: jest.fn().mockResolvedValue(true),
    })),
  };
});

describe('Operação de Saída do Nó (leave)', () => {
  it('deve executar a operação de saída corretamente', async () => {
    const node = new Node('127.0.0.1', 5001);

    await node.leave();

    expect(node.leave).toHaveBeenCalled();
  });
});
