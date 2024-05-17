import type { Hex, PublicClient } from "viem";
import { FINALITY, UINT256_LENGTH } from "../../common/constants/index.js";
import { Action } from "../../common/type/index.js";
import type {
  FolksChainId,
  MessageAdapters,
  MessageToSend,
  FolksTokenId,
  NetworkType,
} from "../../common/type/index.js";
import {
  DEFAULT_MESSAGE_PARAMS,
  buildMessagePayload,
  convertNumberToBytes,
  getRandomGenericAddress,
  getSendTokenExtraArgsWhenRemoving,
  getSpokeChain,
  getSpokeTokenData,
} from "../../common/util/index.js";

import { getHubChain, getHubTokenData } from "../util/chain.js";
import { getBridgeRouterHubContract } from "../util/contract.js";

export function getSendTokenAdapterFees(
  provider: PublicClient,
  network: NetworkType,
  accountId: Hex,
  folksTokenId: FolksTokenId,
  amount: bigint,
  receiverFolksChainId: FolksChainId,
  adapters: MessageAdapters,
): () => Promise<bigint> {
  return async (): Promise<bigint> => {
    const hubChain = getHubChain(network);
    const hubTokenData = getHubTokenData(folksTokenId, network);
    const hubBridgeRouter = getBridgeRouterHubContract(
      provider,
      hubChain.bridgeRouterAddress,
    );

    const spokeChain = getSpokeChain(receiverFolksChainId, network);
    const spokeTokenData = getSpokeTokenData(spokeChain, folksTokenId);

    // construct return message
    const { returnAdapterId } = adapters;
    const returnParams = DEFAULT_MESSAGE_PARAMS({
      adapterId: returnAdapterId,
      returnAdapterId,
    });
    const returnMessage: MessageToSend = {
      params: returnParams,
      sender: hubChain.hubAddress,
      destinationChainId: receiverFolksChainId,
      handler: getRandomGenericAddress(),
      payload: buildMessagePayload(
        Action.SendToken,
        accountId,
        getRandomGenericAddress(),
        convertNumberToBytes(amount, UINT256_LENGTH),
      ),
      finalityLevel: FINALITY.FINALISED,
      extraArgs: getSendTokenExtraArgsWhenRemoving(
        spokeTokenData,
        hubTokenData,
        amount,
      ),
    };

    // get return adapter fee
    return await hubBridgeRouter.read.getSendFee([returnMessage]);
  };
}
