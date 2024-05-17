import type { FolksTokenId } from "../../../../common/types/index.js";
import type {
  GenericAddress,
  IFolksChain,
} from "../../../../common/types/index.js";
import type { HubTokenData } from "./token.js";

export type HubChain = {
  hubAddress: GenericAddress;
  bridgeRouterAddress: GenericAddress;
  spokeManagerAddress: GenericAddress;
  accountManagerAddress: GenericAddress;
  loanManagerAddress: GenericAddress;
  tokens: Record<FolksTokenId, HubTokenData>;
} & IFolksChain;