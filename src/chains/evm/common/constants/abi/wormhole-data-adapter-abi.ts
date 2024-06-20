export const WormholeDataAdapterAbi = [
  {
    inputs: [
      { internalType: "address", name: "admin", type: "address" },
      {
        internalType: "contract IWormholeRelayer",
        name: "_wormholeRelayer",
        type: "address",
      },
      {
        internalType: "contract IBridgeRouter",
        name: "_bridgeRouter",
        type: "address",
      },
      { internalType: "address", name: "_refundAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [{ internalType: "uint48", name: "schedule", type: "uint48" }],
    name: "AccessControlEnforcedDefaultAdminDelay",
    type: "error",
  },
  { inputs: [], name: "AccessControlEnforcedDefaultAdminRules", type: "error" },
  {
    inputs: [{ internalType: "address", name: "defaultAdmin", type: "address" }],
    name: "AccessControlInvalidDefaultAdmin",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint16", name: "chainId", type: "uint16" }],
    name: "ChainAlreadyAdded",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint16", name: "chainId", type: "uint16" }],
    name: "ChainUnavailable",
    type: "error",
  },
  { inputs: [], name: "EmptyExtraArgs", type: "error" },
  {
    inputs: [{ internalType: "address", name: "router", type: "address" }],
    name: "InvalidBridgeRouter",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint64", name: "finalityLevel", type: "uint64" }],
    name: "InvalidFinalityLevel",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "sourceAddress", type: "bytes32" }],
    name: "InvalidMessageSender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "expected", type: "uint256" },
      { internalType: "uint256", name: "actual", type: "uint256" },
    ],
    name: "InvalidReceivedAmount",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "token", type: "bytes32" }],
    name: "InvalidTokenAddress",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "InvalidWormholeRelayer",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  { inputs: [], name: "UnsupportedExtraArgs", type: "error" },
  {
    inputs: [{ internalType: "uint64", name: "finalityLevel", type: "uint64" }],
    name: "UnsupportedFinalityLevel",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "DefaultAdminDelayChangeCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint48",
        name: "newDelay",
        type: "uint48",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "effectSchedule",
        type: "uint48",
      },
    ],
    name: "DefaultAdminDelayChangeScheduled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "DefaultAdminTransferCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "acceptSchedule",
        type: "uint48",
      },
    ],
    name: "DefaultAdminTransferScheduled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "adapterAddress",
        type: "bytes32",
      },
    ],
    name: "ReceiveMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "ReceiveMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "operationId",
        type: "bytes32",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint16", name: "adapterId", type: "uint16" },
              {
                internalType: "uint16",
                name: "returnAdapterId",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "receiverValue",
                type: "uint256",
              },
              { internalType: "uint256", name: "gasLimit", type: "uint256" },
              {
                internalType: "uint256",
                name: "returnGasLimit",
                type: "uint256",
              },
            ],
            internalType: "struct Messages.MessageParams",
            name: "params",
            type: "tuple",
          },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          {
            internalType: "uint16",
            name: "destinationChainId",
            type: "uint16",
          },
          { internalType: "bytes32", name: "handler", type: "bytes32" },
          { internalType: "bytes", name: "payload", type: "bytes" },
          { internalType: "uint64", name: "finalityLevel", type: "uint64" },
          { internalType: "bytes", name: "extraArgs", type: "bytes" },
        ],
        indexed: false,
        internalType: "struct Messages.MessageToSend",
        name: "message",
        type: "tuple",
      },
    ],
    name: "SendMessage",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MANAGER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "folksChainId", type: "uint16" },
      { internalType: "uint16", name: "wormholeChainId", type: "uint16" },
      { internalType: "bytes32", name: "adapterAddress", type: "bytes32" },
    ],
    name: "addChain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
    name: "beginDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bridgeRouter",
    outputs: [{ internalType: "contract IBridgeRouter", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint48", name: "newDelay", type: "uint48" }],
    name: "changeDefaultAdminDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdmin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdminDelay",
    outputs: [{ internalType: "uint48", name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdminDelayIncreaseWait",
    outputs: [{ internalType: "uint48", name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "chainId", type: "uint16" }],
    name: "getChainAdapter",
    outputs: [
      { internalType: "uint16", name: "wormholeChainId", type: "uint16" },
      { internalType: "bytes32", name: "adapterAddress", type: "bytes32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint16", name: "adapterId", type: "uint16" },
              {
                internalType: "uint16",
                name: "returnAdapterId",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "receiverValue",
                type: "uint256",
              },
              { internalType: "uint256", name: "gasLimit", type: "uint256" },
              {
                internalType: "uint256",
                name: "returnGasLimit",
                type: "uint256",
              },
            ],
            internalType: "struct Messages.MessageParams",
            name: "params",
            type: "tuple",
          },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          {
            internalType: "uint16",
            name: "destinationChainId",
            type: "uint16",
          },
          { internalType: "bytes32", name: "handler", type: "bytes32" },
          { internalType: "bytes", name: "payload", type: "bytes" },
          { internalType: "uint64", name: "finalityLevel", type: "uint64" },
          { internalType: "bytes", name: "extraArgs", type: "bytes" },
        ],
        internalType: "struct Messages.MessageToSend",
        name: "message",
        type: "tuple",
      },
    ],
    name: "getSendFee",
    outputs: [{ internalType: "uint256", name: "fee", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "chainId", type: "uint16" }],
    name: "isChainAvailable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingDefaultAdmin",
    outputs: [
      { internalType: "address", name: "newAdmin", type: "address" },
      { internalType: "uint48", name: "schedule", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingDefaultAdminDelay",
    outputs: [
      { internalType: "uint48", name: "newDelay", type: "uint48" },
      { internalType: "uint48", name: "schedule", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "payload", type: "bytes" },
      { internalType: "bytes[]", name: "", type: "bytes[]" },
      { internalType: "bytes32", name: "sourceAddress", type: "bytes32" },
      { internalType: "uint16", name: "sourceChain", type: "uint16" },
      { internalType: "bytes32", name: "deliveryHash", type: "bytes32" },
    ],
    name: "receiveWormholeMessages",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "refundAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "folksChainId", type: "uint16" }],
    name: "removeChain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rollbackDefaultAdminDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint16", name: "adapterId", type: "uint16" },
              {
                internalType: "uint16",
                name: "returnAdapterId",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "receiverValue",
                type: "uint256",
              },
              { internalType: "uint256", name: "gasLimit", type: "uint256" },
              {
                internalType: "uint256",
                name: "returnGasLimit",
                type: "uint256",
              },
            ],
            internalType: "struct Messages.MessageParams",
            name: "params",
            type: "tuple",
          },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          {
            internalType: "uint16",
            name: "destinationChainId",
            type: "uint16",
          },
          { internalType: "bytes32", name: "handler", type: "bytes32" },
          { internalType: "bytes", name: "payload", type: "bytes" },
          { internalType: "uint64", name: "finalityLevel", type: "uint64" },
          { internalType: "bytes", name: "extraArgs", type: "bytes" },
        ],
        internalType: "struct Messages.MessageToSend",
        name: "message",
        type: "tuple",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_refundAddress", type: "address" }],
    name: "setRefundAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wormholeRelayer",
    outputs: [{ internalType: "contract IWormholeRelayer", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
