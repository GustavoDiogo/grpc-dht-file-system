// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var dht_pb = require('./dht_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_dhtchat_JoinRequest(arg) {
  if (!(arg instanceof dht_pb.JoinRequest)) {
    throw new Error('Expected argument of type dhtchat.JoinRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_JoinRequest(buffer_arg) {
  return dht_pb.JoinRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_JoinResponse(arg) {
  if (!(arg instanceof dht_pb.JoinResponse)) {
    throw new Error('Expected argument of type dhtchat.JoinResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_JoinResponse(buffer_arg) {
  return dht_pb.JoinResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_NodeInfo(arg) {
  if (!(arg instanceof dht_pb.NodeInfo)) {
    throw new Error('Expected argument of type dhtchat.NodeInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_NodeInfo(buffer_arg) {
  return dht_pb.NodeInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_RetrieveRequest(arg) {
  if (!(arg instanceof dht_pb.RetrieveRequest)) {
    throw new Error('Expected argument of type dhtchat.RetrieveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_RetrieveRequest(buffer_arg) {
  return dht_pb.RetrieveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_RetrieveResponse(arg) {
  if (!(arg instanceof dht_pb.RetrieveResponse)) {
    throw new Error('Expected argument of type dhtchat.RetrieveResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_RetrieveResponse(buffer_arg) {
  return dht_pb.RetrieveResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_StoreRequest(arg) {
  if (!(arg instanceof dht_pb.StoreRequest)) {
    throw new Error('Expected argument of type dhtchat.StoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_StoreRequest(buffer_arg) {
  return dht_pb.StoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dhtchat_TransferData(arg) {
  if (!(arg instanceof dht_pb.TransferData)) {
    throw new Error('Expected argument of type dhtchat.TransferData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dhtchat_TransferData(buffer_arg) {
  return dht_pb.TransferData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var DHTChatService = exports.DHTChatService = {
  join: {
    path: '/dhtchat.DHTChat/Join',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.JoinRequest,
    responseType: dht_pb.JoinResponse,
    requestSerialize: serialize_dhtchat_JoinRequest,
    requestDeserialize: deserialize_dhtchat_JoinRequest,
    responseSerialize: serialize_dhtchat_JoinResponse,
    responseDeserialize: deserialize_dhtchat_JoinResponse,
  },
  newNode: {
    path: '/dhtchat.DHTChat/NewNode',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.NodeInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_NodeInfo,
    requestDeserialize: deserialize_dhtchat_NodeInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  leave: {
    path: '/dhtchat.DHTChat/Leave',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.NodeInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_NodeInfo,
    requestDeserialize: deserialize_dhtchat_NodeInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  nodeGone: {
    path: '/dhtchat.DHTChat/NodeGone',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.NodeInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_NodeInfo,
    requestDeserialize: deserialize_dhtchat_NodeInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  store: {
    path: '/dhtchat.DHTChat/Store',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.StoreRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_StoreRequest,
    requestDeserialize: deserialize_dhtchat_StoreRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  retrieve: {
    path: '/dhtchat.DHTChat/Retrieve',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.RetrieveRequest,
    responseType: dht_pb.RetrieveResponse,
    requestSerialize: serialize_dhtchat_RetrieveRequest,
    requestDeserialize: deserialize_dhtchat_RetrieveRequest,
    responseSerialize: serialize_dhtchat_RetrieveResponse,
    responseDeserialize: deserialize_dhtchat_RetrieveResponse,
  },
  ok: {
    path: '/dhtchat.DHTChat/Ok',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.RetrieveResponse,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_RetrieveResponse,
    requestDeserialize: deserialize_dhtchat_RetrieveResponse,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  notFound: {
    path: '/dhtchat.DHTChat/NotFound',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.RetrieveRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_RetrieveRequest,
    requestDeserialize: deserialize_dhtchat_RetrieveRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  transfer: {
    path: '/dhtchat.DHTChat/Transfer',
    requestStream: false,
    responseStream: false,
    requestType: dht_pb.TransferData,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_dhtchat_TransferData,
    requestDeserialize: deserialize_dhtchat_TransferData,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.DHTChatClient = grpc.makeGenericClientConstructor(DHTChatService);
