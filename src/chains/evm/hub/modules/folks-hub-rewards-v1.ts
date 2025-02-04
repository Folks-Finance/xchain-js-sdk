import { multicall } from "viem/actions";

import { REWARDS_TYPE } from "../../../../common/constants/reward.js";
import { increaseByPercent, unixTime } from "../../../../common/utils/math-lib.js";
import {
  CLAIM_REWARDS_GAS_LIMIT_SLIPPAGE,
  UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE,
} from "../../common/constants/contract.js";
import { getEvmSignerAccount } from "../../common/utils/chain.js";
import { getHubRewardAddress } from "../utils/chain.js";
import { getHubRewardsV1Contract } from "../utils/contract.js";

import type { EvmAddress } from "../../../../common/types/address.js";
import type { NetworkType } from "../../../../common/types/chain.js";
import type { AccountId } from "../../../../common/types/lending.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type {
  PrepareClaimRewardsV1Call,
  PrepareUpdateAccountsPointsForRewardsV1Call,
} from "../../common/types/module.js";
import type { HubRewardsV1Abi } from "../constants/abi/hub-rewards-v1-abi.js";
import type { HubChain } from "../types/chain.js";
import type { ActiveEpochs, Epochs, Epoch, LastUpdatedPointsForRewards, PoolEpoch } from "../types/rewards-v1.js";
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

function getHistoricalPoolEpochs(historicalEpochs: Epochs, ignoreZeroTotalRewards = true): Array<PoolEpoch> {
  const poolEpochs: Array<PoolEpoch> = [];
  for (const historicalPoolEpochs of Object.values(historicalEpochs)) {
    for (const { poolId, epochIndex, totalRewards } of historicalPoolEpochs) {
      if (!ignoreZeroTotalRewards || totalRewards > 0n) poolEpochs.push({ poolId, epochIndex });
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
  ): Promise<PrepareUpdateAccountsPointsForRewardsV1Call> {
    const rewardsV1Address = hubChain.rewards[REWARDS_TYPE.V1].hubAddress;
    const poolEpochs = getActivePoolEpochs(activeEpochs);
    const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

    const gasLimit = await rewardsV1.estimateGas.updateAccountPoints([accountIds, poolEpochs], {
      ...transactionOptions,
      value: undefined,
    });

    return {
      gasLimit: increaseByPercent(gasLimit, UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE),
      poolEpochs,
      rewardsV1Address,
    };
  },

  async claimRewards(
    provider: Client,
    sender: EvmAddress,
    hubChain: HubChain,
    accountId: AccountId,
    historicalEpochs: Epochs,
    transactionOptions: EstimateGasParameters = {
      account: sender,
    },
  ): Promise<PrepareClaimRewardsV1Call> {
    const rewardsV1Address = hubChain.rewards[REWARDS_TYPE.V1].hubAddress;
    const poolEpochs = getHistoricalPoolEpochs(historicalEpochs);
    const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

    const gasLimit = await rewardsV1.estimateGas.claimRewards([accountId, poolEpochs, sender], {
      ...transactionOptions,
      value: undefined,
    });

    return {
      gasLimit: increaseByPercent(gasLimit, CLAIM_REWARDS_GAS_LIMIT_SLIPPAGE),
      poolEpochs,
      receiver: sender,
      rewardsV1Address,
    };
  },
};

export const write = {
  async updateAccountsPointsForRewards(
    provider: Client,
    signer: WalletClient,
    accountIds: Array<AccountId>,
    prepareCall: PrepareUpdateAccountsPointsForRewardsV1Call,
  ) {
    const { gasLimit, poolEpochs, rewardsV1Address } = prepareCall;

    const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address, signer);

    return await rewardsV1.write.updateAccountPoints([accountIds, poolEpochs], {
      account: getEvmSignerAccount(signer),
      chain: signer.chain,
      gas: gasLimit,
    });
  },

  async claimRewards(
    provider: Client,
    signer: WalletClient,
    accountId: AccountId,
    prepareCall: PrepareClaimRewardsV1Call,
  ) {
    const { gasLimit, poolEpochs, receiver, rewardsV1Address } = prepareCall;

    const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address, signer);

    return await rewardsV1.write.claimRewards([accountId, poolEpochs, receiver], {
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
  const rewardsV1Address = getHubRewardAddress(network, REWARDS_TYPE.V1);
  const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

  // get latest pool epoch indexes
  const poolEpochIndexes = (await multicall(provider, {
    contracts: tokens.map(({ poolId }) => ({
      address: rewardsV1.address,
      abi: rewardsV1.abi,
      functionName: "poolEpochIndex",
      args: [poolId],
    })),
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV1Abi, "poolEpochIndex">>;

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
        address: rewardsV1.address,
        abi: rewardsV1.abi,
        functionName: "poolEpochs",
        args: [poolId, epochIndex],
      });
    }
  }

  const poolEpochs = (await multicall(provider, {
    contracts: getPoolEpochs,
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV1Abi, "poolEpochs">>;

  // create historical epochs
  const currTimestamp = BigInt(unixTime());
  let indexIntoPoolEpoch = 0;
  const historicalEpochs: Epochs = {};
  for (const { folksTokenId, poolId } of tokens) {
    const historicalPoolEpochs: Array<Epoch> = [];
    const latestPoolEpochIndex = latestPoolEpochIndexes[folksTokenId] ?? 0;
    for (let epochIndex = 1; epochIndex <= latestPoolEpochIndex; epochIndex++) {
      const [startTimestamp, endTimestamp, totalRewards] = poolEpochs[indexIntoPoolEpoch];
      indexIntoPoolEpoch++;
      if (endTimestamp < currTimestamp)
        historicalPoolEpochs.push({ poolId, epochIndex, startTimestamp, endTimestamp, totalRewards });
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
  const rewardsV1Address = getHubRewardAddress(network, REWARDS_TYPE.V1);
  const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

  const getActiveEpochs: Array<ContractFunctionParameters> = tokens.map(({ poolId }) => ({
    address: rewardsV1.address,
    abi: rewardsV1.abi,
    functionName: "getActiveEpoch",
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
      const [epochIndex, { start: startTimestamp, end: endTimestamp, totalRewards }] =
        result.result as ReadContractReturnType<typeof HubRewardsV1Abi, "getActiveEpoch">;
      activeEpochs[folksTokenId] = { poolId, epochIndex, startTimestamp, endTimestamp, totalRewards };
    }
  }
  return activeEpochs;
}

export async function getUnclaimedRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  historicalEpochs: Epochs,
): Promise<bigint> {
  const rewardsV1Address = getHubRewardAddress(network, REWARDS_TYPE.V1);
  const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

  const poolEpochs = getHistoricalPoolEpochs(historicalEpochs);
  return await rewardsV1.read.getUnclaimedRewards([accountId, poolEpochs]);
}

export async function lastUpdatedPointsForRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  activeEpochs: ActiveEpochs,
): Promise<LastUpdatedPointsForRewards> {
  const rewardsV1Address = getHubRewardAddress(network, REWARDS_TYPE.V1);
  const rewardsV1 = getHubRewardsV1Contract(provider, rewardsV1Address);

  const entries = await Promise.all(
    Object.entries(activeEpochs).map(async ([folksTokenId, { poolId, epochIndex }]) => {
      const [lastWrittenPoints, writtenEpochPoints] = await Promise.all([
        rewardsV1.read.accountLastUpdatedPoints([accountId, poolId]),
        rewardsV1.read.accountEpochPoints([accountId, poolId, epochIndex]),
      ]);

      return [folksTokenId as FolksTokenId, { lastWrittenPoints, writtenEpochPoints }] as const;
    }),
  );

  return Object.fromEntries(entries);
}
