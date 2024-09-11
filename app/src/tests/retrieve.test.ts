import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(true),
      retrieve: jest.fn().mockResolvedValue(Buffer.from('conteúdo_simulado')),
    })),
  };
});
  
describe('Armazenamento e Recuperação no Nó', () => {
  it('deve armazenar um arquivo com uma chave no nó', async () => {
    const node = new Node('127.0.0.1', 5001);
    const chave = 'chave_teste';
    const valor = 'Conteúdo do arquivo';
  
    await node.store(chave, Buffer.from(valor));
  
    expect(node.store).toHaveBeenCalledWith(chave, Buffer.from(valor));
  });
  
  it('deve recuperar um arquivo pela chave', async () => {
    const node = new Node('127.0.0.1', 5001);
    const chave = 'chave_teste';
  
    const valorRecuperado = await node.retrieve(chave);
  
    expect(node.retrieve).toHaveBeenCalledWith(chave);
    expect(valorRecuperado).toEqual(Buffer.from('conteúdo_simulado'));
  });
});