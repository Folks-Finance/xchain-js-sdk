import * as dn from "dnum";

import {
  getActiveEpochs,
  getHistoricalEpochs,
  getUnclaimedRewards,
} from "../../chains/evm/hub/modules/folks-hub-rewards-v1.js";
import { FolksHubRewardsV1 } from "../../chains/evm/hub/modules/index.js";
import { getHubChain, getHubTokensData } from "../../chains/evm/hub/utils/chain.js";
import { convertFromGenericAddress } from "../../common/utils/address.js";
import { assertHubChainSelected, getSignerGenericAddress } from "../../common/utils/chain.js";
import { calcAssetDollarValue } from "../../common/utils/formulae.js";
import { SECONDS_IN_YEAR, unixTime } from "../../common/utils/math-lib.js";
import { FolksCore } from "../core/folks-core.js";

import type { LoanTypeInfo, UserPoints } from "../../chains/evm/hub/types/loan.js";
import type { OraclePrices } from "../../chains/evm/hub/types/oracle.js";
import type { PoolInfo } from "../../chains/evm/hub/types/pool.js";
import type {
  ActiveEpochs,
  ActiveEpochsInfo,
  Epochs,
  LastUpdatedPointsForRewards,
  PendingRewards,
} from "../../chains/evm/hub/types/rewards-v1.js";
import type { ChainType } from "../../common/types/chain.js";
import type { AccountId, LoanTypeId } from "../../common/types/lending.js";
import type {
  PrepareClaimRewardsV1Call,
  PrepareUpdateAccountsPointsForRewardsV1Call,
} from "../../common/types/module.js";
import type { FolksTokenId } from "../../common/types/token.js";

export const prepare = {
  async updateAccountsPointsForRewards(
    accountIds: Array<AccountId>,
    activeEpochs: ActiveEpochs,
  ): Promise<PrepareUpdateAccountsPointsForRewardsV1Call> {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);
    const hubChain = getHubChain(folksChain.network);

    const userAddress = getSignerGenericAddress({
      signer: FolksCore.getFolksSigner().signer,
      chainType: folksChain.chainType,
    });

    return await FolksHubRewardsV1.prepare.updateAccountsPointsForRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      convertFromGenericAddress(userAddress, folksChain.chainType),
      hubChain,
      accountIds,
      activeEpochs,
    );
  },

  async claimRewards(accountId: AccountId, historicalEpochs: Epochs): Promise<PrepareClaimRewardsV1Call> {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);
    const hubChain = getHubChain(folksChain.network);

    const userAddress = getSignerGenericAddress({
      signer: FolksCore.getFolksSigner().signer,
      chainType: folksChain.chainType,
    });

    return await FolksHubRewardsV1.prepare.claimRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      convertFromGenericAddress(userAddress, folksChain.chainType),
      hubChain,
      accountId,
      historicalEpochs,
    );
  },
};

export const write = {
  async updateAccountsPointsForRewards(
    accountIds: Array<AccountId>,
    prepareCall: PrepareUpdateAccountsPointsForRewardsV1Call,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);

    return await FolksHubRewardsV1.write.updateAccountsPointsForRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      FolksCore.getSigner<ChainType.EVM>(),
      accountIds,
      prepareCall,
    );
  },

  async claimRewards(accountId: AccountId, prepareCall: PrepareClaimRewardsV1Call) {
    const folksChain = FolksCore.getSelectedFolksChain();
    assertHubChainSelected(folksChain.folksChainId, folksChain.network);

    return await FolksHubRewardsV1.write.claimRewards(
      FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
      FolksCore.getSigner<ChainType.EVM>(),
      accountId,
      prepareCall,
    );
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

  unclaimedRewards(accountId: AccountId, historicalEpochs: Epochs): Promise<bigint> {
    return getUnclaimedRewards(FolksCore.getHubProvider(), FolksCore.getSelectedNetwork(), accountId, historicalEpochs);
  },

  async lastUpdatedPointsForRewards(
    accountId: AccountId,
    activeEpochs: ActiveEpochs,
  ): Promise<LastUpdatedPointsForRewards> {
    return FolksHubRewardsV1.lastUpdatedPointsForRewards(
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
  ): ActiveEpochsInfo {
    const activeEpochsInfo: ActiveEpochsInfo = {};
    const currTimestamp = BigInt(unixTime());

    const avaxPrice = oraclePrices.AVAX;
    if (!avaxPrice) throw Error("AVAX price unavailable");

    for (const [folksTokenId, activeEpoch] of Object.entries(activeEpochs)) {
      // calculations assumes reward rate is constant and consistent
      const remainingTime = activeEpoch.endTimestamp - BigInt(currTimestamp);
      const fullEpochTime = activeEpoch.endTimestamp - activeEpoch.startTimestamp;

      // remaining rewards is proportional to remaining time in epoch
      const remainingRewards = (remainingTime * activeEpoch.totalRewards) / fullEpochTime;

      // apr is total rewards over the total deposit, scaling by epoch length
      const poolInfo = poolsInfo[folksTokenId as FolksTokenId];
      if (!poolInfo) throw new Error(`Unknown folks token id ${folksTokenId}`);

      const tokenPrice = oraclePrices[folksTokenId as FolksTokenId];
      if (!tokenPrice) throw Error(`folksTokenId ${folksTokenId} price unavailable`);

      const rewardsValue = calcAssetDollarValue(remainingRewards, avaxPrice.price, avaxPrice.decimals);
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

      activeEpochsInfo[folksTokenId as FolksTokenId] = {
        ...activeEpoch,
        remainingRewards,
        totalRewardsApr: rewardsApr,
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

      // proportional to the percentage of points you already have of the total points (incl for rest of epoch)
      pendingRewards[folksTokenId as FolksTokenId] = (userEpochPoints * activeEpoch.totalRewards) / totalPointsInEpoch;
    }

    return pendingRewards;
  },
};
