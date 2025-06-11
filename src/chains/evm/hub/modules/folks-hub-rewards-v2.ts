// New implementation for V2
import { multicall } from "viem/actions";

import { UINT256_LENGTH } from "../../../../common/constants/bytes.js";
import { FINALITY } from "../../../../common/constants/message.js";
import { REWARDS_TYPE } from "../../../../common/constants/reward.js";
import { Action } from "../../../../common/types/message.js";
import { getRandomGenericAddress } from "../../../../common/utils/address.js";
import { convertNumberToBytes } from "../../../../common/utils/bytes.js";
import { getSpokeChain, getSpokeRewardsCommonAddress } from "../../../../common/utils/chain.js";
import { increaseByPercent, unixTime } from "../../../../common/utils/math-lib.js";
import {
  RECEIVER_VALUE_SLIPPAGE,
  UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE,
} from "../../common/constants/contract.js";
import { getEvmSignerAccount } from "../../common/utils/chain.js";
import {
  buildMessageParams,
  buildMessagePayload,
  buildSendTokenExtraArgsWhenRemoving,
} from "../../common/utils/message.js";
import {
  getHubChain,
  getHubRewardAddress,
  getHubRewardsV2TokenData,
  getHubRewardsV2TokensData,
} from "../utils/chain.js";
import { getBridgeRouterHubContract, getHubRewardsV2Contract } from "../utils/contract.js";

import type { EvmAddress } from "../../../../common/types/address.js";
import type { FolksChainId, NetworkType } from "../../../../common/types/chain.js";
import type { AccountId } from "../../../../common/types/lending.js";
import type {
  AdapterType,
  MessageAdapters,
  MessageToSend,
  OptionalFeeParams,
} from "../../../../common/types/message.js";
import type { RewardsTokenId } from "../../../../common/types/rewards.js";
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
    const rewardsV2Address = hubChain.rewards[REWARDS_TYPE.V2].hubAddress;
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
    const { gasLimit, maxFeePerGas, maxPriorityFeePerGas, poolEpochs, rewardsV2Address } = prepareCall;

    const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address, signer);

    return await rewardsV2.write.updateAccountPoints([accountIds, poolEpochs], {
      account: getEvmSignerAccount(signer),
      chain: signer.chain,
      gas: gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
  },
};

export async function getHistoricalEpochs(
  provider: Client,
  network: NetworkType,
  tokens: Array<HubTokenData>,
): Promise<Epochs> {
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
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
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
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

export async function filterHistoricalEpochsForUnclaimed(
  provider: Client,
  network: NetworkType,
  historicalEpochs: Epochs,
  accountId: AccountId,
): Promise<Epochs> {
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
  const rewardsV2 = getHubRewardsV2Contract(provider, rewardsV2Address);

  // get account epoch points
  const getAccountEpochPoints: Array<ContractFunctionParameters> = [];
  for (const epochs of Object.values(historicalEpochs)) {
    for (const { poolId, epochIndex } of epochs) {
      getAccountEpochPoints.push({
        address: rewardsV2.address,
        abi: rewardsV2.abi,
        functionName: "accountEpochPoints",
        args: [accountId, poolId, epochIndex],
      });
    }
  }
  const accountEpochPoints = (await multicall(provider, {
    contracts: getAccountEpochPoints,
    allowFailure: false,
  })) as Array<ReadContractReturnType<typeof HubRewardsV2Abi, "accountEpochPoints">>;

  // build filtered epochs
  const filteredEpochs: Epochs = {};
  let i = 0;
  for (const [folksTokenId, unfiltered] of Object.entries(historicalEpochs)) {
    const filtered: Array<Epoch> = [];
    for (const epoch of unfiltered) {
      if (accountEpochPoints[i] > 0) filtered.push(epoch);
      i++;
    }
    filteredEpochs[folksTokenId as FolksTokenId] = filtered;
  }

  return filteredEpochs;
}

export async function getUnclaimedRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  historicalEpochs: Epochs,
): Promise<UnclaimedRewards> {
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
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
    if (unclaimedRewards[i] > 0) rewards[rewardTokenId] = unclaimedRewards[i];
  }
  return rewards;
}

export async function lastUpdatedPointsForRewards(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  activeEpochs: ActiveEpochs,
): Promise<LastUpdatedPointsForRewards> {
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
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

export async function getSendTokenAdapterFees(
  provider: Client,
  network: NetworkType,
  accountId: AccountId,
  rewardTokenId: RewardsTokenId,
  amount: bigint,
  receiverFolksChainId: FolksChainId,
  adapters: MessageAdapters,
  feeParams: OptionalFeeParams = {},
): Promise<bigint> {
  const hubChain = getHubChain(network);
  const hubTokenData = getHubRewardsV2TokenData(rewardTokenId, network);
  const rewardsV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);
  const hubBridgeRouter = getBridgeRouterHubContract(provider, hubChain.bridgeRouterAddress);

  const spokeChain = getSpokeChain(receiverFolksChainId, network);
  const spokeRewardsCommonAddress = getSpokeRewardsCommonAddress(spokeChain, REWARDS_TYPE.V2);

  // construct return message
  const returnParams = buildMessageParams({
    adapters: {
      adapterId: adapters.returnAdapterId,
      returnAdapterId: 0 as AdapterType,
    },
    gasLimit: feeParams.returnGasLimit,
  });
  const returnMessage: MessageToSend = {
    params: returnParams,
    sender: rewardsV2Address,
    destinationChainId: receiverFolksChainId,
    handler: getRandomGenericAddress(),
    payload: buildMessagePayload(
      Action.SendToken,
      accountId,
      getRandomGenericAddress(),
      convertNumberToBytes(amount, UINT256_LENGTH),
    ),
    finalityLevel: FINALITY.FINALISED,
    extraArgs: buildSendTokenExtraArgsWhenRemoving(spokeRewardsCommonAddress, hubTokenData.token, amount),
  };

  // get return adapter fee increased by 1%
  return increaseByPercent(await hubBridgeRouter.read.getSendFee([returnMessage]), RECEIVER_VALUE_SLIPPAGE);
}
