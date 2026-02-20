import {
  CCIP_DATA,
  WORMHOLE_DATA,
  MOCK_WORMHOLE_GUARDIANS_DATA,
  WORMHOLE_EXECUTOR_CAPABILITIES_URL,
  REQUEST_PREFIX,
} from "../constants/gmp.js";

import type { FolksChainId, NetworkType } from "../types/chain.js";
import type { CCIPData, WormholeData, MockWormholeGuardiansData, WormholeExecutorCapability } from "../types/gmp.js";

export function getWormholeData(folksChainId: FolksChainId): WormholeData {
  return WORMHOLE_DATA[folksChainId];
}

export function getMockWormholeGuardiansData(network: NetworkType): MockWormholeGuardiansData {
  return MOCK_WORMHOLE_GUARDIANS_DATA[network];
}

export function getCcipData(folksChainId: FolksChainId): CCIPData {
  return CCIP_DATA[folksChainId];
}

async function fetchWormholeExecutorCapabilities(
  network: NetworkType,
): Promise<Partial<Record<string, WormholeExecutorCapability>>> {
  const response = await fetch(WORMHOLE_EXECUTOR_CAPABILITIES_URL[network]);
  if (response.ok) return (await response.json()) as Partial<Record<string, WormholeExecutorCapability>>;
  throw new Error(`Failed to fetch wormhole executor capabilities for ${network}: ${response.status}`);
}

export async function checkWormholeExecutorCapability(
  network: NetworkType,
  wormholeChainId: number,
  gasLimit: bigint,
  receiverValue: bigint,
  requestPrefix: string = REQUEST_PREFIX.VAA_V1,
): Promise<void> {
  const capabilities = await fetchWormholeExecutorCapabilities(network);
  const capability = capabilities[wormholeChainId.toString()];

  if (!capability) throw new Error(`Wormhole executor capability not found for chain ${wormholeChainId}`);
  if (!capability.requestPrefixes.includes(requestPrefix))
    throw new Error(
      `Wormhole executor does not support required request prefix ${requestPrefix} for chain ${wormholeChainId}`,
    );

  const maxGasLimit = BigInt(capability.maxGasLimit);
  const maxReceiverValue = BigInt(capability.maxMsgValue);
  if (gasLimit > maxGasLimit)
    throw new Error(
      `Estimated gas limit ${gasLimit.toString()} exceeds wormhole executor max gas limit ${maxGasLimit.toString()} for chain ${wormholeChainId}`,
    );
  if (receiverValue > maxReceiverValue)
    throw new Error(
      `Estimated receiver value ${receiverValue.toString()} exceeds wormhole executor max receiver value ${maxReceiverValue.toString()} for chain ${wormholeChainId}`,
    );
}
