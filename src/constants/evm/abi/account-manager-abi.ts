export const AccountManagerAbi = [
  {
    inputs: [{ internalType: "address", name: "admin", type: "address" }],
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
    inputs: [{ internalType: "bytes32", name: "accountId", type: "bytes32" }],
    name: "AccountAlreadyCreated",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "AccountHasAddress",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "AddressPreviouslyRegistered",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "DelegateAlreadyAdded",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "NoAddressInvited",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "NoAddressRegisterd",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "NoAddressToUnregister",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "NoDelegateToRemove",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "NoPermissionOnHub",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "NotInvitedToAccount",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "NotRegisteredToAccount",
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
  {
    inputs: [{ internalType: "bytes32", name: "accountId", type: "bytes32" }],
    name: "UnknownAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "addr",
        type: "bytes32",
      },
    ],
    name: "AcceptInviteAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "AddDelegate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "addr",
        type: "bytes32",
      },
    ],
    name: "CreateAccount",
    type: "event",
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
        indexed: false,
        internalType: "bytes32",
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "inviteeChainId",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "inviteeAddr",
        type: "bytes32",
      },
    ],
    name: "InviteAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "RemoveDelegate",
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
        name: "accountId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "unregisterChainId",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "unregisterAddr",
        type: "bytes32",
      },
    ],
    name: "UnregisterAddress",
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
    name: "HUB_ROLE",
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
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "acceptInviteAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "addDelegate",
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
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "createAccount",
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
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "getAddressInvitedToAccountOnChain",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
    ],
    name: "getAddressRegisteredToAccountOnChain",
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
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "inviteeChainId", type: "uint16" },
      { internalType: "bytes32", name: "inviteeAddr", type: "bytes32" },
    ],
    name: "inviteAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "accountId", type: "bytes32" }],
    name: "isAccountCreated",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "isAddressInvitedToAccount",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "isAddressRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "chainId", type: "uint16" },
      { internalType: "bytes32", name: "addr", type: "bytes32" },
    ],
    name: "isAddressRegisteredToAccount",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "isDelegate",
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
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "removeDelegate",
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
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "accountId", type: "bytes32" },
      { internalType: "uint16", name: "unregisterChainId", type: "uint16" },
    ],
    name: "unregisterAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;