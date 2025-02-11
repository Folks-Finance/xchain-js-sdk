import { createWalletClient, http, parseUnits } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import {
  NetworkType,
  FolksCore,
  FolksLoan,
  FOLKS_CHAIN_ID,
  getSupportedMessageAdapters,
  Action,
  MessageAdapterParamsType,
  CHAIN_VIEM,
  TESTNET_FOLKS_TOKEN_ID,
  TESTNET_LOAN_TYPE_ID,
} from "../src/index.js";

import type { FolksCoreConfig, MessageAdapters, AccountId, LoanId } from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;
  const chain = FOLKS_CHAIN_ID.AVALANCHE_FUJI;
  const tokenId = TESTNET_FOLKS_TOKEN_ID.AVAX;

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
    action: Action.Deposit,
    messageAdapterParamType: MessageAdapterParamsType.SendToken,
    network,
    sourceFolksChainId: chain,
    folksTokenId: tokenId,
  });

  const adapters: MessageAdapters = {
    adapterId: adapterIds[0],
    returnAdapterId: returnAdapterIds[0],
  };

  FolksCore.setFolksSigner({ signer, folksChainId: chain });

  const accountId = "0x7d6...b66" as AccountId; // Your xChainApp account id
  const loanId = "0x166...c12" as LoanId; // Your loan id
  const loanType = TESTNET_LOAN_TYPE_ID.GENERAL; // TESTNET_LOAN_TYPE_ID.DEPOSIT for deposits
  const amountToDeposit = parseUnits("0.1", 18); // 0.1 AVAX (AVAX has 18 decimals)

  const prepareDepositCall = await FolksLoan.prepare.deposit(
    accountId,
    loanId,
    loanType,
    tokenId,
    amountToDeposit,
    adapters,
  );
  const createDepositCallRes = await FolksLoan.write.deposit(
    accountId,
    loanId,
    amountToDeposit,
    true,
    prepareDepositCall,
  );
  console.log(`Transaction ID: ${createDepositCallRes}`);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
