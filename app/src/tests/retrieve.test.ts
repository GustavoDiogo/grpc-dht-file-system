import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(true),
      retrieve: jest.fn().mockResolvedValue(Buffer.from('simulated_content')),
    })),
  };
});

describe('Node Storage and Retrieval', () => {
  it('should store a file with a key on the node', async () => {
    const node = new Node('127.0.0.1', 5001);
    const key = 'test_key';
    const value = 'File content';
  
    await node.store(key, Buffer.from(value));
  
    expect(node.store).toHaveBeenCalledWith(key, Buffer.from(value));
  });
  
  it('should retrieve a file by key', async () => {
    const node = new Node('127.0.0.1', 5001);
    const key = 'test_key';
  
    const retrievedValue = await node.retrieve(key);
  
    expect(node.retrieve).toHaveBeenCalledWith(key);
    expect(retrievedValue).toEqual(Buffer.from('simulated_content'));
  });
});
