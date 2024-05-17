import { randomBytes } from "crypto";
import { type Hex, createWalletClient, http } from "viem";
import { FOLKS_CHAIN_ID } from "../src/common/constants/chain.js";
import {
  NetworkType,
  FolksCore,
  FolksAccount,
  AdapterType,
} from "../src/index.js";
import type { FolksCoreConfig, MessageAdapters } from "../src/index.js";

async function main() {
  const folksConfig: FolksCoreConfig = {
    network: NetworkType.TESTNET,
    provider: { evm: {} },
  };

  FolksCore.init(folksConfig);
  FolksCore.setFolksChainIdAndSigner(
    FOLKS_CHAIN_ID.AVALANCHE_FUJI,
    NetworkType.TESTNET,
  );

  const accountId: Hex = randomBytes(32).toString("hex") as Hex;

  // read
  const accountInfo = await FolksAccount.read.accountInfo(accountId);

  console.log(accountInfo);

  // write
  const signer = createWalletClient({
    transport: http(),
  });
  const adapters: MessageAdapters = {
    adapterId: AdapterType.WORMHOLE_DATA,
    returnAdapterId: AdapterType.HUB,
  };

  FolksCore.setFolksChainIdAndSigner(
    FOLKS_CHAIN_ID.AVALANCHE_FUJI,
    NetworkType.TESTNET,
    signer,
  );

  const prepareCreateAccountCall = await FolksAccount.prepare.createAccount(
    accountId,
    adapters,
  );
  const createAccountCallRes = await FolksAccount.write.createAccount(
    accountId,
    prepareCreateAccountCall,
  );

  console.log(createAccountCallRes);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });