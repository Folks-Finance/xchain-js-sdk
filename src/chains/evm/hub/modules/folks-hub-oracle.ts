import {multicall} from "viem/actions";

import {getHubChain} from "../utils/chain.js";
import {getNodeManagerContract, getOracleManagerContract} from "../utils/contract.js";

import type {NetworkType} from "../../../../common/types/chain.js";
import type {NodeManagerAbi} from "../constants/abi/node-manager-abi.js";
import type {OracleManagerAbi} from "../constants/abi/oracle-manager-abi.js";
import type {OracleNode, OracleNodePrice, OracleNodePrices, OraclePrice, OraclePrices} from "../types/oracle.js";
import type {HubTokenData} from "../types/token.js";
import type {Client, ContractFunctionParameters, ReadContractReturnType} from "viem";

export async function getOraclePrice(
  provider: Client,
  network: NetworkType,
  poolId: number,
  blockNumber?: bigint,
): Promise<OraclePrice> {
  const hubChain = getHubChain(network);

  const oracleManager = getOracleManagerContract(provider, hubChain.oracleManagerAddress);

  const { price, decimals } = await oracleManager.read.processPriceFeed([poolId], { blockNumber });
  return { price: [price, 18], decimals };
}

export async function getOraclePrices(
  provider: Client,
  network: NetworkType,
  tokens: Array<HubTokenData>,
  blockNumber?: bigint,
): Promise<OraclePrices> {
  const hubChain = getHubChain(network);
  const oracleManager = getOracleManagerContract(provider, hubChain.oracleManagerAddress);

  const processPriceFeeds: Array<ContractFunctionParameters> = tokens.map(({ poolId }) => ({
    address: oracleManager.address,
    abi: oracleManager.abi,
    functionName: "processPriceFeed",
    args: [poolId],
  }));

  const priceFeeds = (await multicall(provider, {
    contracts: processPriceFeeds,
    allowFailure: false,
    blockNumber,
  })) as Array<ReadContractReturnType<typeof OracleManagerAbi, "processPriceFeed">>;

  const oraclePrices: OraclePrices = {};
  for (const [i, { price, decimals }] of priceFeeds.entries()) {
    const { folksTokenId } = tokens[i];
    oraclePrices[folksTokenId] = { price: [price, 18], decimals };
  }
  return oraclePrices;
}

export async function getNodePrice(
  provider: Client,
  network: NetworkType,
  oracleNode: OracleNode,
): Promise<OracleNodePrice> {
  const hubChain = getHubChain(network);

  const nodeManager = getNodeManagerContract(provider, hubChain.nodeManagerAddress);

  const { nodeId, decimals } = oracleNode;
  const { price, timestamp } = await nodeManager.read.process([nodeId]);
  return { price: [price, 18], decimals, timestamp };
}

export async function getNodePrices(
  provider: Client,
  network: NetworkType,
  oracleNodes: Array<OracleNode>,
): Promise<OracleNodePrices> {
  const hubChain = getHubChain(network);
  const nodeManager = getNodeManagerContract(provider, hubChain.nodeManagerAddress);

  const processPriceFeeds: Array<ContractFunctionParameters> = oracleNodes.map(({ nodeId }) => ({
    address: nodeManager.address,
    abi: nodeManager.abi,
    functionName: "process",
    args: [nodeId],
  }));

  const priceFeeds = (await multicall(provider, {
    contracts: processPriceFeeds,
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof NodeManagerAbi, "process">>;

  const oracleNodePrices: OracleNodePrices = {};
  for (const [i, { price, timestamp }] of priceFeeds.entries()) {
    const { nodeId, decimals } = oracleNodes[i];
    oracleNodePrices[nodeId] = { price: [price, 18], decimals, timestamp };
  }
  return oracleNodePrices;
}
