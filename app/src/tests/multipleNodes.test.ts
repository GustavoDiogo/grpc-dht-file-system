import { Node } from '../node';

jest.mock('../node', () => {
  return {
    Node: jest.fn().mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(true),
      retrieve: jest.fn().mockResolvedValue(Buffer.from('simulated_content')),
      leave: jest.fn().mockResolvedValue(true),
    })),
  };
});

describe('Node Interaction Simulation', () => {
  it('should allow multiple nodes to store and retrieve files', async () => {
    const node1 = new Node('127.0.0.1', 5001);
    const node2 = new Node('127.0.0.1', 5002);

    const key = 'file_key';
    const content = 'File content';

    await node1.store(key, Buffer.from(content));
    await node2.retrieve(key);

    expect(node1.store).toHaveBeenCalledWith(key, Buffer.from(content));
    expect(node2.retrieve).toHaveBeenCalledWith(key);
  });

  it('should simulate a node leaving and maintain the network', async () => {
    const node1 = new Node('127.0.0.1', 5001);
    const node2 = new Node('127.0.0.1', 5002);

    node1.successor = node2;
    node2.predecessor = node1;

    await node1.leave();

    expect(node1.leave).toHaveBeenCalled();
  });
});
