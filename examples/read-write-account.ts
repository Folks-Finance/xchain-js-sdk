import { createWalletClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import {
  NetworkType,
  FolksCore,
  getRandomBytes,
  FolksAccount,
  FOLKS_CHAIN_ID,
  BYTES4_LENGTH,
  getSupportedMessageAdapters,
  Action,
  MessageAdapterParamsType,
  buildAccountId,
  convertToGenericAddress,
  ChainType,
  CHAIN_VIEM,
} from "../src/index.js";

import type { EvmAddress, FolksCoreConfig, MessageAdapters, Nonce } from "../src/index.js";

async function main() {
  const network = NetworkType.TESTNET;
  const chain = FOLKS_CHAIN_ID.AVALANCHE_FUJI;

  const folksConfig: FolksCoreConfig = { network, provider: { evm: {} } };

  FolksCore.init(folksConfig);
  FolksCore.setNetwork(network);

  const nonce: Nonce = getRandomBytes(BYTES4_LENGTH) as Nonce;

  // write
  const MNEMONIC = "your mnemonic here";
  const account = mnemonicToAccount(MNEMONIC);

  const signer = createWalletClient({
    account,
    chain: CHAIN_VIEM[chain],
    transport: http(),
  });

  const { adapterIds, returnAdapterIds } = getSupportedMessageAdapters({
    action: Action.CreateAccount,
    messageAdapterParamType: MessageAdapterParamsType.Data,
    network,
    sourceFolksChainId: chain,
  });

  const adapters: MessageAdapters = {
    adapterId: adapterIds[0],
    returnAdapterId: returnAdapterIds[0],
  };

  FolksCore.setFolksSigner({ signer, folksChainId: chain });

  // read
  const folksChain = FolksCore.getSelectedFolksChain();
  const userAddress = convertToGenericAddress(account.address as EvmAddress, ChainType.EVM);
  const accountId = buildAccountId(userAddress, folksChain.folksChainId, nonce);
  const accountInfo = await FolksAccount.read.accountInfo(accountId);
  console.log(accountInfo);

  // write
  const prepareCreateAccountCall = await FolksAccount.prepare.createAccount(nonce, adapters);
  const createAccountCallRes = await FolksAccount.write.createAccount(nonce, prepareCreateAccountCall);

  console.log(createAccountCallRes);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
