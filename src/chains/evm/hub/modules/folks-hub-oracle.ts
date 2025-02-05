import { multicall } from "viem/actions";

import { getHubChain } from "../utils/chain.js";
import { getOracleManagerContract } from "../utils/contract.js";

import type { NetworkType } from "../../../../common/types/chain.js";
import type { OracleManagerAbi } from "../constants/abi/oracle-manager-abi.js";
import type { OraclePrice, OraclePrices } from "../types/oracle.js";
import type { HubTokenData } from "../types/token.js";
import type { Client, ContractFunctionParameters, ReadContractReturnType } from "viem";

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
    const token = tokens[i];
    oraclePrices[token.folksTokenId] = { price: [price, 18], decimals };
  }
  return oraclePrices;
}
