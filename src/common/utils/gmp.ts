import { CCIP_DATA, WORMHOLE_DATA, MOCK_WORMHOLE_GUARDIANS_DATA } from "../constants/gmp.js";

import type { FolksChainId, NetworkType } from "../types/chain.js";
import type { CCIPData, WormholeData, MockWormholeGuardiansData } from "../types/gmp.js";

export function getWormholeData(folksChainId: FolksChainId): WormholeData {
  return WORMHOLE_DATA[folksChainId];
}

export function getMockWormholeGuardiansData(network: NetworkType): MockWormholeGuardiansData {
  return MOCK_WORMHOLE_GUARDIANS_DATA[network];
}

export function getCcipData(folksChainId: FolksChainId): CCIPData {
  return CCIP_DATA[folksChainId];
}
