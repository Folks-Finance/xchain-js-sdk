import { getHubTokenData, isHubChain } from "../../chains/evm/hub/utils/chain.js";
import { intersect } from "../../utils/array.js";
import { exhaustiveCheck } from "../../utils/exhaustive-check.js";
import { FolksCore } from "../../xchain/core/folks-core.js";
import { DATA_ADAPTERS } from "../constants/adapter.js";
import { MessageAdapterParamsType } from "../types/adapter.js";
import { AdapterType } from "../types/message.js";
import { TokenType } from "../types/token.js";

import { getSpokeChain } from "./chain.js";

import type { MessageAdapterParams, ReceiveTokenMessageAdapterParams } from "../types/adapter.js";
import type { FolksChainId, NetworkType } from "../types/chain.js";
import type { CrossChainTokenType, FolksTokenId } from "../types/token.js";

export function getSpokeAdapterIds(folksChainId: FolksChainId, network: NetworkType) {
  const spokeChain = getSpokeChain(folksChainId, network);
  return Object.keys(spokeChain.adapters).map<AdapterType>(parseInt);
}

export function doesAdapterSupportDataMessage(folksChainId: FolksChainId, adapterId: AdapterType): boolean {
  const isHub = isHubChain(folksChainId, FolksCore.getSelectedNetwork());
  return (
    (isHub && adapterId === AdapterType.HUB) ||
    (!isHub && (adapterId === AdapterType.WORMHOLE_DATA || adapterId === AdapterType.CCIP_DATA))
  );
}

export function assertAdapterSupportsDataMessage(folksChainId: FolksChainId, adapterId: AdapterType): void {
  if (!doesAdapterSupportDataMessage(folksChainId, adapterId))
    throw Error(`Adapter ${adapterId} does not support data message for folksChainId: ${folksChainId}`);
}

export function doesAdapterSupportTokenMessage(folksChainId: FolksChainId, adapterId: AdapterType): boolean {
  const isHub = isHubChain(folksChainId, FolksCore.getSelectedNetwork());
  return (
    (isHub && adapterId === AdapterType.HUB) ||
    (!isHub && (adapterId === AdapterType.WORMHOLE_CCTP || adapterId === AdapterType.CCIP_TOKEN))
  );
}

export function assertAdapterSupportsTokenMessage(folksChainId: FolksChainId, adapterId: AdapterType): void {
  if (!doesAdapterSupportTokenMessage(folksChainId, adapterId))
    throw Error(`Adapter ${adapterId} does not support token message for folksChainId: ${folksChainId}`);
}

export function doesAdapterSupportCrossChainToken(
  crossChainToken: CrossChainTokenType,
  folksChainId: FolksChainId,
  adapterId: AdapterType,
): boolean {
  const isHub = isHubChain(folksChainId, FolksCore.getSelectedNetwork());
  return (isHub && adapterId === AdapterType.HUB) || (!isHub && crossChainToken.adapters.includes(adapterId));
}

export function assertCrossChainTokenSupportedByAdapter(
  crossChainToken: CrossChainTokenType,
  folksChainId: FolksChainId,
  adapterId: AdapterType,
): void {
  if (!doesAdapterSupportCrossChainToken(crossChainToken, folksChainId, adapterId))
    throw Error(`Adapter ${adapterId} does not support cross chain token: ${crossChainToken.address}`);
}

export function assertAdapterSupportsCrossChainToken(
  folksChainId: FolksChainId,
  crossChainToken: CrossChainTokenType,
  adapterId: AdapterType,
): void {
  assertAdapterSupportsTokenMessage(folksChainId, adapterId);
  assertCrossChainTokenSupportedByAdapter(crossChainToken, folksChainId, adapterId);
}

export function doesAdapterSupportReceiverValue(folksChainId: FolksChainId, adapterId: AdapterType): boolean {
  const isHub = isHubChain(folksChainId, FolksCore.getSelectedNetwork());
  return (
    (isHub && adapterId === AdapterType.HUB) ||
    (!isHub && (adapterId === AdapterType.WORMHOLE_DATA || adapterId === AdapterType.WORMHOLE_CCTP))
  );
}

export function assertAdapterSupportsReceiverValue(folksChainId: FolksChainId, adapterId: AdapterType): void {
  if (!doesAdapterSupportReceiverValue(folksChainId, adapterId))
    throw Error(`Adapter ${adapterId} does not support receiver value for folksChainId: ${folksChainId}`);
}

function getSendTokenAdapterIds(folksTokenId: FolksTokenId, network: NetworkType) {
  const hubTokenData = getHubTokenData(folksTokenId, network);
  if (hubTokenData.token.type == TokenType.CROSS_CHAIN) return hubTokenData.token.adapters;
  return DATA_ADAPTERS;
}

function getMessageAdapterIds(messageAdapterParams: MessageAdapterParams) {
  const { network, messageAdapterParamType } = messageAdapterParams;
  if (messageAdapterParamType === MessageAdapterParamsType.SendToken)
    return getSendTokenAdapterIds(messageAdapterParams.folksTokenId, network);
  return DATA_ADAPTERS;
}

function getReturnMessageAdapterIds({ folksTokenId, network }: ReceiveTokenMessageAdapterParams) {
  return getSendTokenAdapterIds(folksTokenId, network);
}

export function getSupportedMessageAdapters(params: MessageAdapterParams) {
  const { messageAdapterParamType, sourceFolksChainId, network } = params;
  const spokeAdapterIds = getSpokeAdapterIds(sourceFolksChainId, network);
  const supportedAdapterIds = getMessageAdapterIds(params).filter(intersect(spokeAdapterIds));

  switch (messageAdapterParamType) {
    case MessageAdapterParamsType.SendToken: {
      return {
        adapterIds: supportedAdapterIds,
        returnAdapterIds: supportedAdapterIds,
      };
    }
    case MessageAdapterParamsType.ReceiveToken: {
      const destSpokeAdapterIds = getSpokeAdapterIds(params.destFolksChainId, network);
      const supportedReturnAdapterIds = getReturnMessageAdapterIds(params).filter(intersect(destSpokeAdapterIds));
      return {
        adapterIds: supportedAdapterIds,
        returnAdapterIds: supportedReturnAdapterIds,
      };
    }
    case MessageAdapterParamsType.Data:
      return {
        adapterIds: supportedAdapterIds,
        returnAdapterIds: [AdapterType.HUB],
      };
    default:
      return exhaustiveCheck(messageAdapterParamType);
  }
}
