import {createWalletClient, http} from "viem";
import {mnemonicToAccount} from "viem/accounts";

import {convertStringToLoanName} from "../src/common/utils/lending.js";
import type {AccountId, FolksCoreConfig, MessageAdapters, Nonce} from "../src/index.js";
import {
    Action,
    BYTES4_LENGTH,
    CHAIN_VIEM,
    FOLKS_CHAIN_ID,
    FolksCore,
    FolksLoan,
    getRandomBytes,
    getSupportedMessageAdapters,
    MessageAdapterParamsType,
    NetworkType,
    TESTNET_LOAN_TYPE_ID,
} from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;
  const chain = FOLKS_CHAIN_ID.AVALANCHE_FUJI;

  const folksConfig: FolksCoreConfig = { network, provider: { evm: {} } };

  FolksCore.init(folksConfig);
  FolksCore.setNetwork(network);

  const nonce: Nonce = getRandomBytes(BYTES4_LENGTH) as Nonce;

  const MNEMONIC = "your mnemonic here";
  const account = mnemonicToAccount(MNEMONIC);

  const signer = createWalletClient({
    account,
    chain: CHAIN_VIEM[chain],
    transport: http(),
  });

  const { adapterIds, returnAdapterIds } = getSupportedMessageAdapters({
    action: Action.CreateLoan,
    messageAdapterParamType: MessageAdapterParamsType.Data,
    network,
    sourceFolksChainId: chain,
  });

  const adapters: MessageAdapters = {
    adapterId: adapterIds[0],
    returnAdapterId: returnAdapterIds[0],
  };

  FolksCore.setFolksSigner({ signer, folksChainId: chain });

  const accountId = "0x7d6...b66" as AccountId; // Your xChainApp account id
  const loanType = TESTNET_LOAN_TYPE_ID.GENERAL; // TESTNET_LOAN_TYPE_ID.DEPOSIT for deposits
  const loanName = convertStringToLoanName("Test Loan");

  const prepareCreateLoanCall = await FolksLoan.prepare.createLoan(accountId, nonce, loanType, loanName, adapters);
  const createLoanCallRes = await FolksLoan.write.createLoan(
    accountId,
    nonce,
    loanType,
    loanName,
    prepareCreateLoanCall,
  );
  console.log(`Transaction ID: ${createLoanCallRes}`);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
