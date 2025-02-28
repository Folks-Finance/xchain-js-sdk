import { CCIP_DATA, WORMHOLE_DATA } from "../constants/gmp.js";

import type { FolksChainId } from "../types/chain.js";
import type { CCIPData, WormholeData } from "../types/gmp.js";

export function getWormholeData(folksChainId: FolksChainId): WormholeData {
  const wormholeDataAdapter = WORMHOLE_DATA[folksChainId];
  if (!wormholeDataAdapter) throw new Error(`Wormhole data not found for folksChainId: ${folksChainId}`);
  return wormholeDataAdapter;
}

export function getCcipData(folksChainId: FolksChainId): CCIPData {
  return CCIP_DATA[folksChainId];
}
