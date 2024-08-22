// package: dhtchat
// file: dht.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

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

export class NodeInfo extends jspb.Message { 
    getNodeid(): string;
    setNodeid(value: string): NodeInfo;
    getIp(): string;
    setIp(value: string): NodeInfo;
    getPort(): number;
    setPort(value: number): NodeInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeInfo.AsObject;
    static toObject(includeInstance: boolean, msg: NodeInfo): NodeInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeInfo;
    static deserializeBinaryFromReader(message: NodeInfo, reader: jspb.BinaryReader): NodeInfo;
}

export namespace NodeInfo {
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

export class NotFoundResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotFoundResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NotFoundResponse): NotFoundResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotFoundResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotFoundResponse;
    static deserializeBinaryFromReader(message: NotFoundResponse, reader: jspb.BinaryReader): NotFoundResponse;
}

export namespace NotFoundResponse {
    export type AsObject = {
    }
}

export class TransferData extends jspb.Message { 
    getKey(): string;
    setKey(value: string): TransferData;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): TransferData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferData.AsObject;
    static toObject(includeInstance: boolean, msg: TransferData): TransferData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferData;
    static deserializeBinaryFromReader(message: TransferData, reader: jspb.BinaryReader): TransferData;
}

export namespace TransferData {
    export type AsObject = {
        key: string,
        value: Uint8Array | string,
    }
}
