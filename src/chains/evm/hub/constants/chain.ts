import { FOLKS_CHAIN_ID } from "../../../../common/constants/chain.js";
import { MAINNET_POOLS, TESTNET_POOLS } from "../../../../common/constants/pool.js";
import {
  MAINNET_REWARDS_TOKEN_ID,
  REWARDS_TYPE,
  TESTNET_REWARDS_TOKEN_ID,
} from "../../../../common/constants/reward.js";
import { ChainType, NetworkType } from "../../../../common/types/chain.js";
import { MAINNET_LOAN_TYPE_ID, TESTNET_LOAN_TYPE_ID } from "../../../../common/types/lending.js";
import { AdapterType } from "../../../../common/types/message.js";
import { MAINNET_FOLKS_TOKEN_ID, TESTNET_FOLKS_TOKEN_ID, TokenType } from "../../../../common/types/token.js";
import { convertToGenericAddress } from "../../../../common/utils/address.js";

import type { EvmAddress } from "../../../../common/types/address.js";
import type { MainnetRewardsTokenId, TestnetRewardsTokenId } from "../../../../common/types/rewards.js";
import type { MainnetFolksTokenId, TestnetFolksTokenId } from "../../../../common/types/token.js";
import type { HubChain } from "../types/chain.js";
import type { NodeId } from "../types/oracle.js";
import type { HubRewardTokenData } from "../types/rewards-v2.js";
import type { HubTokenData } from "../types/token.js";

export const HUB_CHAIN: Record<NetworkType, HubChain> = {
  [NetworkType.MAINNET]: {
    folksChainId: FOLKS_CHAIN_ID.AVALANCHE,
    hubAddress: convertToGenericAddress("0xb39c03297E87032fF69f4D42A6698e4c4A934449" as EvmAddress, ChainType.EVM),
    bridgeRouterAddress: convertToGenericAddress(
      "0xFc828C500c90E63134B2B73537cC6cADfF4Ce695" as EvmAddress,
      ChainType.EVM,
    ),
    adapters: {
      [AdapterType.HUB]: convertToGenericAddress(
        "0xCda75578328D0CB0e79dB7797289c44fa02a77ad" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.WORMHOLE_DATA]: convertToGenericAddress(
        "0xeB48a1eE43B91959A1686b70B7Cd482c65DE69c9" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.WORMHOLE_CCTP]: convertToGenericAddress(
        "0x5C60f12838b8E3EEB525F299cD7C454c989dd04e" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.CCIP_DATA]: convertToGenericAddress(
        "0xc7bc4A43384f84B8FC937Ab58173Edab23a4c3cD" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.CCIP_TOKEN]: convertToGenericAddress(
        "0x5f2F4771B7dc7e2F7E9c1308B154E1e8957ecAB0" as EvmAddress,
        ChainType.EVM,
      ),
    },
    nodeManagerAddress: convertToGenericAddress(
      "0x802063A23E78D0f5D158feaAc605028Ee490b03b" as EvmAddress,
      ChainType.EVM,
    ),
    oracleManagerAddress: convertToGenericAddress(
      "0x7218Bd1050D41A9ECfc517abdd294FB8116aEe81" as EvmAddress,
      ChainType.EVM,
    ),
    spokeManagerAddress: convertToGenericAddress(
      "0x4Db12F554623E4B0b3F5bAcF1c8490D4493380A5" as EvmAddress,
      ChainType.EVM,
    ),
    accountManagerAddress: convertToGenericAddress(
      "0x12Db9758c4D9902334C523b94e436258EB54156f" as EvmAddress,
      ChainType.EVM,
    ),
    loanManagerAddress: convertToGenericAddress(
      "0xF4c542518320F09943C35Db6773b2f9FeB2F847e" as EvmAddress,
      ChainType.EVM,
    ),
    tokens: {
      [MAINNET_FOLKS_TOKEN_ID.USDC]: {
        token: {
          type: TokenType.CROSS_CHAIN,
          adapters: [AdapterType.HUB, AdapterType.WORMHOLE_CCTP, AdapterType.CCIP_TOKEN],
          address: convertToGenericAddress("0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E" as EvmAddress, ChainType.EVM),
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDC,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDC],
        poolAddress: convertToGenericAddress("0x88f15e36308ED060d8543DA8E2a5dA0810Efded2" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.AVAX]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.AVAX,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.AVAX],
        poolAddress: convertToGenericAddress("0x0259617bE41aDA4D97deD60dAf848Caa6db3F228" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.AVAX_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.sAVAX]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.sAVAX,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.sAVAX],
        poolAddress: convertToGenericAddress("0x7033105d1a527d342bE618ab1F222BB310C8d70b" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.AVAX_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ETH_eth]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ETH_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ETH_eth],
        poolAddress: convertToGenericAddress("0xB6DF8914C084242A19A4C7fb15368be244Da3c75" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ETH_base]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ETH_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ETH_base],
        poolAddress: convertToGenericAddress("0x51958ed7B96F57142CE63BB223bbd9ce23DA7125" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_ava]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wETH_ava,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wETH_ava],
        poolAddress: convertToGenericAddress("0x795CcF6f7601edb41E4b3123c778C56F0F19389A" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wBTC_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wBTC_eth],
        poolAddress: convertToGenericAddress("0x9936812835476504D6Cf495F4F0C718Ec19B3Aff" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCb_ava]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.BTCb_ava,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.BTCb_ava],
        poolAddress: convertToGenericAddress("0x1C51AA1516e1156d98075F2F64e259906051ABa9" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.cbBTC_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.cbBTC_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.cbBTC_base],
        poolAddress: convertToGenericAddress("0x9eD81F0b5b0E9b6dE00F374fFc7f270902576EF7" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.BNB]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.BNB,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.BNB],
        poolAddress: convertToGenericAddress("0x89970d3662614a5A4C9857Fcc9D9C3FA03824fe3" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ETHB_bsc]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ETHB_bsc,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ETHB_bsc],
        poolAddress: convertToGenericAddress("0x18031B374a571F9e060de41De58Abb5957cD5258" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.BTCB_bsc]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.BTCB_bsc,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.BTCB_bsc],
        poolAddress: convertToGenericAddress("0xC2FD40D9Ec4Ae7e71068652209EB75258809e131" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ETH_arb]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ETH_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ETH_arb],
        poolAddress: convertToGenericAddress("0x44E0d0809AF8Ee37BFb1A4e75D5EF5B96F6346A3" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ARB]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ARB,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ARB],
        poolAddress: convertToGenericAddress("0x1177A3c2CccDb9c50D52Fc2D30a13b2c3C40BCF4" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.SolvBTC]: {
        token: {
          type: TokenType.CROSS_CHAIN,
          adapters: [AdapterType.HUB, AdapterType.CCIP_TOKEN],
          address: convertToGenericAddress("0xbc78D84Ba0c46dFe32cf2895a19939c86b81a777" as EvmAddress, ChainType.EVM),
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.SolvBTC,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.SolvBTC],
        poolAddress: convertToGenericAddress("0x307bCEC89624660Ed06C97033EDb7eF49Ab0EB2D" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.JOE]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.JOE,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.JOE],
        poolAddress: convertToGenericAddress("0x5e5a2007a8D613C4C98F425097166095C875e6eE" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ggAVAX]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ggAVAX,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ggAVAX],
        poolAddress: convertToGenericAddress("0xAdA5Be2A259096fd11D00c2b5c1181843eD008DC" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.AVAX_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.POL]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.POL,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.POL],
        poolAddress: convertToGenericAddress("0x481cF0c02BF17a33753CE32f1931ED9990fFB40E" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.POL_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wBTC_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wBTC_pol],
        poolAddress: convertToGenericAddress("0x7054254933279d93D97309745AfbFF9310cdb570" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wETH_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wETH_pol],
        poolAddress: convertToGenericAddress("0x88Ae56886233C706409c74c3D4EA9A9Ac1D65ab2" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.aUSD_ava]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.aUSD_ava,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.aUSD_ava],
        poolAddress: convertToGenericAddress("0xc7DdB440666c144c2F27a3a5156D636Bacfc769C" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.savUSD]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.savUSD,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.savUSD],
        poolAddress: convertToGenericAddress("0xE6B7713854620076B5716E2743262D315bf8609D" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wBTC_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wBTC_arb],
        poolAddress: convertToGenericAddress("0x3445055F633fEF5A64F852aaCD6dA76143aCA109" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.tBTC_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.tBTC_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.tBTC_arb],
        poolAddress: convertToGenericAddress("0xdd9eFBf83572f5387381aD3A04b1318221d545A2" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wstETH_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wstETH_arb],
        poolAddress: convertToGenericAddress("0x9f0c0aDEc9fd4ef946aCe1e2b4F32e49aE45C8F3" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.weETH_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.weETH_arb],
        poolAddress: convertToGenericAddress("0x78B4e5cda33C898b546dB7925162879E7bd2A9d1" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.rsETH_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.rsETH_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.rsETH_arb],
        poolAddress: convertToGenericAddress("0x60f2682Ab38e3C9a51b07fbd69f42Ad2Cfe731db" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },

      [MAINNET_FOLKS_TOKEN_ID.wstETH_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wstETH_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wstETH_pol],
        poolAddress: convertToGenericAddress("0xD77b920A9c05B3e768FEaE0bcB5839cd224328fE" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.LINK_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.LINK_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.LINK_pol],
        poolAddress: convertToGenericAddress("0x84C420D5e077cF0ed8a20c44d803C380172eD5D5" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.MaticX]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.MaticX,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.MaticX],
        poolAddress: convertToGenericAddress("0x59023eFDB22B9d8b2C7aeD842aC1fd2f6110e5B5" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.POL_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.ATH_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.ATH_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.ATH_eth],
        poolAddress: convertToGenericAddress("0x391201cEC4F80e69C87Dee364d599c1FCAE3c363" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.pyUSD_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.pyUSD_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.pyUSD_eth],
        poolAddress: convertToGenericAddress("0x279b3E185F64e99141d4CE363657A5F3B5B32Fb9" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.rlUSD_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.rlUSD_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.rlUSD_eth],
        poolAddress: convertToGenericAddress("0x7178bF2a8A50153549e0d95A4C6Cb816448840F0" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wstETH_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wstETH_eth],
        poolAddress: convertToGenericAddress("0xe7897052FAC4bfF9EB3ABc073CBC1e17Fce5709C" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.weETH_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.weETH_eth],
        poolAddress: convertToGenericAddress("0x4E6dD5E35638008cdB1E9004F3E952bCDd920E6D" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.AERO_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.AERO_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.AERO_base],
        poolAddress: convertToGenericAddress("0xb5327c35E083248E3a0f79122FaB3b6018e5584a" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.cbETH_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.cbETH_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.cbETH_base],
        poolAddress: convertToGenericAddress("0x0b09E1Ffd28040654021A85A49284597F3d0e41C" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wstETH_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wstETH_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wstETH_base],
        poolAddress: convertToGenericAddress("0xC96820695217c7dd8F696f8892de76F7a48432CB" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.weETH_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.weETH_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.weETH_base],
        poolAddress: convertToGenericAddress("0xf727EC8D6e565328f2cf0Ff8aC4e7c9e7f8d24B2" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.VIRTUAL_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.VIRTUAL_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.VIRTUAL_base],
        poolAddress: convertToGenericAddress("0x331a1938f94af7bB41d57691119Aee416495202a" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.KAITO_base]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.KAITO_base,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.KAITO_base],
        poolAddress: convertToGenericAddress("0x04C8B9d8AF87a6D670B646125B2D99740D8eBa5E" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([MAINNET_LOAN_TYPE_ID.DEPOSIT, MAINNET_LOAN_TYPE_ID.GENERAL]),
      },
      [MAINNET_FOLKS_TOKEN_ID.aUSD_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.aUSD_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.aUSD_pol],
        poolAddress: convertToGenericAddress("0x34f1BA5808EB5Bf60c9B1C343d86e410466F4860" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_ava]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDT_ava,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDT_ava],
        poolAddress: convertToGenericAddress("0xA1E1024c49c77297bA6367F624cFbEFC80E697c6" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_eth]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDT_eth,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDT_eth],
        poolAddress: convertToGenericAddress("0xf51a72b92cB9C16376Da04f48eF071c966B9C50B" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT_pol]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDT_pol,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDT_pol],
        poolAddress: convertToGenericAddress("0x11f82b5Ea7408Ff257F6031E6A3e29203557A1DD" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT0_arb]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDT0_arb,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDT0_arb],
        poolAddress: convertToGenericAddress("0x1b5a1dCe059E6069Ed33C3656826Ad04bE536465" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.SEI]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.SEI,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.SEI],
        poolAddress: convertToGenericAddress("0x63EFdA4bf91Ba13D678C58AF47304e6180dD46DF" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.SEI_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.iSEI]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.iSEI,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.iSEI],
        poolAddress: convertToGenericAddress("0x2B7995fd223dCf3A660Cc5a514349E3fa7B16168" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.SEI_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.USDT0_sei]: {
        token: {
          type: TokenType.ERC20,
          decimals: 6,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.USDT0_sei,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.USDT0_sei],
        poolAddress: convertToGenericAddress("0x213299AC40Ce76117C2c4B13945D9d935686BB85" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.STABLECOIN_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wETH_sei]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wETH_sei,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wETH_sei],
        poolAddress: convertToGenericAddress("0x9A102080970043B96773c15E6520d182565C68Ff" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.ETH_EFFICIENCY,
        ]),
      },
      [MAINNET_FOLKS_TOKEN_ID.wBTC_sei]: {
        token: {
          type: TokenType.ERC20,
          decimals: 8,
        },
        folksTokenId: MAINNET_FOLKS_TOKEN_ID.wBTC_sei,
        poolId: MAINNET_POOLS[MAINNET_FOLKS_TOKEN_ID.wBTC_sei],
        poolAddress: convertToGenericAddress("0x7Cd4afD7F4DB51A0bF06Bf4630752A5B28e0B6C1" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([
          MAINNET_LOAN_TYPE_ID.DEPOSIT,
          MAINNET_LOAN_TYPE_ID.GENERAL,
          MAINNET_LOAN_TYPE_ID.BTC_EFFICIENCY,
        ]),
      },
    } satisfies Record<MainnetFolksTokenId, HubTokenData>,
    rewards: {
      bridgeRouterAddress: convertToGenericAddress(
        "0x347d342F12fA57b6231c82867f964Edfa4eD1431" as EvmAddress,
        ChainType.EVM,
      ),
      adapters: {
        [AdapterType.HUB]: convertToGenericAddress(
          "0xc02AdA9fdd113c2e76A86121fb1e69540E02B29c" as EvmAddress,
          ChainType.EVM,
        ),
        [AdapterType.WORMHOLE_DATA]: convertToGenericAddress(
          "0x3291FCf6Ca62939fc432Debe6cbB2a838F755D34" as EvmAddress,
          ChainType.EVM,
        ),
        [AdapterType.CCIP_DATA]: convertToGenericAddress(
          "0x97592Dc676D6051Bf813f663B717cfD6B177eEFF" as EvmAddress,
          ChainType.EVM,
        ),
      },
      [REWARDS_TYPE.V1]: {
        hubAddress: convertToGenericAddress("0x7c532A6209350cF27EfC3D06E82E35ACFd362C7C" as EvmAddress, ChainType.EVM),
      },
      [REWARDS_TYPE.V2]: {
        hubAddress: convertToGenericAddress("0x3E85a56C2202Ec067EB4Ac090db3e8149dA46d19" as EvmAddress, ChainType.EVM),
        spokeManagerAddress: convertToGenericAddress(
          "0x8a8b9386dFd63931284545dB62374b48180f0111" as EvmAddress,
          ChainType.EVM,
        ),
        tokens: {
          [MAINNET_REWARDS_TOKEN_ID.AVAX]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.AVAX,
            nodeId: "0xef91e0eb17127b0ebbb35065173e74ea28dccf613e509553bcd0ed42688046f1" as NodeId,
            token: {
              type: TokenType.NATIVE,
              decimals: 18,
            },
          },
          [MAINNET_REWARDS_TOKEN_ID.GoGoPool]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.GoGoPool,
            nodeId: "0x9316a3c563f1bedd6ac0b2a50d02fffdc57b0eb1bd3e47f1c54745e591ce10f5" as NodeId,
            token: {
              type: TokenType.ERC20,
              decimals: 18,
            },
          },
          [MAINNET_REWARDS_TOKEN_ID.USDC_arb]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.USDC_arb,
            nodeId: "0x3c7d21242f7b2ec7812a5f91cade699bd06e358fd38a5462aff240cba10a6cbe" as NodeId,
            token: {
              type: TokenType.ERC20,
              decimals: 6,
            },
          },
          [MAINNET_REWARDS_TOKEN_ID.POL]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.POL,
            nodeId: "0x5ffc96dd95bbfe846c600fdd21d33f36e7236fee9344bb8b3f4edada887d26d4" as NodeId,
            token: {
              type: TokenType.NATIVE,
              decimals: 18,
            },
          },
          [MAINNET_REWARDS_TOKEN_ID.USDT0_arb]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.USDT0_arb,
            nodeId: "0x54670d5dc11a4e436bebf3eda9ac73345d9f2d2049ea23434fb187f392cd0a5a" as NodeId,
            token: {
              type: TokenType.ERC20,
              decimals: 6,
            },
          },
          [MAINNET_REWARDS_TOKEN_ID.SEI]: {
            rewardTokenId: MAINNET_REWARDS_TOKEN_ID.SEI,
            nodeId: "0xf7ed066f440ac578f2cf837e716771774372adc372b9c59e461cb92a13f6db38" as NodeId,
            token: {
              type: TokenType.NATIVE,
              decimals: 18,
            },
          },
        } satisfies Record<MainnetRewardsTokenId, HubRewardTokenData>,
      },
    },
  },
  [NetworkType.TESTNET]: {
    folksChainId: FOLKS_CHAIN_ID.AVALANCHE_FUJI,
    hubAddress: convertToGenericAddress("0x9aA6B9A5D131b93fa1e6dFf86Dc59e6975584055" as EvmAddress, ChainType.EVM),
    bridgeRouterAddress: convertToGenericAddress(
      "0x61ad61b445897688e75f80F37867bb8C23021F34" as EvmAddress,
      ChainType.EVM,
    ),
    adapters: {
      [AdapterType.HUB]: convertToGenericAddress(
        "0x2e5aEA1cb7db799a0D243391f1044797156a2376" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.WORMHOLE_DATA]: convertToGenericAddress(
        "0x52F5ff24c7269b5a1f341f3c4aE651F97C9e8181" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.WORMHOLE_CCTP]: convertToGenericAddress(
        "0xC2B21a8D716b7Bd4338FEaF3A207c40B9D7073Fe" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.CCIP_DATA]: convertToGenericAddress(
        "0xEc5d2d396345581136B819beEb96a225f63FF213" as EvmAddress,
        ChainType.EVM,
      ),
      [AdapterType.CCIP_TOKEN]: convertToGenericAddress(
        "0xf897C0f5b502EA259b2b3418eAFF0AfA32f80CFF" as EvmAddress,
        ChainType.EVM,
      ),
    },
    nodeManagerAddress: convertToGenericAddress(
      "0xbb492e822b8CC0c9032bCe642F29e0B3D55F0446" as EvmAddress,
      ChainType.EVM,
    ),
    oracleManagerAddress: convertToGenericAddress(
      "0xba18A8d45bF2f7032aB0758839eac914D345c99e" as EvmAddress,
      ChainType.EVM,
    ),
    spokeManagerAddress: convertToGenericAddress(
      "0xCde067f269319BA603cc39dafA3226A5236f2196" as EvmAddress,
      ChainType.EVM,
    ),
    accountManagerAddress: convertToGenericAddress(
      "0x9a77703Eb84BA28864D650695eF7Be54eDB416F0" as EvmAddress,
      ChainType.EVM,
    ),
    loanManagerAddress: convertToGenericAddress(
      "0x65cEC46Ed082e41ECFcCDfD8ac9222C1e0f4cd2a" as EvmAddress,
      ChainType.EVM,
    ),
    tokens: {
      [TESTNET_FOLKS_TOKEN_ID.USDC]: {
        token: {
          type: TokenType.CROSS_CHAIN,
          adapters: [AdapterType.HUB, AdapterType.WORMHOLE_CCTP, AdapterType.CCIP_TOKEN],
          address: convertToGenericAddress("0x5425890298aed601595a70ab815c96711a31bc65" as EvmAddress, ChainType.EVM),
          decimals: 6,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.USDC,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.USDC],
        poolAddress: convertToGenericAddress("0xabDB5bf380C9612A963c6281aaf2B32e5700AabD" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.AVAX]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.AVAX,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.AVAX],
        poolAddress: convertToGenericAddress("0x8fBC1A733C194feA513de2B84BFd44A515EB7367" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.ETH_eth_sep]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.ETH_eth_sep,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.ETH_eth_sep],
        poolAddress: convertToGenericAddress("0x38e23bb3Bc24EC29c5cF605e332Dba50E5681cA5" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.ETH_base_sep]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.ETH_base_sep,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.ETH_base_sep],
        poolAddress: convertToGenericAddress("0x54Fc7d6f8e7A102b3e68F87db3A7f0402CC7CA13" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.ETH_arb_sep]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.ETH_arb_sep,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.ETH_arb_sep],
        poolAddress: convertToGenericAddress("0x7Df6D239F6D5B85BBd82014C9076f0DbcaBc4b3A" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.LINK_eth_sep]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.LINK_eth_sep,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.LINK_eth_sep],
        poolAddress: convertToGenericAddress("0xCc11Ef749baB6a1FD10fEE0a2502C3aF6b38E9BC" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.BNB]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.BNB,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.BNB],
        poolAddress: convertToGenericAddress("0x424E02262874AD74562B08487628093b0456Ac9E" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.CCIP_BnM]: {
        token: {
          type: TokenType.CROSS_CHAIN,
          adapters: [AdapterType.HUB, AdapterType.CCIP_TOKEN],
          address: convertToGenericAddress("0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4" as EvmAddress, ChainType.EVM),
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.CCIP_BnM,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.CCIP_BnM],
        poolAddress: convertToGenericAddress("0x99A15c2529ba1020814E9601F3CcAcC413747935" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.MON]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.MON,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.MON],
        poolAddress: convertToGenericAddress("0x48808cE8cC5c252d095E9D7b9c6c12FE181d835F" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.sMON]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.sMON,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.sMON],
        poolAddress: convertToGenericAddress("0xbaEe7dD681BF1652171ebEE4c96da78407922209" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.aprMON]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.aprMON,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.aprMON],
        poolAddress: convertToGenericAddress("0x6B5a247C436DfA5b5e0b22C83EFc709672C7B337" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.gMON]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.gMON,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.gMON],
        poolAddress: convertToGenericAddress("0x503EDEc647AfddDC8E1D7DE13780db9B1388a4Fc" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.shMON]: {
        token: {
          type: TokenType.ERC20,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.shMON,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.shMON],
        poolAddress: convertToGenericAddress("0xF494F0Ba4e447a5FCaEacB459Cbd8cBD2F94a9Ac" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
      [TESTNET_FOLKS_TOKEN_ID.SEI]: {
        token: {
          type: TokenType.NATIVE,
          decimals: 18,
        },
        folksTokenId: TESTNET_FOLKS_TOKEN_ID.SEI,
        poolId: TESTNET_POOLS[TESTNET_FOLKS_TOKEN_ID.SEI],
        poolAddress: convertToGenericAddress("0xEd66322A34D7Cf868149e80Fa38ea585d6C5A11f" as EvmAddress, ChainType.EVM),
        supportedLoanTypes: new Set([TESTNET_LOAN_TYPE_ID.DEPOSIT, TESTNET_LOAN_TYPE_ID.GENERAL]),
      },
    } satisfies Record<TestnetFolksTokenId, HubTokenData>,
    rewards: {
      bridgeRouterAddress: convertToGenericAddress(
        "0xD420eb040341889Be798b417A8ffb4CfAD3b1E9B" as EvmAddress,
        ChainType.EVM,
      ),
      adapters: {
        [AdapterType.HUB]: convertToGenericAddress(
          "0x2D3Ed308f03c1703261fDF9EB63f8232eef7952f" as EvmAddress,
          ChainType.EVM,
        ),
        [AdapterType.WORMHOLE_DATA]: convertToGenericAddress(
          "0x73FC90E2cEcED235D23C8B54d17Ba54d8516d689" as EvmAddress,
          ChainType.EVM,
        ),
        [AdapterType.CCIP_DATA]: convertToGenericAddress(
          "0x5c9d6C2202F214f3f8B879eaE3e16C6675338D4E" as EvmAddress,
          ChainType.EVM,
        ),
      },
      [REWARDS_TYPE.V1]: {
        hubAddress: convertToGenericAddress("0xB8Aa9782d5922B00fC63e7def85F276059B4aCd0" as EvmAddress, ChainType.EVM),
      },
      [REWARDS_TYPE.V2]: {
        hubAddress: convertToGenericAddress("0xD962d5198A170bAf75da57C7C408e6EE7d912086" as EvmAddress, ChainType.EVM),
        spokeManagerAddress: convertToGenericAddress(
          "0x9c78F1c73B3C21917624e0e6e78bB37bf0b8Ce91" as EvmAddress,
          ChainType.EVM,
        ),
        tokens: {
          [TESTNET_REWARDS_TOKEN_ID.AVAX]: {
            rewardTokenId: TESTNET_REWARDS_TOKEN_ID.AVAX,
            nodeId: "0x7c670cba5237644f0184621fd144be32dcb5a0de5f38117d2ed81109becf6261" as NodeId,
            token: {
              type: TokenType.NATIVE,
              decimals: 18,
            },
          },
          [TESTNET_REWARDS_TOKEN_ID.USDC_base_sep]: {
            rewardTokenId: TESTNET_REWARDS_TOKEN_ID.USDC_base_sep,
            nodeId: "0xd439d505b6141ad27963114eab223318945f1f6e79176d2fc129e811576e8a5a" as NodeId,
            token: {
              type: TokenType.ERC20,
              decimals: 6,
            },
          },
        } satisfies Record<TestnetRewardsTokenId, HubRewardTokenData>,
      },
    },
  },
};
