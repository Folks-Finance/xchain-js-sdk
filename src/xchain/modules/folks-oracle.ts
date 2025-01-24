import { FolksHubOracle } from "../../chains/evm/hub/modules/index.js";
import { getHubTokenData, getHubTokensData } from "../../chains/evm/hub/utils/chain.js";
import { FolksCore } from "../core/folks-core.js";

import type { OraclePrice, OraclePrices } from "../../chains/evm/hub/types/oracle.js";
import type { FolksTokenId } from "../../common/types/token.js";

export const read = {
  async oraclePrice(folksTokenId: FolksTokenId): Promise<OraclePrice> {
    const network = FolksCore.getSelectedNetwork();

    const { poolId } = getHubTokenData(folksTokenId, network);

    return await FolksHubOracle.getOraclePrice(FolksCore.getHubProvider(), network, poolId);
  },

  async oraclePrices(folksTokenIds?: Array<FolksTokenId>): Promise<OraclePrices> {
    const network = FolksCore.getSelectedNetwork();

    const tokensData = folksTokenIds
      ? folksTokenIds.map((folksTokenId) => getHubTokenData(folksTokenId, network))
      : Object.values(getHubTokensData(network));

    return FolksHubOracle.getOraclePrices(FolksCore.getHubProvider(), network, tokensData);
  },
};
