import { REWARDS_TYPE } from "../../../../common/constants/reward.js";
import { getSpokeRewardsCommonAddress } from "../../../../common/utils/chain.js";
import { getGasLimitAfterIncrease } from "../../../../common/utils/messages.js";
import { getEvmSignerAccount } from "../../common/utils/chain.js";
import { getBridgeRouterSpokeContract, getSpokeRewardsV2CommonContract } from "../utils/contract.js";

import type { EvmAddress } from "../../../../common/types/address.js";
import type { SpokeChain } from "../../../../common/types/chain.js";
import type { AccountId } from "../../../../common/types/lending.js";
import type { MessageToSend } from "../../../../common/types/message.js";
import type { PrepareClaimRewardsV2Call } from "../../../../common/types/module.js";
import type { PoolEpoch, ReceiveRewardToken } from "../../hub/types/rewards-v2.js";
import type { Client, EstimateGasParameters, WalletClient } from "viem";

export const prepare = {
  async claimRewards(
    provider: Client,
    sender: EvmAddress,
    messageToSend: MessageToSend,
    accountId: AccountId,
    poolEpochsToClaim: Array<PoolEpoch>,
    rewardTokensToReceive: Array<ReceiveRewardToken>,
    spokeChain: SpokeChain,
    transactionOptions: EstimateGasParameters = { account: sender },
  ): Promise<PrepareClaimRewardsV2Call> {
    const spokeRewardsV2CommonAddress = getSpokeRewardsCommonAddress(spokeChain, REWARDS_TYPE.V2);
    const spokeRewardsCommon = getSpokeRewardsV2CommonContract(provider, spokeRewardsV2CommonAddress);
    const bridgeRouter = getBridgeRouterSpokeContract(provider, spokeChain.bridgeRouterAddress);

    // get adapter fees
    const msgValue = await bridgeRouter.read.getSendFee([messageToSend]);

    // get gas limits
    const gasLimit = await spokeRewardsCommon.estimateGas.claimRewards(
      [messageToSend.params, accountId, poolEpochsToClaim, rewardTokensToReceive],
      {
        value: msgValue,
        ...transactionOptions,
      },
    );

    return {
      msgValue,
      gasLimit: getGasLimitAfterIncrease(spokeChain.folksChainId, gasLimit),
      messageParams: messageToSend.params,
      poolEpochs: poolEpochsToClaim,
      rewardTokens: rewardTokensToReceive,
      spokeRewardsV2CommonAddress,
    };
  },
};

export const write = {
  async claimRewards(
    provider: Client,
    signer: WalletClient,
    accountId: AccountId,
    prepareCall: PrepareClaimRewardsV2Call,
  ) {
    const {
      msgValue,
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      messageParams,
      poolEpochs,
      rewardTokens,
      spokeRewardsV2CommonAddress,
    } = prepareCall;

    const spokeRewardsCommon = getSpokeRewardsV2CommonContract(provider, spokeRewardsV2CommonAddress, signer);

    return await spokeRewardsCommon.write.claimRewards([messageParams, accountId, poolEpochs, rewardTokens], {
      account: getEvmSignerAccount(signer),
      chain: signer.chain,
      gas: gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      value: msgValue,
    });
  },
};
