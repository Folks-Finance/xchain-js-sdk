import * as dn from "dnum";
import { createWalletClient, http, parseUnits } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import {
  NetworkType,
  FolksCore,
  FolksLoan,
  FolksPool,
  FOLKS_CHAIN_ID,
  getSupportedMessageAdapters,
  Action,
  MessageAdapterParamsType,
  CHAIN_VIEM,
  TESTNET_FOLKS_TOKEN_ID,
} from "../src/index.js";

import type { FolksCoreConfig, MessageAdapters, AccountId, LoanId } from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;
  const chain = FOLKS_CHAIN_ID.BSC_TESTNET;
  const tokenId = TESTNET_FOLKS_TOKEN_ID.BNB;

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

  const { adapterIds, returnAdapterIds } = getSupportedMessageAdapters({
    action: Action.Borrow,
    messageAdapterParamType: MessageAdapterParamsType.ReceiveToken,
    network,
    sourceFolksChainId: chain,
    destFolksChainId: chain,
    folksTokenId: tokenId,
  });

  const adapters: MessageAdapters = {
    adapterId: adapterIds[0],
    returnAdapterId: returnAdapterIds[0],
  };

  FolksCore.setFolksSigner({ signer, folksChainId: chain });

  const accountId = "0x7d6...b66" as AccountId; // Your xChainApp account id
  const loanId = "0x166...c12" as LoanId; // Your loan id
  const amountToBorrow = parseUnits("0.0005", 18); // 0.0005 BNB (BNB has 18 decimals)
  const isStableRate = false;

  let maxStableRate;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (isStableRate) {
    const poolInfo = await FolksPool.read.poolInfo(tokenId);
    const interestRate = poolInfo.stableBorrowData.interestRate[0];
    const [rateWithSlippage] = dn.mul(interestRate, 1.05); // 5% max deviation from current rate
    maxStableRate = rateWithSlippage;
  } else {
    maxStableRate = BigInt(0);
  }

  const prepareBorrowCall = await FolksLoan.prepare.borrow(
    accountId,
    loanId,
    tokenId,
    amountToBorrow,
    maxStableRate,
    chain,
    adapters,
  );
  const createBorrowCallRes = await FolksLoan.write.borrow(
    accountId,
    loanId,
    tokenId,
    amountToBorrow,
    maxStableRate,
    chain,
    prepareBorrowCall,
  );
  console.log(`Transaction ID: ${createBorrowCallRes}`);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
