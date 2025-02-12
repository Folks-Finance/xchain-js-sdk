import { FolksHubOracle } from "../../chains/evm/hub/modules/index.js";
import { getHubTokenData, getHubTokensData, getHubRewardsV2TokensData } from "../../chains/evm/hub/utils/chain.js";
import { FolksCore } from "../core/folks-core.js";

import type {
  OraclePrice,
  OraclePrices,
  OracleNodePrice,
  OracleNodePrices,
  OracleNode,
} from "../../chains/evm/hub/types/oracle.js";
import type { FolksTokenId } from "../../common/types/token.js";

export const read = {
  async oraclePrice(folksTokenId: FolksTokenId, blockNumber?: bigint): Promise<OraclePrice> {
    const network = FolksCore.getSelectedNetwork();
    const { poolId } = getHubTokenData(folksTokenId, network);
    return await FolksHubOracle.getOraclePrice(FolksCore.getHubProvider(), network, poolId, blockNumber);
  },

  async oraclePrices(folksTokenIds?: Array<FolksTokenId>, blockNumber?: bigint): Promise<OraclePrices> {
    const network = FolksCore.getSelectedNetwork();
    const tokensData = folksTokenIds
      ? folksTokenIds.map((folksTokenId) => getHubTokenData(folksTokenId, network))
      : Object.values(getHubTokensData(network));
    return FolksHubOracle.getOraclePrices(FolksCore.getHubProvider(), network, tokensData, blockNumber);
  },

  async oracleNodePrice(oracleNode: OracleNode): Promise<OracleNodePrice> {
    const network = FolksCore.getSelectedNetwork();
    return await FolksHubOracle.getNodePrice(FolksCore.getHubProvider(), network, oracleNode);
  },

  async oracleNodePrices(oracleNodes?: Array<OracleNode>): Promise<OracleNodePrices> {
    const network = FolksCore.getSelectedNetwork();
    const nodes =
      oracleNodes ??
      Object.values(getHubRewardsV2TokensData(network)).map(({ nodeId, token }) => ({
        nodeId,
        decimals: token.decimals,
      }));
    return await FolksHubOracle.getNodePrices(FolksCore.getHubProvider(), network, nodes);
  },
};
