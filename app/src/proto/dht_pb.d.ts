// package: dht
// file: dht.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class JoinRequest extends jspb.Message { 
    getNodeid(): string;
    setNodeid(value: string): JoinRequest;
    getIp(): string;
    setIp(value: string): JoinRequest;
    getPort(): number;
    setPort(value: number): JoinRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): JoinRequest.AsObject;
    static toObject(includeInstance: boolean, msg: JoinRequest): JoinRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: JoinRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): JoinRequest;
    static deserializeBinaryFromReader(message: JoinRequest, reader: jspb.BinaryReader): JoinRequest;
}

export namespace JoinRequest {
    export type AsObject = {
        nodeid: string,
        ip: string,
        port: number,
    }
}

export class JoinResponse extends jspb.Message { 
    getNodeid(): string;
    setNodeid(value: string): JoinResponse;
    getSuccessorip(): string;
    setSuccessorip(value: string): JoinResponse;
    getSuccessorport(): number;
    setSuccessorport(value: number): JoinResponse;
    getPredecessorip(): string;
    setPredecessorip(value: string): JoinResponse;
    getPredecessorport(): number;
    setPredecessorport(value: number): JoinResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): JoinResponse.AsObject;
    static toObject(includeInstance: boolean, msg: JoinResponse): JoinResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: JoinResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): JoinResponse;
    static deserializeBinaryFromReader(message: JoinResponse, reader: jspb.BinaryReader): JoinResponse;
}

export namespace JoinResponse {
    export type AsObject = {
        nodeid: string,
        successorip: string,
        successorport: number,
        predecessorip: string,
        predecessorport: number,
    }
}

export class NewNodeRequest extends jspb.Message { 
    getIp(): string;
    setIp(value: string): NewNodeRequest;
    getPort(): number;
    setPort(value: number): NewNodeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NewNodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NewNodeRequest): NewNodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NewNodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NewNodeRequest;
    static deserializeBinaryFromReader(message: NewNodeRequest, reader: jspb.BinaryReader): NewNodeRequest;
}

export namespace NewNodeRequest {
    export type AsObject = {
        ip: string,
        port: number,
    }
}

export class LeaveRequest extends jspb.Message { 
    getNodeid(): string;
    setNodeid(value: string): LeaveRequest;
    getIp(): string;
    setIp(value: string): LeaveRequest;
    getPort(): number;
    setPort(value: number): LeaveRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LeaveRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LeaveRequest): LeaveRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LeaveRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LeaveRequest;
    static deserializeBinaryFromReader(message: LeaveRequest, reader: jspb.BinaryReader): LeaveRequest;
}

export namespace LeaveRequest {
    export type AsObject = {
        nodeid: string,
        ip: string,
        port: number,
    }
}

export class NodeGoneRequest extends jspb.Message { 
    getNodeid(): string;
    setNodeid(value: string): NodeGoneRequest;
    getIp(): string;
    setIp(value: string): NodeGoneRequest;
    getPort(): number;
    setPort(value: number): NodeGoneRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeGoneRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeGoneRequest): NodeGoneRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeGoneRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeGoneRequest;
    static deserializeBinaryFromReader(message: NodeGoneRequest, reader: jspb.BinaryReader): NodeGoneRequest;
}

export namespace NodeGoneRequest {
    export type AsObject = {
        nodeid: string,
        ip: string,
        port: number,
    }
}

export class StoreRequest extends jspb.Message { 
    getKey(): string;
    setKey(value: string): StoreRequest;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): StoreRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StoreRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StoreRequest): StoreRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StoreRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StoreRequest;
    static deserializeBinaryFromReader(message: StoreRequest, reader: jspb.BinaryReader): StoreRequest;
}

export namespace StoreRequest {
    export type AsObject = {
        key: string,
        value: Uint8Array | string,
    }
}

export class RetrieveRequest extends jspb.Message { 
    getKey(): string;
    setKey(value: string): RetrieveRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RetrieveRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RetrieveRequest): RetrieveRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RetrieveRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RetrieveRequest;
    static deserializeBinaryFromReader(message: RetrieveRequest, reader: jspb.BinaryReader): RetrieveRequest;
}

export namespace RetrieveRequest {
    export type AsObject = {
        key: string,
    }
}

export class RetrieveResponse extends jspb.Message { 
    getKey(): string;
    setKey(value: string): RetrieveResponse;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): RetrieveResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RetrieveResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RetrieveResponse): RetrieveResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RetrieveResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RetrieveResponse;
    static deserializeBinaryFromReader(message: RetrieveResponse, reader: jspb.BinaryReader): RetrieveResponse;
}

export namespace RetrieveResponse {
    export type AsObject = {
        key: string,
        value: Uint8Array | string,
    }
}

export class TransferRequest extends jspb.Message { 
    clearPairsList(): void;
    getPairsList(): Array<KeyValue>;
    setPairsList(value: Array<KeyValue>): TransferRequest;
    addPairs(value?: KeyValue, index?: number): KeyValue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TransferRequest): TransferRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferRequest;
    static deserializeBinaryFromReader(message: TransferRequest, reader: jspb.BinaryReader): TransferRequest;
}

export namespace TransferRequest {
    export type AsObject = {
        pairsList: Array<KeyValue.AsObject>,
    }
}

export class KeyValue extends jspb.Message { 
    getKey(): string;
    setKey(value: string): KeyValue;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): KeyValue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyValue.AsObject;
    static toObject(includeInstance: boolean, msg: KeyValue): KeyValue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyValue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyValue;
    static deserializeBinaryFromReader(message: KeyValue, reader: jspb.BinaryReader): KeyValue;
}

export namespace KeyValue {
    export type AsObject = {
        key: string,
        value: Uint8Array | string,
    }
}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}
