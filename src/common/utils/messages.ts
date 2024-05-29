import {
  buildEvmMessageToSend,
  estimateEVMWormholeDataGasLimit,
} from "../../chains/evm/common/utils/message.js";
import { exhaustiveCheck } from "../../utils/exhaustive-check.js";
import { WORMHOLE_DATA } from "../constants/gmp.js";
import { ChainType } from "../types/chain.js";
import { AdapterType } from "../types/message.js";

import { convertFromGenericAddress } from "./address.js";
import { getFolksChain } from "./chain.js";

import type {
  FolksChainId,
  GenericAddress,
  NetworkType,
} from "../types/chain.js";
import type { FolksProvider } from "../types/core.js";
import type { WormholeData } from "../types/gmp.js";
import type {
  MessageAdapters,
  MessageToSend,
  MessageBuilderParams,
  OptionalMessageParams,
} from "../types/message.js";
import type { Client as EVMProvider } from "viem";

export function buildMessageToSend(
  chainType: ChainType,
  messageToSendBuilderParams: MessageBuilderParams,
  feeParams: OptionalMessageParams = {},
): MessageToSend {
  switch (chainType) {
    case ChainType.EVM: {
      return buildEvmMessageToSend(messageToSendBuilderParams, feeParams);
    }
    default:
      return exhaustiveCheck(chainType);
  }
}

export function getWormholeData(folksChainId: FolksChainId): WormholeData {
  const wormholeData = WORMHOLE_DATA[folksChainId];
  if (wormholeData) return wormholeData;
  throw new Error(`Wormhole data not found for folksChainId: ${folksChainId}`);
}

export async function estimateReceiveGasLimit(
  sourceFolksChainId: FolksChainId,
  destFolksChainId: FolksChainId,
  destFolksChainProvider: FolksProvider,
  network: NetworkType,
  adapters: MessageAdapters,
  sourceAdapterAddress: GenericAddress,
  destAdapterAddress: GenericAddress,
  messageBuilderParams: MessageBuilderParams,
  receiverValue = BigInt(0),
  returnGasLimit = BigInt(0),
) {
  const destFolksChain = getFolksChain(destFolksChainId, network);
  switch (destFolksChain.chainType) {
    case ChainType.EVM:
      switch (adapters.adapterId) {
        case AdapterType.WORMHOLE_DATA: {
          const sourceWormholeChainId =
            getWormholeData(sourceFolksChainId).wormholeChainId;
          const wormholeRelayer = convertFromGenericAddress(
            getWormholeData(destFolksChainId).wormholeRelayer,
            ChainType.EVM,
          );

          return await estimateEVMWormholeDataGasLimit(
            // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
            destFolksChainProvider as EVMProvider,
            messageBuilderParams,
            receiverValue,
            returnGasLimit,
            sourceWormholeChainId,
            wormholeRelayer,
            destAdapterAddress,
            sourceAdapterAddress,
          );
        }
        case AdapterType.WORMHOLE_CCTP: {
          throw new Error(
            "Not implemented yet: AdapterType.WORMHOLE_CCTP case",
          );
        }
        case AdapterType.HUB: {
          throw new Error("Not implemented yet: AdapterType.HUB case");
        }
        case AdapterType.CCIP_DATA: {
          throw new Error("Not implemented yet: AdapterType.CCIP_DATA case");
        }
        case AdapterType.CCIP_TOKEN: {
          throw new Error("Not implemented yet: AdapterType.CCIP_TOKEN case");
        }
        default:
          return exhaustiveCheck(adapters.adapterId);
      }

    default:
      return exhaustiveCheck(destFolksChain.chainType);
  }
}
