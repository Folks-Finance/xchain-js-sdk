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
        allowance: 204n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_ava]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCb_ava]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.JOE]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.ggAVAX]: {
        allowance: 6n,
      },
      [MAINNET_FOLKS_TOKEN_ID.aUSD_ava]: {
        allowance: BigInt("31363640401025590090454088818897734140993165621067851506404760590626227402497"),
      },
      [MAINNET_FOLKS_TOKEN_ID.savUSD]: {
        allowance: 5n,
      },
      [MAINNET_REWARDS_TOKEN_ID.GoGoPool]: {
        allowance: 4n,
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_ava]: {
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.YBTCB]: {
        balanceOf: 251n,
        allowance: 252n,
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
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.ATH_eth]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.pyUSD_eth]: {
        allowance: 3n,
      },
      [MAINNET_FOLKS_TOKEN_ID.rlUSD_eth]: {
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_eth]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_eth]: {
        allowance: 102n,
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_eth]: {
        allowance: 5n,
      },
      [MAINNET_FOLKS_TOKEN_ID.YBTCB]: {
        balanceOf: 251n,
        allowance: 252n,
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
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.AERO_base]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.cbETH_base]: {
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_base]: {
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_base]: {
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.VIRTUAL_base]: {
        allowance: 6n,
      },
      [MAINNET_FOLKS_TOKEN_ID.KAITO_base]: {
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.BSC]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.ETHB_bsc]: {
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCB_bsc]: {
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.YBTCB]: {
        balanceOf: 251n,
        allowance: 252n,
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
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        balanceOf: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222592"),
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_arb]: {
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_arb]: {
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_arb]: {
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.rsETH_arb]: {
        allowance: 6n,
      },
      [MAINNET_FOLKS_TOKEN_ID.tBTC_arb]: {
        allowance: 52n,
      },
      [MAINNET_REWARDS_TOKEN_ID.USDC_arb]: {
        allowance: 10n,
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT0_arb]: {
        allowance: 52n,
      },
      [MAINNET_REWARDS_TOKEN_ID.USDT0_arb]: {
        allowance: 52n,
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
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_pol]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_pol]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.LINK_pol]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.MaticX]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.aUSD_pol]: {
        allowance: BigInt("31363640401025590090454088818897734140993165621067851506404760590626227402497"),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_pol]: {
        allowance: 1n,
      },
    },
  },
  [EVM_FOLKS_CHAIN_ID.SEI]: {
    erc20: {
      [MAINNET_FOLKS_TOKEN_ID.iSEI]: {
        allowance: 1n,
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT0_sei]: {
        allowance: 52n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_sei]: {
        allowance: 2n,
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_sei]: {
        allowance: 6n,
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
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.aprMON]: {
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.gMON]: {
        allowance: BigInt("37439836327923360225337895871394760624280537466773280374265222508165906222593"),
      },
      [TESTNET_FOLKS_TOKEN_ID.shMON]: {
        allowance: 4n,
      },
      [TESTNET_FOLKS_TOKEN_ID.rUSDC]: {
        allowance: 1n,
      },
    },
  },
} as const;
