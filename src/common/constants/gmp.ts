import { ChainType, NetworkType } from "../types/chain.js";
import { convertToGenericAddress } from "../utils/address.js";

import { FOLKS_CHAIN_ID } from "./chain.js";

import type { EvmAddress } from "../types/address.js";
import type { FolksChainId } from "../types/chain.js";
import type { CCIPData, WormholeData, MockWormholeGuardiansData } from "../types/gmp.js";

export const MOCK_WORMHOLE_GUARDIANS_DATA: Record<NetworkType, MockWormholeGuardiansData> = {
  [NetworkType.MAINNET]: {
    guardianSetIndex: 0,
    guardiansSetLength: 1,
    mnemonic: "future orbit lunar kingdom solar fossil invest noble arena network crystal energy",
    address: "0x1D1846C5abcd6D6E798Aae33c2E3A6fa50F52098" as EvmAddress,
  },
  [NetworkType.TESTNET]: {
    guardianSetIndex: 0,
    guardiansSetLength: 1,
    mnemonic: "future orbit lunar kingdom solar fossil invest noble arena network crystal energy",
    address: "0x1D1846C5abcd6D6E798Aae33c2E3A6fa50F52098" as EvmAddress,
  },
};

export const WORMHOLE_EXECUTOR_CAPABILITIES_URL: Record<NetworkType, string> = {
  MAINNET: "https://executor.labsapis.com/v0/capabilities",
  TESTNET: "https://executor-testnet.labsapis.com/v0/capabilities",
};

export const REQUEST_PREFIX = {
  VAA_V1: "ERV1",
};

export const WORMHOLE_DATA: Record<FolksChainId, WormholeData> = {
  [FOLKS_CHAIN_ID.AVALANCHE]: {
    wormholeChainId: 6,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x54a8e5f9c4CbA08F9943965859F6c34eAF03E26c" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.ETHEREUM]: {
    wormholeChainId: 2,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.BASE]: {
    wormholeChainId: 30,
    wormholeRelayer: convertToGenericAddress("0x706f82e9bb5b0813501714ab5974216704980e31" as EvmAddress, ChainType.EVM),
    wormholeCore: "0xbebdb6C8ddC678FfA9f8748f85C815C556Dd8ac6" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.BSC]: {
    wormholeChainId: 4,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.ARBITRUM]: {
    wormholeChainId: 23,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0xa5f208e072434bC67592E4C49C1B991BA79BCA46" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.POLYGON]: {
    wormholeChainId: 5,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.SEI]: {
    wormholeChainId: 40,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0xCa1D5a146B03f6303baF59e5AD5615ae0b9d146D" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.MONAD]: {
    wormholeChainId: 48,
    wormholeRelayer: convertToGenericAddress("0x27428DD2d3DD32A4D7f7C497eAaa23130d894911" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x194B123c5E96B9b2E49763619985790Dc241CAC0" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.AVALANCHE_FUJI]: {
    wormholeChainId: 6,
    wormholeRelayer: convertToGenericAddress("0xA3cF45939bD6260bcFe3D66bc73d60f19e49a8BB" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x7bbcE28e64B3F8b84d876Ab298393c38ad7aac4C" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.ETHEREUM_SEPOLIA]: {
    wormholeChainId: 10002,
    wormholeRelayer: convertToGenericAddress("0x7B1bD7a6b4E61c2a123AC6BC2cbfC614437D0470" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.BASE_SEPOLIA]: {
    wormholeChainId: 10004,
    wormholeRelayer: convertToGenericAddress("0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x79A1027a6A159502049F10906D333EC57E95F083" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.BSC_TESTNET]: {
    wormholeChainId: 4,
    wormholeRelayer: convertToGenericAddress("0x80aC94316391752A193C1c47E27D382b507c93F3" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x68605AD7b15c732a30b1BbC62BE8F2A509D74b4D" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.ARBITRUM_SEPOLIA]: {
    wormholeChainId: 10003,
    wormholeRelayer: convertToGenericAddress("0x7B1bD7a6b4E61c2a123AC6BC2cbfC614437D0470" as EvmAddress, ChainType.EVM),
    wormholeCore: "0x6b9C8671cdDC8dEab9c719bB87cBd3e782bA6a35" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.MONAD_TESTNET]: {
    wormholeChainId: 48,
    wormholeRelayer: convertToGenericAddress("0x362fca37E45fe1096b42021b543f462D49a5C8df" as EvmAddress, ChainType.EVM),
    wormholeCore: "0xBB73cB66C26740F31d1FabDC6b7A46a038A300dd" as EvmAddress,
  },
  [FOLKS_CHAIN_ID.SEI_TESTNET]: {
    wormholeChainId: 40,
    wormholeRelayer: convertToGenericAddress("0x362fca37E45fe1096b42021b543f462D49a5C8df" as EvmAddress, ChainType.EVM),
    wormholeCore: "0xBB73cB66C26740F31d1FabDC6b7A46a038A300dd" as EvmAddress,
  },
};

export const CCIP_DATA: Record<FolksChainId, CCIPData> = {
  [FOLKS_CHAIN_ID.AVALANCHE]: {
    ccipChainId: BigInt("6433500567565415381"),
    ccipRouter: convertToGenericAddress("0xF4c7E640EdA248ef95972845a62bdC74237805dB" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.ETHEREUM]: {
    ccipChainId: BigInt("5009297550715157269"),
    ccipRouter: convertToGenericAddress("0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.BASE]: {
    ccipChainId: BigInt("15971525489660198786"),
    ccipRouter: convertToGenericAddress("0x881e3A65B4d4a04dD529061dd0071cf975F58bCD" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.BSC]: {
    ccipChainId: BigInt("11344663589394136015"),
    ccipRouter: convertToGenericAddress("0x34B03Cb9086d7D758AC55af71584F81A598759FE" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.ARBITRUM]: {
    ccipChainId: BigInt("4949039107694359620"),
    ccipRouter: convertToGenericAddress("0x141fa059441E0ca23ce184B6A78bafD2A517DdE8" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.POLYGON]: {
    ccipChainId: BigInt("4051577828743386545"),
    ccipRouter: convertToGenericAddress("0x849c5ED5a80F5B408Dd4969b78c2C8fdf0565Bfe" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.SEI]: {
    ccipChainId: BigInt("9027416829622342829"),
    ccipRouter: convertToGenericAddress("0xAba60dA7E88F7E8f5868C2B6dE06CB759d693af0" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.MONAD]: {
    ccipChainId: BigInt("8481857512324358265"),
    ccipRouter: convertToGenericAddress("0x33566fE5976AAa420F3d5C64996641Fc3858CaDB" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.AVALANCHE_FUJI]: {
    ccipChainId: BigInt("14767482510784806043"),
    ccipRouter: convertToGenericAddress("0xF694E193200268f9a4868e4Aa017A0118C9a8177" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.ETHEREUM_SEPOLIA]: {
    ccipChainId: BigInt("16015286601757825753"),
    ccipRouter: convertToGenericAddress("0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.BASE_SEPOLIA]: {
    ccipChainId: BigInt("10344971235874465080"),
    ccipRouter: convertToGenericAddress("0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.BSC_TESTNET]: {
    ccipChainId: BigInt("13264668187771770619"),
    ccipRouter: convertToGenericAddress("0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.ARBITRUM_SEPOLIA]: {
    ccipChainId: BigInt("3478487238524512106"),
    ccipRouter: convertToGenericAddress("0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.MONAD_TESTNET]: {
    ccipChainId: BigInt("2183018362218727504"),
    ccipRouter: convertToGenericAddress("0x5f16e51e3Dcb255480F090157DD01bA962a53E54" as EvmAddress, ChainType.EVM),
  },
  [FOLKS_CHAIN_ID.SEI_TESTNET]: {
    ccipChainId: BigInt("1216300075444106652"),
    ccipRouter: convertToGenericAddress("0x59F5222c5d77f8D3F56e34Ff7E75A05d2cF3a98A" as EvmAddress, ChainType.EVM),
  },
};
