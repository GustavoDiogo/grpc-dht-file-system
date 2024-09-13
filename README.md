# Distributed Hash Table (DHT) Simulation using gRPC

This project simulates a **Distributed Hash Table (DHT)** using **gRPC**. It demonstrates the core operations of a DHT, such as adding nodes, storing and retrieving data, and maintaining a consistent ring topology. The system is built in **Node.js** and **TypeScript**, with communication between nodes happening through gRPC.

## Key Features

- **Node Join and Leave**: Nodes can dynamically join or leave the network, and the DHT automatically updates the ring's structure to maintain consistency.
- **Data Storage and Retrieval**: Data (files or key-value pairs) can be stored in the DHT and retrieved based on a hashed key.
- **gRPC Communication**: All inter-node communication happens via gRPC, making the system efficient and scalable.
- **Simulating Node Failure**: The system handles node exits, ensuring data consistency by transferring responsibility for stored data to the remaining nodes.
- **Interactive Menu**: An interactive CLI menu allows you to simulate operations such as adding nodes, storing files, retrieving files, and closing nodes.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [DHT Architecture](#dht-architecture)
4. [Running Tests](#running-tests)

## Installation

To get started with the DHT simulation, you need to have **Node.js** installed. Clone the repository and install the dependencies:

```bash
bash install.sh
```

## Usage

Once the dependencies are installed, you can start the interactive DHT simulation:

```bash
npm start
```

Create new nodes.
Send files to specific nodes.
Retrieve files from specific nodes using a key.
Exit nodes from the network gracefully.

## DHT Architecture

### How It Works

- Ring Topology: Nodes are arranged in a circular structure, where each node knows its successor and predecessor. This allows the DHT to distribute the data across the network based on consistent hashing.

- Joining the DHT: When a new node joins the network, it locates its successor and predecessor, updating the ring structure dynamically. The new node also takes responsibility for a portion of the data previously managed by its successor.

- Leaving the DHT: When a node leaves, it transfers its data to its successor, ensuring that no data is lost. The successor and predecessor pointers are updated to maintain the integrity of the DHT.

- Data Storage: Each node is responsible for storing the data based on hashed keys. When a node receives a request to store data, it calculates the hash of the key to determine which node is responsible for storing that data.

- Data Retrieval: When a node wants to retrieve data, it hashes the key and sends a request to the appropriate node in the network.

### Operations

- Join: Allows a new node to join the DHT, updating successor and predecessor nodes.
- Leave: Allows a node to leave the DHT, transferring data to its successor.
- Store: Stores a key-value pair in the appropriate node based on the hash of the key.
- Retrieve: Retrieves data from the network based on the hashed key.
- Transfer: Transfers data between nodes when a new node joins or an existing node leaves.

Example Flow

1. Node 1 joins the network.
2. Node 2 joins and connects to Node 1.
3. A file is stored in Node 1.
4. Node 3 joins the network, and Node 1 transfers some of its data to Node 3.
5. The file can now be retrieved from either Node 1 or Node 3, depending on the hashed key.

## Running Tests

The project includes unit tests that simulate node interactions and verify the behavior of the DHT system. Tests cover core functionalities such as join, leave, store, and retrieve.

### Unit

```bash
npm run test:unit
```

Testing Features

- Join Simulation: Tests the ability of a new node to join the DHT and update its successor and predecessor.
- Store and Retrieve: Verifies that data is stored in the correct node and can be retrieved using the appropriate key.
- Leave Operation: Ensures that when a node leaves, its data is transferred to the successor and the ring is updated correctly.

### Integration

```bash
npm run test:integration
```
