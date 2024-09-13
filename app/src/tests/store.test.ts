import { Node } from '../node';

describe('Node Storage', () => {
  it('should store a value with a key on the node', async () => {
    const node = new Node('127.0.0.1', 5001);
    const key = 'test_key';
    const value = 'Hello, world!';
    
    await node.store(key, value);

    expect(node.data.get(key)).toEqual(Buffer.from(value));
  });
});
