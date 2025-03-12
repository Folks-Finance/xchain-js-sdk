import * as dn from "dnum";

import {
  getActiveEpochs,
  getHistoricalEpochs,
  getUnclaimedRewards,
} from "../../chains/evm/hub/modules/folks-hub-rewards-v2.js";
import { FolksHubRewardsV2 } from "../../chains/evm/hub/modules/index.js";
import {
  getHubChain,
  getHubRewardAddress,
  getHubRewardsV2TokenData,
  getHubRewardsV2TokensData,
  getHubTokenData,
  getHubTokensData,
} from "../../chains/evm/hub/utils/chain.js";
import { FolksEvmRewardsV2 } from "../../chains/evm/spoke/modules/index.js";
import { REWARDS_TYPE } from "../../common/constants/reward.js";
import { ChainType } from "../../common/types/chain.js";
import { MessageDirection } from "../../common/types/gmp.js";
import { Action, AdapterType } from "../../common/types/message.js";
import { assertAdapterSupportsDataMessage } from "../../common/utils/adapter.js";
import { convertFromGenericAddress } from "../../common/utils/address.js";
import {
  assertHubChainSelected,
  assertSpokeChainSupported,
  getRewardTokenSpokeChain,
  getSignerGenericAddress,
  getSpokeChain,
  getSpokeRewardsCommonAddress,
  getSpokeRewardsTokenData,
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
  ActiveEpochReward,
  ActiveEpochs,
  ActiveEpochsInfo,
  Epochs,
  LastUpdatedPointsForRewards,
  PendingRewards,
  PoolEpoch,
  ReceiveRewardToken,
  UnclaimedRewards,
} from "../../chains/evm/hub/types/rewards-v2.js";
import type { AccountId, LoanTypeId } from "../../common/types/lending.js";
import type {
  ClaimRewardsV2MessageData,
  MessageBuilderParams,
  OptionalFeeParams,
  OverrideTokenData,
  SendTokenExtraArgs,
  SendTokenMessageData,
} from "../../common/types/message.js";
import type {
  PrepareClaimRewardsV2Call,
  PrepareUpdateAccountsPointsForRewardsV2Call,
} from "../../common/types/module.js";
import type { RewardsTokenId } from "../../common/types/rewards.js";
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
    unclaimedRewards: UnclaimedRewards,
    rewardTokensToClaim: Array<RewardsTokenId>,
    adapterId: AdapterType,
    returnAdapters: Partial<Record<RewardsTokenId, AdapterType>>,
  ): Promise<PrepareClaimRewardsV2Call> {
    const folksChain = FolksCore.getSelectedFolksChain();
    const network = folksChain.network;

    assertAdapterSupportsDataMessage(folksChain.folksChainId, adapterId);

    const spokeChain = getSpokeChain(folksChain.folksChainId, folksChain.network);
    const rewardSpokeCommonAddress = getSpokeRewardsCommonAddress(spokeChain, REWARDS_TYPE.V2);

    const hubChain = getHubChain(folksChain.network);
    const rewardV2Address = getHubRewardAddress(network, REWARDS_TYPE.V2);

    const userAddress = getSignerGenericAddress({
      signer: FolksCore.getFolksSigner().signer,
      chainType: folksChain.chainType,
    });

    const poolEpochsToClaim: Array<PoolEpoch> = FolksHubRewardsV2.getHistoricalPoolEpochs(historicalEpochs);
    const rewardTokensToReceive: Array<ReceiveRewardToken> = [];
    let receiverValue = 0n;

    for (const rewardTokenId of rewardTokensToClaim) {
      const receiverSpokeChain = getRewardTokenSpokeChain(rewardTokenId, network, REWARDS_TYPE.V2);
      const receiverRewardSpokeTokenData = getSpokeRewardsTokenData(receiverSpokeChain, rewardTokenId, REWARDS_TYPE.V2);

      const receiverFolksChainId = receiverSpokeChain.folksChainId;
      const returnAdapterId = returnAdapters[rewardTokenId];
      if (!returnAdapterId) throw Error(`Unspecified return adapter for rewardTokenId ${rewardTokenId}`);
      assertAdapterSupportsDataMessage(receiverFolksChainId, returnAdapterId);

      const amount = unclaimedRewards[rewardTokenId];
      if (amount === undefined) throw Error(`Unspecified reward amount for rewardTokenId ${rewardTokenId}`);

      const hubRewardTokenData = getHubRewardsV2TokenData(rewardTokenId, network);

      const feeParams: OptionalFeeParams = {};

      const returnData: SendTokenMessageData = {
        amount,
      };
      const returnExtraArgs: SendTokenExtraArgs = {
        folksTokenId: rewardTokenId,
        token: hubRewardTokenData.token,
        recipient: receiverRewardSpokeTokenData.spokeAddress,
        amount,
      };
      const overrideData: OverrideTokenData = {
        folksTokenId: rewardTokenId,
        token: receiverRewardSpokeTokenData.token,
        address: receiverRewardSpokeTokenData.spokeAddress,
        amount,
      };
      const returnMessageBuilderParams: MessageBuilderParams = {
        userAddress,
        accountId,
        adapters: { adapterId, returnAdapterId },
        action: Action.SendToken,
        sender: rewardV2Address,
        destinationChainId: receiverFolksChainId,
        handler: receiverRewardSpokeTokenData.spokeAddress,
        data: returnData,
        extraArgs: returnExtraArgs,
        overrideData,
      };
      const returnGasLimit = await estimateAdapterReceiveGasLimit(
        hubChain.folksChainId,
        receiverFolksChainId,
        FolksCore.getEVMProvider(receiverFolksChainId),
        folksChain.network,
        MessageDirection.HubToSpoke,
        returnMessageBuilderParams,
        0n,
        0n,
        true,
      );
      feeParams.returnGasLimit = returnGasLimit;

      rewardTokensToReceive.push({
        rewardTokenId,
        returnAdapterId,
        returnGasLimit,
      });

      receiverValue += await FolksHubRewardsV2.getSendTokenAdapterFees(
        FolksCore.getHubProvider(),
        network,
        accountId,
        rewardTokenId,
        amount,
        receiverFolksChainId,
        { adapterId, returnAdapterId },
        feeParams,
      );
    }

    const data: ClaimRewardsV2MessageData = {
      poolEpochsToClaim,
      rewardTokensToReceive,
    };
    const messageBuilderParams: MessageBuilderParams = {
      userAddress,
      accountId,
      adapters: { adapterId, returnAdapterId: AdapterType.HUB },
      action: Action.ClaimRewardsV2,
      sender: rewardSpokeCommonAddress,
      destinationChainId: hubChain.folksChainId,
      handler: rewardV2Address,
      data,
      extraArgs: "0x",
    };
    const feeParams: OptionalFeeParams = {};
    feeParams.receiverValue = receiverValue;
    feeParams.gasLimit = await estimateAdapterReceiveGasLimit(
      folksChain.folksChainId,
      hubChain.folksChainId,
      FolksCore.getHubProvider(),
      folksChain.network,
      MessageDirection.SpokeToHub,
      messageBuilderParams,
      feeParams.receiverValue,
      0n,
      true,
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
  historicalEpochs(folksTokenIds?: Array<FolksTokenId>): Promise<Epochs> {
    const network = FolksCore.getSelectedNetwork();
    const tokensData = folksTokenIds
      ? folksTokenIds.map((folksTokenId) => getHubTokenData(folksTokenId, network))
      : Object.values(getHubTokensData(network));
    return getHistoricalEpochs(FolksCore.getHubProvider(), FolksCore.getSelectedNetwork(), tokensData);
  },

  activeEpochs(folksTokenIds?: Array<FolksTokenId>): Promise<ActiveEpochs> {
    const network = FolksCore.getSelectedNetwork();
    const tokensData = folksTokenIds
      ? folksTokenIds.map((folksTokenId) => getHubTokenData(folksTokenId, network))
      : Object.values(getHubTokensData(network));
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
        const rewardsValue = calcAssetDollarValue(remainingRewards, rewardPrice.price, rewardPrice.decimals);
        const totalDepositsValue = calcAssetDollarValue(
          poolInfo.depositData.totalAmount,
          tokenPrice.price,
          tokenPrice.decimals,
        );
        const rewardsApr =
          dn.gt(totalDepositsValue, dn.from(0)) && remainingTime > 0
            ? dn.mul(
                dn.div(rewardsValue, totalDepositsValue, { decimals: 18 }),
                dn.div(SECONDS_IN_YEAR, remainingTime, { decimals: 18 }),
              )
            : dn.from(0, 18);
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
        const pendingRewards = (userEpochPoints * totalRewards) / totalPointsInEpoch;
        if (pendingRewards > 0n) folksTokenPendingRewards[rewardTokenId] = pendingRewards;
      }
      pendingRewards[folksTokenId as FolksTokenId] = folksTokenPendingRewards;
    }

    return pendingRewards;
  },
};
