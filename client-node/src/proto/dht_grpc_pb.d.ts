// package: dhtchat
// file: dht.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as dht_pb from "./dht_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IDHTChatService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    join: IDHTChatService_IJoin;
    newNode: IDHTChatService_INewNode;
    leave: IDHTChatService_ILeave;
    nodeGone: IDHTChatService_INodeGone;
    store: IDHTChatService_IStore;
    retrieve: IDHTChatService_IRetrieve;
    ok: IDHTChatService_IOk;
    notFound: IDHTChatService_INotFound;
    transfer: IDHTChatService_ITransfer;
}

interface IDHTChatService_IJoin extends grpc.MethodDefinition<dht_pb.JoinRequest, dht_pb.JoinResponse> {
    path: "/dhtchat.DHTChat/Join";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.JoinRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.JoinRequest>;
    responseSerialize: grpc.serialize<dht_pb.JoinResponse>;
    responseDeserialize: grpc.deserialize<dht_pb.JoinResponse>;
}
interface IDHTChatService_INewNode extends grpc.MethodDefinition<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/NewNode";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.NodeInfo>;
    requestDeserialize: grpc.deserialize<dht_pb.NodeInfo>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_ILeave extends grpc.MethodDefinition<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/Leave";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.NodeInfo>;
    requestDeserialize: grpc.deserialize<dht_pb.NodeInfo>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_INodeGone extends grpc.MethodDefinition<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/NodeGone";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.NodeInfo>;
    requestDeserialize: grpc.deserialize<dht_pb.NodeInfo>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_IStore extends grpc.MethodDefinition<dht_pb.StoreRequest, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/Store";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.StoreRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.StoreRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_IRetrieve extends grpc.MethodDefinition<dht_pb.RetrieveRequest, dht_pb.RetrieveResponse> {
    path: "/dhtchat.DHTChat/Retrieve";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.RetrieveRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.RetrieveRequest>;
    responseSerialize: grpc.serialize<dht_pb.RetrieveResponse>;
    responseDeserialize: grpc.deserialize<dht_pb.RetrieveResponse>;
}
interface IDHTChatService_IOk extends grpc.MethodDefinition<dht_pb.RetrieveResponse, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/Ok";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.RetrieveResponse>;
    requestDeserialize: grpc.deserialize<dht_pb.RetrieveResponse>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_INotFound extends grpc.MethodDefinition<dht_pb.RetrieveRequest, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/NotFound";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.RetrieveRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.RetrieveRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IDHTChatService_ITransfer extends grpc.MethodDefinition<dht_pb.TransferData, google_protobuf_empty_pb.Empty> {
    path: "/dhtchat.DHTChat/Transfer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.TransferData>;
    requestDeserialize: grpc.deserialize<dht_pb.TransferData>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const DHTChatService: IDHTChatService;

export interface IDHTChatServer extends grpc.UntypedServiceImplementation {
    join: grpc.handleUnaryCall<dht_pb.JoinRequest, dht_pb.JoinResponse>;
    newNode: grpc.handleUnaryCall<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty>;
    leave: grpc.handleUnaryCall<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty>;
    nodeGone: grpc.handleUnaryCall<dht_pb.NodeInfo, google_protobuf_empty_pb.Empty>;
    store: grpc.handleUnaryCall<dht_pb.StoreRequest, google_protobuf_empty_pb.Empty>;
    retrieve: grpc.handleUnaryCall<dht_pb.RetrieveRequest, dht_pb.RetrieveResponse>;
    ok: grpc.handleUnaryCall<dht_pb.RetrieveResponse, google_protobuf_empty_pb.Empty>;
    notFound: grpc.handleUnaryCall<dht_pb.RetrieveRequest, google_protobuf_empty_pb.Empty>;
    transfer: grpc.handleUnaryCall<dht_pb.TransferData, google_protobuf_empty_pb.Empty>;
}

export interface IDHTChatClient {
    join(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    ok(request: dht_pb.RetrieveResponse, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    ok(request: dht_pb.RetrieveResponse, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    ok(request: dht_pb.RetrieveResponse, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    notFound(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    notFound(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    notFound(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferData, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class DHTChatClient extends grpc.Client implements IDHTChatClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public join(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeInfo, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public ok(request: dht_pb.RetrieveResponse, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public ok(request: dht_pb.RetrieveResponse, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public ok(request: dht_pb.RetrieveResponse, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public notFound(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public notFound(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public notFound(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferData, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
