import { Node } from '../node';

describe('Armazenamento no Nó', () => {
  it('deve armazenar um valor com uma chave no nó', async () => {
    const node = new Node('127.0.0.1', 5001);
    const chave = 'chave_teste';
    const valor = 'Olá, mundo!';
    
    await node.store(chave, valor);

    expect(node.data.get(chave)).toEqual(Buffer.from(valor));
  });
});
