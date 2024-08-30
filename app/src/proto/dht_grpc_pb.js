// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var dht_pb = require('./dht_pb.js');

function serialize_dht_Empty(arg) {
  if (!(arg instanceof dht_pb.Empty)) {
    throw new Error('Expected argument of type dht.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_Empty(buffer_arg) {
  return dht_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_JoinRequest(arg) {
  if (!(arg instanceof dht_pb.JoinRequest)) {
    throw new Error('Expected argument of type dht.JoinRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_JoinRequest(buffer_arg) {
  return dht_pb.JoinRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_JoinResponse(arg) {
  if (!(arg instanceof dht_pb.JoinResponse)) {
    throw new Error('Expected argument of type dht.JoinResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_JoinResponse(buffer_arg) {
  return dht_pb.JoinResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_LeaveRequest(arg) {
  if (!(arg instanceof dht_pb.LeaveRequest)) {
    throw new Error('Expected argument of type dht.LeaveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_LeaveRequest(buffer_arg) {
  return dht_pb.LeaveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_NewNodeRequest(arg) {
  if (!(arg instanceof dht_pb.NewNodeRequest)) {
    throw new Error('Expected argument of type dht.NewNodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_NewNodeRequest(buffer_arg) {
  return dht_pb.NewNodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_NodeGoneRequest(arg) {
  if (!(arg instanceof dht_pb.NodeGoneRequest)) {
    throw new Error('Expected argument of type dht.NodeGoneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_NodeGoneRequest(buffer_arg) {
  return dht_pb.NodeGoneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_RetrieveRequest(arg) {
  if (!(arg instanceof dht_pb.RetrieveRequest)) {
    throw new Error('Expected argument of type dht.RetrieveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_RetrieveRequest(buffer_arg) {
  return dht_pb.RetrieveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_RetrieveResponse(arg) {
  if (!(arg instanceof dht_pb.RetrieveResponse)) {
    throw new Error('Expected argument of type dht.RetrieveResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_RetrieveResponse(buffer_arg) {
  return dht_pb.RetrieveResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_StoreRequest(arg) {
  if (!(arg instanceof dht_pb.StoreRequest)) {
    throw new Error('Expected argument of type dht.StoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_StoreRequest(buffer_arg) {
  return dht_pb.StoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dht_TransferRequest(arg) {
  if (!(arg instanceof dht_pb.TransferRequest)) {
    throw new Error('Expected argument of type dht.TransferRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dht_TransferRequest(buffer_arg) {
  return dht_pb.TransferRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var DHTServiceService = exports.DHTServiceService = {
  join: {
    path: '/dht.DHTService/Join',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.JoinRequest,
    responseType: dht_pb.JoinResponse,
    requestSerialize: serialize_dht_JoinRequest,
    requestDeserialize: deserialize_dht_JoinRequest,
    responseSerialize: serialize_dht_JoinResponse,
    responseDeserialize: deserialize_dht_JoinResponse,
  },
  newNode: {
    path: '/dht.DHTService/NewNode',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.NewNodeRequest,
    responseType: dht_pb.Empty,
    requestSerialize: serialize_dht_NewNodeRequest,
    requestDeserialize: deserialize_dht_NewNodeRequest,
    responseSerialize: serialize_dht_Empty,
    responseDeserialize: deserialize_dht_Empty,
  },
  leave: {
    path: '/dht.DHTService/Leave',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.LeaveRequest,
    responseType: dht_pb.Empty,
    requestSerialize: serialize_dht_LeaveRequest,
    requestDeserialize: deserialize_dht_LeaveRequest,
    responseSerialize: serialize_dht_Empty,
    responseDeserialize: deserialize_dht_Empty,
  },
  nodeGone: {
    path: '/dht.DHTService/NodeGone',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.NodeGoneRequest,
    responseType: dht_pb.Empty,
    requestSerialize: serialize_dht_NodeGoneRequest,
    requestDeserialize: deserialize_dht_NodeGoneRequest,
    responseSerialize: serialize_dht_Empty,
    responseDeserialize: deserialize_dht_Empty,
  },
  store: {
    path: '/dht.DHTService/Store',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.StoreRequest,
    responseType: dht_pb.Empty,
    requestSerialize: serialize_dht_StoreRequest,
    requestDeserialize: deserialize_dht_StoreRequest,
    responseSerialize: serialize_dht_Empty,
    responseDeserialize: deserialize_dht_Empty,
  },
  retrieve: {
    path: '/dht.DHTService/Retrieve',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.RetrieveRequest,
    responseType: dht_pb.RetrieveResponse,
    requestSerialize: serialize_dht_RetrieveRequest,
    requestDeserialize: deserialize_dht_RetrieveRequest,
    responseSerialize: serialize_dht_RetrieveResponse,
    responseDeserialize: deserialize_dht_RetrieveResponse,
  },
  transfer: {
    path: '/dht.DHTService/Transfer',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.TransferRequest,
    responseType: dht_pb.Empty,
    requestSerialize: serialize_dht_TransferRequest,
    requestDeserialize: deserialize_dht_TransferRequest,
    responseSerialize: serialize_dht_Empty,
    responseDeserialize: deserialize_dht_Empty,
  },
};

exports.DHTServiceClient = grpc.makeGenericClientConstructor(DHTServiceService);
