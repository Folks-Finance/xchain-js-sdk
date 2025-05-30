import { MAINNET_REWARDS_TOKEN_ID, TESTNET_REWARDS_TOKEN_ID } from "../../../../common/constants/reward.js";
import { MAINNET_FOLKS_TOKEN_ID, TESTNET_FOLKS_TOKEN_ID } from "../../../../common/types/token.js";

import { EVM_FOLKS_CHAIN_ID } from "./chain.js";

import type { RewardsTokenId } from "../../../../common/types/rewards.js";
import type { FolksTokenId as LendingTokenId } from "../../../../common/types/token.js";
import type { EvmFolksChainId } from "../types/chain.js";
import type { Erc20ContractSlot } from "../types/tokens.js";

export const CONTRACT_SLOT: Partial<
  Record<EvmFolksChainId, { erc20: Partial<Record<LendingTokenId | RewardsTokenId, Erc20ContractSlot>> }>
> = {
  [EVM_FOLKS_CHAIN_ID.AVALANCHE]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.sAVAX]: {
        balanceOf: 203n,
        allowance: 204n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_ava]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCb_ava]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.JOE]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.ggAVAX]: {
        balanceOf: 5n,
        allowance: 6n,
      },
      [MAINNET_FOLKS_TOKEN_ID.aUSD_ava]: {
        balanceOf: BigInt("31363640401025590090454088818897734140993165621067851506404760590626227402496"),
        allowance: BigInt("31363640401025590090454088818897734140993165621067851506404760590626227402497"),
      },
      [MAINNET_FOLKS_TOKEN_ID.savUSD]: {
        balanceOf: 4n,
        allowance: 5n,
      },
      [MAINNET_REWARDS_TOKEN_ID.GoGoPool]: {
        balanceOf: 3n,
        allowance: 4n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.ETHEREUM]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_eth]: {
        balanceOf: 0n,
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.BASE]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.cbBTC_base]: {
        balanceOf: 1n,
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.BSC]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.ETHB_bsc]: {
        balanceOf: 1n,
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCB_bsc]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.ARBITRUM]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.ARB]: {
        balanceOf: 51n,
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_arb]: {
        balanceOf: 51n,
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_arb]: {
        balanceOf: 1n,
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_arb]: {
        balanceOf: 51n,
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.rsETH_arb]: {
        balanceOf: 5n,
        allowance: 6n,
      },
      [MAINNET_FOLKS_TOKEN_ID.tBTC_arb]: {
        balanceOf: 51n,
        allowance: 52n,
      },
      [MAINNET_REWARDS_TOKEN_ID.USDC_arb]: {
        balanceOf: 9n,
        allowance: 10n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.POLYGON]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_pol]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_pol]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_pol]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.LINK_pol]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.MaticX]: {
        balanceOf: 0n,
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.AVALANCHE_FUJI]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        balanceOf: 0n,
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.BASE_SEPOLIA]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [TESTNET_REWARDS_TOKEN_ID.USDC_base_sep]: {
        balanceOf: 9n,
        allowance: 10n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.ARBITRUM_SEPOLIA]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        balanceOf: 0n,
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.ETHEREUM_SEPOLIA]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.USDC]: {
        balanceOf: 9n,
        allowance: 10n,
      },
      [TESTNET_FOLKS_TOKEN_ID.LINK_eth_sep]: {
        balanceOf: 0n,
        allowance: 1n,
      },
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        balanceOf: 0n,
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.BSC_TESTNET]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        balanceOf: 0n,
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.MONAD_TESTNET]: {
    erc20: {
      [TESTNET_FOLKS_TOKEN_ID.sMON]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.aprMON]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.gMON]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.shMON]: {
        balanceOf: 3n,
        allowance: 4n,
      },
    },
  },
} as const;
