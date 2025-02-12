import * as dn from "dnum";
import { createWalletClient, http, parseUnits } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import {
  NetworkType,
  FolksCore,
  FolksLoan,
  FOLKS_CHAIN_ID,
  CHAIN_VIEM,
  TESTNET_FOLKS_TOKEN_ID,
  FolksPool,
  FolksOracle,
  TESTNET_LOAN_TYPE_ID,
} from "../src/index.js";

import type { FolksCoreConfig, AccountId, LoanId, FolksTokenId, PoolInfo } from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;
  const chain = FOLKS_CHAIN_ID.AVALANCHE_FUJI;

  const folksConfig: FolksCoreConfig = { network, provider: { evm: {} } };

  FolksCore.init(folksConfig);
  FolksCore.setNetwork(network);

  const MNEMONIC = "your mnemonic here";
  const account = mnemonicToAccount(MNEMONIC);

  const signer = createWalletClient({
    account,
    chain: CHAIN_VIEM[chain],
    transport: http(),
  });

  FolksCore.setFolksSigner({ signer, folksChainId: chain });

  const accountId = "0x7d6...b66" as AccountId; // Your xChainApp account id
  const liquidatorLoanId = "0x4c6...824" as LoanId; // Your loan id to transfer debt and collateral into
  const violatorLoanId = "0xcd1...632" as LoanId; // Loan to liquidate

  // check if loan can be liquidated
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

  const userGeneralLoans = await FolksLoan.read.userLoans([violatorLoanId]);
  const userGeneralLoansInfo = FolksLoan.util.userLoansInfo(userGeneralLoans, poolsInfo, loanTypeInfo, oraclePrices);
  const violatorLoanInfo = userGeneralLoansInfo[violatorLoanId];

  if (dn.lt(violatorLoanInfo.totalEffectiveBorrowBalanceValue, violatorLoanInfo.totalEffectiveCollateralBalanceValue)) {
    console.log("Loan can't be liquidated.");
    return;
  }

  // liquidate
  const amountToRepay = parseUnits("0.01", 18);
  const minAmountToSeize = parseUnits("0.5", 18);
  const prepareLiquidationCall = await FolksLoan.prepare.liquidate(
    accountId,
    liquidatorLoanId,
    violatorLoanId,
    TESTNET_FOLKS_TOKEN_ID.BNB,
    TESTNET_FOLKS_TOKEN_ID.AVAX,
    amountToRepay,
    minAmountToSeize,
  );
  const liquidateRes = await FolksLoan.write.liquidate(accountId, prepareLiquidationCall);
  console.log(`Transaction ID: ${liquidateRes}`);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
