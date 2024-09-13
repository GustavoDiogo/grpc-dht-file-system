import { Node } from '../node';

describe('Node Creation', () => {
  it('should create a node with the correct IP and port', () => {
    const node = new Node('127.0.0.1', 5001);
    expect(node.ip).toBe('127.0.0.1');
    expect(node.port).toBe(5001);
    expect(node.successor).toBe(node);
  });

  it('should generate a random ID if none is provided', () => {
    const node = new Node('127.0.0.1', 5001);
    expect(node.id).toHaveLength(40); // IDs have 40 hexadecimal characters (160 bits)
  });
});
