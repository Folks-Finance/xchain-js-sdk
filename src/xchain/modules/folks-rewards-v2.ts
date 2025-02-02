import * as dn from "dnum";

import {
  getActiveEpochs,
  getHistoricalEpochs,
  getUnclaimedRewards,
} from "../../chains/evm/hub/modules/folks-hub-rewards-v2.js";
import { FolksHubRewardsV2 } from "../../chains/evm/hub/modules/index.js";
import { getHubChain, getHubTokensData, getHubRewardsV2TokensData } from "../../chains/evm/hub/utils/chain.js";
import { FolksEvmRewardsV2 } from "../../chains/evm/spoke/modules/index.js";
import { ChainType } from "../../common/types/chain.js";
import { MessageDirection } from "../../common/types/gmp.js";
import { Action } from "../../common/types/message.js";
import { assertAdapterSupportsDataMessage } from "../../common/utils/adapter.js";
import { convertFromGenericAddress } from "../../common/utils/address.js";
import {
  assertHubChainSelected,
  assertSpokeChainSupported,
  getSignerGenericAddress,
  getSpokeChain,
  getSpokeRewardsV2TokenData,
} from "../../common/utils/chain.js";
import { calcAssetDollarValue } from "../../common/utils/formulae.js";
import { SECONDS_IN_YEAR, unixTime } from "../../common/utils/math-lib.js";
import { buildMessageToSend, estimateAdapterReceiveGasLimit } from "../../common/utils/messages.js";
import { exhaustiveCheck } from "../../utils/exhaustive-check.js";
import { FolksCore } from "../core/folks-core.js";

import type { LoanTypeInfo, UserPoints } from "../../chains/evm/hub/types/loan.js";
import type { NodeId, OracleNodePrices, OraclePrices } from "../../chains/evm/hub/types/oracle.js";
import type { PoolInfo } from "../../chains/evm/hub/types/pool.js";
import type {
  ActiveEpochsInfo,
  ActiveEpochReward,
  ActiveEpochs,
  Epochs,
  LastUpdatedPointsForRewards,
  PendingRewards,
  UnclaimedRewards,
  ReceiveRewardToken,
  PoolEpoch,
} from "../../chains/evm/hub/types/rewards-v2.js";
import type { RewardsTokenId } from "../../common/constants/reward.js";
import type { AccountId } from "../../common/types/lending.js";
import type {
  ClaimRewardsV2MessageData,
  MessageAdapters,
  MessageBuilderParams,
  OptionalFeeParams,
} from "../../common/types/message.js";
import type {
  LoanTypeId,
  PrepareClaimRewardsV2Call,
  PrepareUpdateAccountsPointsForRewardsV2Call,
} from "../../common/types/module.js";
import type { FolksTokenId } from "../../common/types/token.js";

export const prepare = {
  async updateAccountsPointsForRewards(
    accountIds: Array<AccountId>,
    activeEpochs: ActiveEpochs,
  ): Promise<PrepareUpdateAccountsPointsForRewardsV2Call> {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);
    const hubChain = getHubChain(folksChain.network);

    const userAddress = getSignerGenericAddress({
      signer: FolksCore.getFolksSigner().signer,
      chainType: folksChain.chainType,
    });

    return await FolksHubRewardsV2.prepare.updateAccountsPointsForRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      convertFromGenericAddress(userAddress, folksChain.chainType),
      hubChain,
      accountIds,
      activeEpochs,
    );
  },

  async claimRewards(
    accountId: AccountId,
    historicalEpochs: Epochs,
    rewardTokensToClaim: Array<RewardsTokenId>,
    adapters: MessageAdapters,
  ): Promise<PrepareClaimRewardsV2Call> {
    const folksChain = FolksCore.getSelectedFolksChain();
    const network = folksChain.network;

    assertAdapterSupportsDataMessage(folksChain.folksChainId, adapters.adapterId);

    const spokeChain = getSpokeChain(folksChain.folksChainId, folksChain.network);
    const hubChain = getHubChain(folksChain.network);
    const userAddress = getSignerGenericAddress({
      signer: FolksCore.getFolksSigner().signer,
      chainType: folksChain.chainType,
    });

    const poolEpochsToClaim: Array<PoolEpoch> = FolksHubRewardsV2.getHistoricalPoolEpochs(historicalEpochs);
    const rewardTokensToReceive: Array<ReceiveRewardToken> = [];
    for (const rewardTokenId of rewardTokensToClaim) {
      const { folksChainId: receiverFolksChainId } = getSpokeRewardsV2TokenData(rewardTokenId, network);
      assertAdapterSupportsDataMessage(receiverFolksChainId, adapters.returnAdapterId);

      // TODO rewards: estimate instead of hardcoding
      const returnGasLimit = BigInt(150_000);
      rewardTokensToReceive.push({
        rewardTokenId,
        returnAdapterId: adapters.returnAdapterId,
        returnGasLimit,
      });
    }

    const data: ClaimRewardsV2MessageData = {
      poolEpochsToClaim,
      rewardTokensToReceive,
    };
    const messageBuilderParams: MessageBuilderParams = {
      userAddress,
      accountId,
      adapters,
      action: Action.ClaimRewardsV2,
      sender: spokeChain.rewardsV2.spokeRewardsCommonAddress,
      destinationChainId: hubChain.folksChainId,
      handler: hubChain.rewardsV2.hubAddress,
      data,
      extraArgs: "0x",
    };
    const feeParams: OptionalFeeParams = {};
    // TODO rewards: estimate instead of hardcoding
    feeParams.receiverValue = BigInt(0.1e18);
    feeParams.gasLimit = await estimateAdapterReceiveGasLimit(
      folksChain.folksChainId,
      hubChain.folksChainId,
      FolksCore.getHubProvider(),
      folksChain.network,
      MessageDirection.SpokeToHub,
      messageBuilderParams,
      feeParams.receiverValue,
    );
    const messageToSend = buildMessageToSend(folksChain.chainType, messageBuilderParams, feeParams);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmRewardsV2.prepare.claimRewards(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          convertFromGenericAddress(userAddress, folksChain.chainType),
          messageToSend,
          accountId,
          poolEpochsToClaim,
          rewardTokensToReceive,
          spokeChain,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },
};

export const write = {
  async updateAccountsPointsForRewards(
    accountIds: Array<AccountId>,
    prepareCall: PrepareUpdateAccountsPointsForRewardsV2Call,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);

    return await FolksHubRewardsV2.write.updateAccountsPointsForRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      FolksCore.getSigner<ChainType.EVM>(),
      accountIds,
      prepareCall,
    );
  },

  async claimRewards(accountId: AccountId, prepareCall: PrepareClaimRewardsV2Call) {
    const folksChain = FolksCore.getSelectedFolksChain();

    assertSpokeChainSupported(folksChain.folksChainId, folksChain.network);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmRewardsV2.write.claimRewards(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          FolksCore.getSigner<ChainType.EVM>(),
          accountId,
          prepareCall,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },
};

export const read = {
  historicalEpochs(): Promise<Epochs> {
    const network = FolksCore.getSelectedNetwork();
    const tokensData = Object.values(getHubTokensData(network));
    return getHistoricalEpochs(FolksCore.getHubProvider(), FolksCore.getSelectedNetwork(), tokensData);
  },

  activeEpochs(): Promise<ActiveEpochs> {
    const network = FolksCore.getSelectedNetwork();
    const tokensData = Object.values(getHubTokensData(network));
    return getActiveEpochs(FolksCore.getHubProvider(), FolksCore.getSelectedNetwork(), tokensData);
  },

  unclaimedRewards(accountId: AccountId, historicalEpochs: Epochs): Promise<UnclaimedRewards> {
    return getUnclaimedRewards(FolksCore.getHubProvider(), FolksCore.getSelectedNetwork(), accountId, historicalEpochs);
  },

  async lastUpdatedPointsForRewards(
    accountId: AccountId,
    activeEpochs: ActiveEpochs,
  ): Promise<LastUpdatedPointsForRewards> {
    return FolksHubRewardsV2.lastUpdatedPointsForRewards(
      FolksCore.getHubProvider(),
      FolksCore.getSelectedNetwork(),
      accountId,
      activeEpochs,
    );
  },
};

export const util = {
  activeEpochsInfo(
    poolsInfo: Partial<Record<FolksTokenId, PoolInfo>>,
    activeEpochs: ActiveEpochs,
    oraclePrices: OraclePrices,
    oracleNodePrices: OracleNodePrices,
  ): ActiveEpochsInfo {
    const activeEpochsInfo: ActiveEpochsInfo = {};
    const currTimestamp = BigInt(unixTime());

    const network = FolksCore.getSelectedNetwork();
    const rewardTokenToNodeId: Partial<Record<RewardsTokenId, NodeId>> = Object.fromEntries(
      Object.values(getHubRewardsV2TokensData(network)).map(({ rewardTokenId, nodeId }) => [rewardTokenId, nodeId]),
    );

    for (const [folksTokenId, activeEpoch] of Object.entries(activeEpochs)) {
      const rewardsInfo: Partial<Record<RewardsTokenId, ActiveEpochReward>> = {};
      let totalRewardsApr = dn.from(0, 18);

      // calculations assumes reward rate is constant and consistent
      const remainingTime = activeEpoch.endTimestamp - BigInt(currTimestamp);
      const fullEpochTime = activeEpoch.endTimestamp - activeEpoch.startTimestamp;

      // loop through rewards
      for (const { rewardTokenId, totalRewards } of activeEpoch.rewards) {
        // remaining rewards is proportional to remaining time in epoch
        const remainingRewards = (remainingTime * totalRewards) / fullEpochTime;

        // apr is total rewards over the total deposit, scaling by epoch length
        const poolInfo = poolsInfo[folksTokenId as FolksTokenId];
        if (!poolInfo) throw new Error(`Unknown folks token id ${folksTokenId}`);

        // get prices of token and reward
        const tokenPrice = oraclePrices[folksTokenId as FolksTokenId];
        if (!tokenPrice) throw Error(`folksTokenId ${folksTokenId} price unavailable`);
        const nodeId = rewardTokenToNodeId[rewardTokenId];
        if (!nodeId) throw Error(`rewardTokenId ${rewardTokenId} price unavailable`);
        const rewardPrice = oracleNodePrices[nodeId];
        if (!rewardPrice) throw Error(`rewardTokenId ${rewardTokenId} price unavailable`);

        // calculate apr and add to total
        const rewardsApr = dn.mul(
          dn.div(
            calcAssetDollarValue(remainingRewards, rewardPrice.price, rewardPrice.decimals),
            calcAssetDollarValue(poolInfo.depositData.totalAmount, tokenPrice.price, tokenPrice.decimals),
            { decimals: 18 },
          ),
          dn.div(SECONDS_IN_YEAR, remainingTime, { decimals: 18 }),
        );
        totalRewardsApr = dn.add(totalRewardsApr, rewardsApr);

        rewardsInfo[rewardTokenId] = { remainingRewards, rewardsApr };
      }

      activeEpochsInfo[folksTokenId as FolksTokenId] = {
        ...activeEpoch,
        rewardsInfo,
        totalRewardsApr,
      };
    }

    return activeEpochsInfo;
  },

  pendingRewards(
    loanTypesInfo: Partial<Record<LoanTypeId, LoanTypeInfo>>,
    activeEpochs: ActiveEpochs,
    userPoints: UserPoints,
    lastUpdatedPointsForRewards: LastUpdatedPointsForRewards,
  ): PendingRewards {
    const pendingRewards: PendingRewards = {};

    for (const [folksTokenId, activeEpoch] of Object.entries(activeEpochs)) {
      // calculations assumes reward rate is constant and consistent
      const fullEpochTime = activeEpoch.endTimestamp - activeEpoch.startTimestamp;

      // consider all loan types to calculate total points in given out in epoch for token
      let totalRewardSpeed = dn.from(0, 18);
      for (const loanTypeInfo of Object.values(loanTypesInfo)) {
        const loanPool = loanTypeInfo.pools[folksTokenId as FolksTokenId];
        if (!loanPool) continue;
        totalRewardSpeed = dn.add(totalRewardSpeed, loanPool.reward.collateralSpeed);
      }
      const [totalPointsInEpoch] = dn.mul(totalRewardSpeed, fullEpochTime, { decimals: 0 });

      // consider points earned in active epoch
      const userLatestPoints = userPoints.poolsPoints[folksTokenId as FolksTokenId]?.collateral ?? 0n;
      const userLastWrittenPoints = lastUpdatedPointsForRewards[folksTokenId as FolksTokenId]?.lastWrittenPoints ?? 0n;
      const userWrittenEpochPoints =
        lastUpdatedPointsForRewards[folksTokenId as FolksTokenId]?.writtenEpochPoints ?? 0n;
      const userEpochPoints = userLatestPoints - userLastWrittenPoints + userWrittenEpochPoints;

      // consider each reward in epoch
      const folksTokenPendingRewards: Partial<Record<RewardsTokenId, bigint>> = {};
      for (const { rewardTokenId, totalRewards } of activeEpoch.rewards) {
        // proportional to the percentage of points you already have of the total points (incl for rest of epoch)
        folksTokenPendingRewards[rewardTokenId] = (userEpochPoints * totalRewards) / totalPointsInEpoch;
      }
      pendingRewards[folksTokenId as FolksTokenId] = folksTokenPendingRewards;
    }

    return pendingRewards;
  },
};
