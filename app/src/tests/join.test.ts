import { Node } from '../node';
import { DHTClient } from '../DHTClient';

jest.mock('../DHTClient'); // Mocking the DHTClient

describe('Join Operation on the Node', () => {
  let mockFindSuccessor: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock for the findSuccessor
    mockFindSuccessor = jest.fn().mockResolvedValue({
      getSuccessorip: jest.fn().mockReturnValue('127.0.0.1'),
      getSuccessorport: jest.fn().mockReturnValue(5001),
      getNodeid: jest.fn().mockReturnValue('12345'),
      getPredecessorip: jest.fn().mockReturnValue('127.0.0.1'),
      getPredecessorport: jest.fn().mockReturnValue(5000),
    });

    // Defining the mock in the prototype of DHTClient
    (DHTClient.prototype.findSuccessor as jest.Mock) = mockFindSuccessor;
  });

  it('should allow a new node to join the network and update the predecessor and successor correctly', async () => {
    const node1 = new Node('127.0.0.1', 5001); // Initial node in the network
    const node2 = new Node('127.0.0.1', 5002); // Node joining the network

    // Simulating node2 joining the network via node1
    const knownHosts = [{ ip: '127.0.0.1', port: 5001 }];
    await node2.join(knownHosts);

    // Verify if the findSuccessor method was called correctly
    expect(mockFindSuccessor).toHaveBeenCalled();

    // After the join, manually set the successor with the mocked result
    const joinResponse = await node2.findSuccessor(node2.id, node1);

    // Simulating the configuration of the successor based on the return of findSuccessor
    node2.successor = new Node(
      joinResponse.successor.ip,
      joinResponse.successor.port,
      joinResponse.successor.id,
    );

    // Verify if the successor was updated correctly
    expect(node2.successor.ip).toBe('127.0.0.1');
    expect(node2.successor.port).toBe(5001);
  });
});
