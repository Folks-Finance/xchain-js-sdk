import { FolksCore, FolksLoan, FolksRewardsV2, MAINNET_LOAN_TYPE_ID, NetworkType } from "../src/index.js";

import type { AccountId, FolksCoreConfig, LoanId, LoanTypeId, LoanTypeInfo } from "../src/index.js";

async function main() {
  const network = NetworkType.MAINNET;
  const folksConfig: FolksCoreConfig = { network, provider: { evm: {} } };

  FolksCore.init(folksConfig);
  FolksCore.setNetwork(network);

  // fill in these details
  const accountId = "0x7d6...b66" as AccountId; // Your xChainApp account id
  const loanIds = ["0x166...c12" as LoanId]; // Your loan ids

  // prepare arguments
  const loanTypesInfo: Partial<Record<LoanTypeId, LoanTypeInfo>> = {};
  await Promise.all(
    Object.values(MAINNET_LOAN_TYPE_ID).map(
      async (loanTypeId) => (loanTypesInfo[loanTypeId] = await FolksLoan.read.loanTypeInfo(loanTypeId)),
    ),
  );
  const [activeEpochs, userPoints] = await Promise.all([
    FolksRewardsV2.read.activeEpochs(),
    FolksLoan.read.userPoints(accountId, loanIds, loanTypesInfo),
  ]);
  const lastUpdatedPointsForRewards = await FolksRewardsV2.read.lastUpdatedPointsForRewards(accountId, activeEpochs);

  // read pending rewards
  const pendingRewards = FolksRewardsV2.util.pendingRewards(
    loanTypesInfo,
    activeEpochs,
    userPoints,
    lastUpdatedPointsForRewards,
  );
  console.log(pendingRewards);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error: unknown) => {
    console.error(error);
  });
