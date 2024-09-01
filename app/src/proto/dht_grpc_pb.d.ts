// package: dht
// file: dht.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as dht_pb from "./dht_pb";

interface IDHTServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    join: IDHTServiceService_IJoin;
    newNode: IDHTServiceService_INewNode;
    leave: IDHTServiceService_ILeave;
    nodeGone: IDHTServiceService_INodeGone;
    store: IDHTServiceService_IStore;
    retrieve: IDHTServiceService_IRetrieve;
    transfer: IDHTServiceService_ITransfer;
    findSuccessor: IDHTServiceService_IFindSuccessor;
}

interface IDHTServiceService_IJoin extends grpc.MethodDefinition<dht_pb.JoinRequest, dht_pb.JoinResponse> {
    path: "/dht.DHTService/Join";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.JoinRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.JoinRequest>;
    responseSerialize: grpc.serialize<dht_pb.JoinResponse>;
    responseDeserialize: grpc.deserialize<dht_pb.JoinResponse>;
}
interface IDHTServiceService_INewNode extends grpc.MethodDefinition<dht_pb.NewNodeRequest, dht_pb.Empty> {
    path: "/dht.DHTService/NewNode";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.NewNodeRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.NewNodeRequest>;
    responseSerialize: grpc.serialize<dht_pb.Empty>;
    responseDeserialize: grpc.deserialize<dht_pb.Empty>;
}
interface IDHTServiceService_ILeave extends grpc.MethodDefinition<dht_pb.LeaveRequest, dht_pb.Empty> {
    path: "/dht.DHTService/Leave";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.LeaveRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.LeaveRequest>;
    responseSerialize: grpc.serialize<dht_pb.Empty>;
    responseDeserialize: grpc.deserialize<dht_pb.Empty>;
}
interface IDHTServiceService_INodeGone extends grpc.MethodDefinition<dht_pb.NodeGoneRequest, dht_pb.Empty> {
    path: "/dht.DHTService/NodeGone";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.NodeGoneRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.NodeGoneRequest>;
    responseSerialize: grpc.serialize<dht_pb.Empty>;
    responseDeserialize: grpc.deserialize<dht_pb.Empty>;
}
interface IDHTServiceService_IStore extends grpc.MethodDefinition<dht_pb.StoreRequest, dht_pb.Empty> {
    path: "/dht.DHTService/Store";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.StoreRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.StoreRequest>;
    responseSerialize: grpc.serialize<dht_pb.Empty>;
    responseDeserialize: grpc.deserialize<dht_pb.Empty>;
}
interface IDHTServiceService_IRetrieve extends grpc.MethodDefinition<dht_pb.RetrieveRequest, dht_pb.RetrieveResponse> {
    path: "/dht.DHTService/Retrieve";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.RetrieveRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.RetrieveRequest>;
    responseSerialize: grpc.serialize<dht_pb.RetrieveResponse>;
    responseDeserialize: grpc.deserialize<dht_pb.RetrieveResponse>;
}
interface IDHTServiceService_ITransfer extends grpc.MethodDefinition<dht_pb.TransferRequest, dht_pb.Empty> {
    path: "/dht.DHTService/Transfer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.TransferRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.TransferRequest>;
    responseSerialize: grpc.serialize<dht_pb.Empty>;
    responseDeserialize: grpc.deserialize<dht_pb.Empty>;
}
interface IDHTServiceService_IFindSuccessor extends grpc.MethodDefinition<dht_pb.JoinRequest, dht_pb.JoinResponse> {
    path: "/dht.DHTService/FindSuccessor";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dht_pb.JoinRequest>;
    requestDeserialize: grpc.deserialize<dht_pb.JoinRequest>;
    responseSerialize: grpc.serialize<dht_pb.JoinResponse>;
    responseDeserialize: grpc.deserialize<dht_pb.JoinResponse>;
}

export const DHTServiceService: IDHTServiceService;

export interface IDHTServiceServer extends grpc.UntypedServiceImplementation {
    join: grpc.handleUnaryCall<dht_pb.JoinRequest, dht_pb.JoinResponse>;
    newNode: grpc.handleUnaryCall<dht_pb.NewNodeRequest, dht_pb.Empty>;
    leave: grpc.handleUnaryCall<dht_pb.LeaveRequest, dht_pb.Empty>;
    nodeGone: grpc.handleUnaryCall<dht_pb.NodeGoneRequest, dht_pb.Empty>;
    store: grpc.handleUnaryCall<dht_pb.StoreRequest, dht_pb.Empty>;
    retrieve: grpc.handleUnaryCall<dht_pb.RetrieveRequest, dht_pb.RetrieveResponse>;
    transfer: grpc.handleUnaryCall<dht_pb.TransferRequest, dht_pb.Empty>;
    findSuccessor: grpc.handleUnaryCall<dht_pb.JoinRequest, dht_pb.JoinResponse>;
}

export interface IDHTServiceClient {
    join(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NewNodeRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NewNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    newNode(request: dht_pb.NewNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.LeaveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.LeaveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    leave(request: dht_pb.LeaveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeGoneRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeGoneRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    nodeGone(request: dht_pb.NodeGoneRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    transfer(request: dht_pb.TransferRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    findSuccessor(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    findSuccessor(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    findSuccessor(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
}

export class DHTServiceClient extends grpc.Client implements IDHTServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public join(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public join(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NewNodeRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NewNodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public newNode(request: dht_pb.NewNodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.LeaveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.LeaveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public leave(request: dht_pb.LeaveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeGoneRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeGoneRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public nodeGone(request: dht_pb.NodeGoneRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public store(request: dht_pb.StoreRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public retrieve(request: dht_pb.RetrieveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.RetrieveResponse) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public transfer(request: dht_pb.TransferRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.Empty) => void): grpc.ClientUnaryCall;
    public findSuccessor(request: dht_pb.JoinRequest, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public findSuccessor(request: dht_pb.JoinRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
    public findSuccessor(request: dht_pb.JoinRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dht_pb.JoinResponse) => void): grpc.ClientUnaryCall;
}
