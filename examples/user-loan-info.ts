import {createClient, http} from "viem";

import type {AccountId, FolksCoreConfig, FolksTokenId, PoolInfo} from "../src/index.js";
import {
    CHAIN_VIEM,
    FOLKS_CHAIN_ID,
    FolksCore,
    FolksLoan,
    FolksOracle,
    FolksPool,
    NetworkType,
    TESTNET_FOLKS_TOKEN_ID,
    TESTNET_LOAN_TYPE_ID,
} from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;

  const folksConfig: FolksCoreConfig = {
    network,
    provider: {
      evm: {
        [FOLKS_CHAIN_ID.AVALANCHE_FUJI]: createClient({
          chain: CHAIN_VIEM[FOLKS_CHAIN_ID.AVALANCHE_FUJI],
          transport: http("https://my-rpc.avax-testnet.network/<API_KEY>"),
        }),
      },
    },
  };

  FolksCore.init(folksConfig);
  FolksCore.setNetwork(network);

  const poolsInfo: Partial<Record<FolksTokenId, PoolInfo>> = {};
  await Promise.all(
    Object.values(TESTNET_FOLKS_TOKEN_ID).map(async (folksTokenId) => {
      const poolInfo = await FolksPool.read.poolInfo(folksTokenId);
      poolsInfo[folksTokenId] = poolInfo;
    }),
  );
  const loanTypeInfo = {
    [TESTNET_LOAN_TYPE_ID.GENERAL]: await FolksLoan.read.loanTypeInfo(TESTNET_LOAN_TYPE_ID.GENERAL),
  };
  const oraclePrices = await FolksOracle.read.oraclePrices();

  const accountId: AccountId = "0x7d6...b66" as AccountId;

  const loanIds = await FolksLoan.read.userLoansIds(accountId, [TESTNET_LOAN_TYPE_ID.GENERAL]);
  const generalLoansIds = loanIds.get(TESTNET_LOAN_TYPE_ID.GENERAL);

  if (!generalLoansIds) {
    console.log("No general loans found");
    return;
  }

  const userGeneralLoans = await FolksLoan.read.userLoans(generalLoansIds);
  const userGeneralLoansInfo = FolksLoan.util.userLoansInfo(userGeneralLoans, poolsInfo, loanTypeInfo, oraclePrices);
  console.log(userGeneralLoansInfo);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
