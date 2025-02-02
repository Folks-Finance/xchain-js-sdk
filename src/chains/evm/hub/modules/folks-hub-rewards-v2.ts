// New implementation for V2
import { multicall } from "viem/actions";

import { increaseByPercent, unixTime } from "../../../../common/utils/math-lib.js";
import { UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE } from "../../common/constants/contract.js";
import { getEvmSignerAccount } from "../../common/utils/chain.js";
import { getHubChain, getHubRewardsV2TokensData } from "../utils/chain.js";
import { getHubRewardsV2Contract } from "../utils/contract.js";

import type { RewardsTokenId } from "../../../../common/constants/reward.js";
import type { EvmAddress } from "../../../../common/types/address.js";
import type { NetworkType } from "../../../../common/types/chain.js";
import type { AccountId } from "../../../../common/types/lending.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type { PrepareUpdateAccountsPointsForRewardsV2Call } from "../../common/types/module.js";
import type { HubRewardsV2Abi } from "../constants/abi/hub-rewards-v2-abi.js";
import type { HubChain } from "../types/chain.js";
import type {
  ActiveEpochs,
  Epochs,
  Epoch,
  LastUpdatedPointsForRewards,
  PoolEpoch,
  UnclaimedRewards,
} from "../types/rewards-v2.js";
import type { HubTokenData } from "../types/token.js";
import type {
  Client,
  ContractFunctionParameters,
  EstimateGasParameters,
  ReadContractReturnType,
  WalletClient,
} from "viem";

export function getActivePoolEpochs(activeEpochs: ActiveEpochs): Array<PoolEpoch> {
  return Object.values(activeEpochs).map(({ poolId, epochIndex }) => ({ poolId, epochIndex }));
}

export function getHistoricalPoolEpochs(historicalEpochs: Epochs, ignoreZeroTotalRewards = true): Array<PoolEpoch> {
  const poolEpochs: Array<PoolEpoch> = [];
  for (const historicalPoolEpochs of Object.values(historicalEpochs)) {
    for (const { poolId, epochIndex, rewards } of historicalPoolEpochs) {
      if (!ignoreZeroTotalRewards || rewards.some(({ totalRewards }) => totalRewards > 0n))
        poolEpochs.push({ poolId, epochIndex });
    }
  }
  return poolEpochs;
}

export const prepare = {
  async updateAccountsPointsForRewards(
    provider: Client,
    sender: EvmAddress,
    hubChain: HubChain,
    accountIds: Array<AccountId>,
    activeEpochs: ActiveEpochs,
    transactionOptions: EstimateGasParameters = {
      account: sender,
    },
  ): Promise<PrepareUpdateAccountsPointsForRewardsV2Call> {
    const { hubAddress: rewardsV2Address } = hubChain.rewardsV2;
    const poolEpochs = getActivePoolEpochs(activeEpochs);
    const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

    const gasLimit = await rewardsV2.estimateGas.updateAccountPoints([accountIds, poolEpochs], {
      ...transactionOptions,
      value: undefined,
    });

    return {
      gasLimit: increaseByPercent(gasLimit, UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE),
      poolEpochs,
      rewardsV2Address,
    };
  },
};

export const write = {
  async updateAccountsPointsForRewards(
    provider: Client,
    signer: WalletClient,
    accountIds: Array<AccountId>,
    prepareCall: PrepareUpdateAccountsPointsForRewardsV2Call,
  ) {
    const { gasLimit, poolEpochs, rewardsV2Address } = prepareCall;

    const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address, signer);

    return await rewardsV2.write.updateAccountPoints([accountIds, poolEpochs], {
      account: getEvmSignerAccount(signer),
      chain: signer.chain,
      gas: gasLimit,
    });
  },
};

export async function getHistoricalEpochs(
  provider: Client,
  network: NetworkType,
  tokens: Array<HubTokenData>,
): Promise<Epochs> {
  const hubChain = getHubChain(network);
  const { hubAddress: rewardsV2Address } = hubChain.rewardsV2;
  const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

  // get latest pool epoch indexes
  const poolEpochIndexes = (await multicall(provider, {
    contracts: tokens.map(({ poolId }) => ({
      address: rewardsV2.address,
      abi: rewardsV2.abi,
      functionName: "poolEpochIndex",
      args: [poolId],
    })),
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV2Abi, "poolEpochIndex">>;

  const latestPoolEpochIndexes: Partial<Record<FolksTokenId, number>> = {};
  for (const [i, epochIndex] of poolEpochIndexes.entries()) {
    const { folksTokenId } = tokens[i];
    latestPoolEpochIndexes[folksTokenId] = epochIndex;
  }

  // get all pool epochs
  const getPoolEpochs: Array<ContractFunctionParameters> = [];
  for (const { folksTokenId, poolId } of tokens) {
    const latestPoolEpochIndex = latestPoolEpochIndexes[folksTokenId] ?? 0;
    for (let epochIndex = 1; epochIndex <= latestPoolEpochIndex; epochIndex++) {
      getPoolEpochs.push({
        address: rewardsV2.address,
        abi: rewardsV2.abi,
        functionName: "getPoolEpoch",
        args: [poolId, epochIndex],
      });
    }
  }

  const poolEpochs = (await multicall(provider, {
    contracts: getPoolEpochs,
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV2Abi, "getPoolEpoch">>;

  // create historical epochs
  const currTimestamp = BigInt(unixTime());
  let indexIntoPoolEpoch = 0;
  const historicalEpochs: Epochs = {};
  for (const { folksTokenId, poolId } of tokens) {
    const historicalPoolEpochs: Array<Epoch> = [];
    const latestPoolEpochIndex = latestPoolEpochIndexes[folksTokenId] ?? 0;
    for (let epochIndex = 1; epochIndex <= latestPoolEpochIndex; epochIndex++) {
      const { start: startTimestamp, end: endTimestamp, rewards } = poolEpochs[indexIntoPoolEpoch];
      indexIntoPoolEpoch++;
      if (endTimestamp < currTimestamp)
        historicalPoolEpochs.push({
          poolId,
          epochIndex,
          startTimestamp,
          endTimestamp,
          rewards: rewards.map(({ rewardTokenId, totalRewards }) => ({
            rewardTokenId: rewardTokenId as RewardsTokenId,
            totalRewards,
          })),
        });
    }
    historicalEpochs[folksTokenId] = historicalPoolEpochs;
  }

  return historicalEpochs;
}

export async function getActiveEpochs(
  provider: Client,
  network: NetworkType,
  tokens: Array<HubTokenData>,
): Promise<ActiveEpochs> {
  const hubChain = getHubChain(network);
  const { hubAddress: rewardsV2Address } = hubChain.rewardsV2;
  const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

  const getActiveEpochs: Array<ContractFunctionParameters> = tokens.map(({ poolId }) => ({
    address: rewardsV2.address,
    abi: rewardsV2.abi,
    functionName: "getActivePoolEpoch",
    args: [poolId],
  }));

  const maybeActiveEpochs = await multicall(provider, {
    contracts: getActiveEpochs,
    allowFailure: true,
  });

  const activeEpochs: ActiveEpochs = {};
  for (const [i, result] of maybeActiveEpochs.entries()) {
    const { folksTokenId, poolId } = tokens[i];
    if (result.status === "success") {
      const [epochIndex, { start: startTimestamp, end: endTimestamp, rewards }] =
        result.result as ReadContractReturnType<typeof HubRewardsV2Abi, "getActivePoolEpoch">;
      activeEpochs[folksTokenId] = {
        poolId,
        epochIndex,
        startTimestamp,
        endTimestamp,
        rewards: rewards.map(({ rewardTokenId, totalRewards }) => ({
          rewardTokenId: rewardTokenId as RewardsTokenId,
          totalRewards,
        })),
      };
    }
  }
  return activeEpochs;
}

export async function getUnclaimedRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  historicalEpochs: Epochs,
): Promise<UnclaimedRewards> {
  const hubChain = getHubChain(network);
  const { hubAddress: rewardsV2Address } = hubChain.rewardsV2;
  const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

  const rewardsV2TokensData = Object.values(getHubRewardsV2TokensData(network));
  const poolEpochs = getHistoricalPoolEpochs(historicalEpochs);

  // get all unclaimed rewards
  const getUnclaimedRewardsEpochs: Array<ContractFunctionParameters> = rewardsV2TokensData.map(({ rewardTokenId }) => ({
    address: rewardsV2.address,
    abi: rewardsV2.abi,
    functionName: "getUnclaimedRewards",
    args: [accountId, poolEpochs, rewardTokenId],
  }));

  const unclaimedRewards = (await multicall(provider, {
    contracts: getUnclaimedRewardsEpochs,
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV2Abi, "getUnclaimedRewards">>;

  // create rewards
  const rewards: UnclaimedRewards = {};
  for (const [i, { rewardTokenId }] of rewardsV2TokensData.entries()) {
    rewards[rewardTokenId] = unclaimedRewards[i];
  }
  return rewards;
}

export async function lastUpdatedPointsForRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  activeEpochs: ActiveEpochs,
): Promise<LastUpdatedPointsForRewards> {
  const hubChain = getHubChain(network);
  const { hubAddress: rewardsV2Address } = hubChain.rewardsV2;
  const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

  const entries = await Promise.all(
    Object.entries(activeEpochs).map(async ([folksTokenId, { poolId, epochIndex }]) => {
      const [lastWrittenPoints, writtenEpochPoints] = await Promise.all([
        rewardsV2.read.accountLastUpdatedPoints([accountId, poolId]),
        rewardsV2.read.accountEpochPoints([accountId, poolId, epochIndex]),
      ]);

      return [folksTokenId as FolksTokenId, { lastWrittenPoints, writtenEpochPoints }] as const;
    }),
  );

  return Object.fromEntries(entries);
}
