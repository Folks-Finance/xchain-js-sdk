export const NodeManagerAbi = [
  {
    inputs: [{ internalType: "uint256", name: "deviation", type: "uint256" }],
    name: "DeviationToleranceExceeded",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "deviation", type: "uint256" }],
    name: "DeviationToleranceExceeded",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum NodeDefinition.NodeType",
            name: "nodeType",
            type: "uint8",
          },
          { internalType: "bytes", name: "parameters", type: "bytes" },
          { internalType: "bytes32[]", name: "parents", type: "bytes32[]" },
        ],
        internalType: "struct NodeDefinition.Data",
        name: "nodeDefinition",
        type: "tuple",
      },
    ],
    name: "InvalidNodeDefinition",
    type: "error",
  },
  { inputs: [], name: "MathOverflowedMulDiv", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "NodeAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "NodeNotRegistered",
    type: "error",
  },
  {
    inputs: [{ internalType: "int256", name: "value", type: "int256" }],
    name: "SafeCastOverflowedIntToUint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
    ],
    name: "SameOracle",
    type: "error",
  },
  { inputs: [], name: "StalenessToleranceExceeded", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "UnprocessableNode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum ReducerNode.Operation",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "UnsupportedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
    ],
    name: "ZeroPrice",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
    ],
    name: "ZeroPrice",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "nodeId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "parents",
        type: "bytes32[]",
      },
    ],
    name: "NodeRegistered",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "getNode",
    outputs: [
      {
        components: [
          {
            internalType: "enum NodeDefinition.NodeType",
            name: "nodeType",
            type: "uint8",
          },
          { internalType: "bytes", name: "parameters", type: "bytes" },
          { internalType: "bytes32[]", name: "parents", type: "bytes32[]" },
        ],
        internalType: "struct NodeDefinition.Data",
        name: "node",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
      { internalType: "bytes", name: "parameters", type: "bytes" },
      { internalType: "bytes32[]", name: "parents", type: "bytes32[]" },
    ],
    name: "getNodeId",
    outputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "isNodeRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    name: "process",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          {
            internalType: "enum NodeDefinition.NodeType",
            name: "nodeType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "additionalParam1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "additionalParam2",
            type: "uint256",
          },
        ],
        internalType: "struct NodeOutput.Data",
        name: "node",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum NodeDefinition.NodeType",
        name: "nodeType",
        type: "uint8",
      },
      { internalType: "bytes", name: "parameters", type: "bytes" },
      { internalType: "bytes32[]", name: "parents", type: "bytes32[]" },
    ],
    name: "registerNode",
    outputs: [{ internalType: "bytes32", name: "nodeId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
] as const;
