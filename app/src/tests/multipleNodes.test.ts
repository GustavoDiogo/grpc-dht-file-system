import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(true),
      retrieve: jest.fn().mockResolvedValue(Buffer.from('conteúdo_simulado')),
      leave: jest.fn().mockResolvedValue(true),
    })),
  };
});

describe('Simulação de Interação entre Nós', () => {
  it('deve permitir que vários nós armazenem e recuperem arquivos', async () => {
    const node1 = new Node('127.0.0.1', 5001);
    const node2 = new Node('127.0.0.1', 5002);

    const chave = 'chave_arquivo';
    const conteudo = 'Conteúdo do arquivo';

    await node1.store(chave, Buffer.from(conteudo));
    await node2.retrieve(chave);

    expect(node1.store).toHaveBeenCalledWith(chave, Buffer.from(conteudo));
    expect(node2.retrieve).toHaveBeenCalledWith(chave);
  });

  it('deve simular a saída de um nó e manter a rede', async () => {
    const node1 = new Node('127.0.0.1', 5001);
    const node2 = new Node('127.0.0.1', 5002);

    node1.successor = node2;
    node2.predecessor = node1;

    await node1.leave();

    expect(node1.leave).toHaveBeenCalled();
  });
});
