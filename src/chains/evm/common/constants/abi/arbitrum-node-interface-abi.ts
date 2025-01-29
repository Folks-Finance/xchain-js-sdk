export const ArbitrumNodeInterfaceAbi = [
  {
    name: "gasEstimateL1Component",
    type: "function",
    inputs: [
      { name: "to", type: "address" },
      { name: "contractCreation", type: "bool" },
      { name: "data", type: "bytes" },
    ],
    outputs: [
      { name: "gasEstimateForL1", type: "uint64" },
      { name: "baseFee", type: "uint256" },
      { name: "l1BaseFeeEstimate", type: "uint256" },
    ],
    stateMutability: "payable",
  },
] as const;
