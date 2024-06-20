export const SpokeCommonAbi = [
  {
    inputs: [
      { internalType: "address", name: "admin", type: "address" },
      {
        internalType: "contract IBridgeRouter",
        name: "bridgeRouter",
        type: "address",
      },
      { internalType: "uint16", name: "hubChainId", type: "uint16" },
      { internalType: "bytes32", name: "hubContractAddress", type: "bytes32" },
      {
        internalType: "contract IAddressOracle",
        name: "addressOracle",
        type: "address",
      },
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
    inputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "uint16", name: "action", type: "uint16" },
    ],
    name: "AddressIneligible",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "messageId", type: "bytes32" }],
    name: "CannotReceiveMessage",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "messageId", type: "bytes32" }],
    name: "CannotReverseMessage",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "router", type: "address" }],
    name: "InvalidBridgeRouter",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
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
    inputs: [],
    name: "CONFIG_CONTRACTS_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
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
    name: "acceptDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
    ],
    name: "acceptInviteAddress",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "addDelegate",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
      { internalType: "uint8", name: "poolId", type: "uint8" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "maxStableRate", type: "uint256" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "refAccountId", type: "bytes32" },
    ],
    name: "createAccount",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
      { internalType: "uint16", name: "loanTypeId", type: "uint16" },
      { internalType: "bytes32", name: "loanName", type: "bytes32" },
    ],
    name: "createLoan",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
    ],
    name: "deleteLoan",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddressOracle",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBridgeRouter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubChainId",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubContractAddress",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
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
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
      { internalType: "bytes32", name: "refAccountId", type: "bytes32" },
    ],
    name: "inviteAddress",
    outputs: [],
    stateMutability: "payable",
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
      {
        components: [
          { internalType: "bytes32", name: "messageId", type: "bytes32" },
          { internalType: "uint16", name: "sourceChainId", type: "uint16" },
          { internalType: "bytes32", name: "sourceAddress", type: "bytes32" },
          { internalType: "bytes32", name: "handler", type: "bytes32" },
          { internalType: "bytes", name: "payload", type: "bytes" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageReceived",
        name: "message",
        type: "tuple",
      },
    ],
    name: "receiveMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "removeDelegate",
    outputs: [],
    stateMutability: "payable",
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
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
      { internalType: "uint8", name: "poolId", type: "uint8" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "repayWithCollateral",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "messageId", type: "bytes32" },
          { internalType: "uint16", name: "sourceChainId", type: "uint16" },
          { internalType: "bytes32", name: "sourceAddress", type: "bytes32" },
          { internalType: "bytes32", name: "handler", type: "bytes32" },
          { internalType: "bytes", name: "payload", type: "bytes" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageReceived",
        name: "message",
        type: "tuple",
      },
      { internalType: "bytes", name: "extraArgs", type: "bytes" },
    ],
    name: "reverseMessage",
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
        internalType: "contract IAddressOracle",
        name: "newAddressOracle",
        type: "address",
      },
    ],
    name: "setAddressOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "contractAddress", type: "bytes32" },
    ],
    name: "setHub",
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
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
      { internalType: "uint8", name: "poolId", type: "uint8" },
      { internalType: "uint256", name: "maxStableRate", type: "uint256" },
    ],
    name: "switchBorrowType",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "unregisterAddress",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "adapterId", type: "uint16" },
          { internalType: "uint16", name: "returnAdapterId", type: "uint16" },
          { internalType: "uint256", name: "receiverValue", type: "uint256" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "uint256", name: "returnGasLimit", type: "uint256" },
        ],
        internalType: "struct Messages.MessageParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "bytes32", name: "loanId", type: "bytes32" },
      { internalType: "uint8", name: "poolId", type: "uint8" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "isFAmount", type: "bool" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
