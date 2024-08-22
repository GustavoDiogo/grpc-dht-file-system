#!/bin/bash

NODE_PROTO_DIR=./client-node/src/proto

if [ ! -d "$NODE_PROTO_DIR" ]; then
  mkdir "$NODE_PROTO_DIR"
fi

# Generate JavaScript code
npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${NODE_PROTO_DIR} \
    --grpc_out=grpc_js:${NODE_PROTO_DIR} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ./proto \
    proto/*.proto

# Generate TypeScript code (d.ts)
npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${NODE_PROTO_DIR} \
    -I ./proto \
    proto/*.proto