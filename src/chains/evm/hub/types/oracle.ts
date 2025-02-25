import type { Branded } from "../../../../common/types/brand.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type { Dnum } from "dnum";

export type NodeId = Branded<`0x${string}`, "NodeId">;

export type OracleNode = {
  nodeId: NodeId;
  decimals: number;
};

export type OracleNodePrice = {
  price: Dnum;
  decimals: number;
  timestamp: bigint;
};

export type OracleNodePrices = Partial<Record<NodeId, OracleNodePrice>>;

export type OraclePrice = {
  price: Dnum;
  decimals: number;
};

export type OraclePrices = Partial<Record<FolksTokenId, OraclePrice>>;
