import { Node } from '../node';

describe('Criação de Nó', () => {
  it('deve criar um nó com o IP e porta corretos', () => {
    const node = new Node('127.0.0.1', 5001);
    expect(node.ip).toBe('127.0.0.1');
    expect(node.port).toBe(5001);
    expect(node.successor).toBe(node);
  });

  it('deve gerar um ID aleatório se não for fornecido', () => {
    const node = new Node('127.0.0.1', 5001);
    expect(node.id).toHaveLength(40); // IDs têm 40 caracteres hexadecimais (160 bits)
  });
});
