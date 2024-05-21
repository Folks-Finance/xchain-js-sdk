import { FolksHubAccount } from "../../chains/evm/hub/modules/index.js";
import { FolksEvmAccount } from "../../chains/evm/spoke/modules/index.js";
import { ChainType } from "../../common/types/chain.js";
import { assertAdapterSupportsDataMessage } from "../../common/utils/adapter.js";
import { assertSpokeChainSupported } from "../../common/utils/chain.js";
import { exhaustiveCheck } from "../../utils/exhaustive-check.js";
import { FolksCore } from "../core/folks-core.js";

import type { FolksChainId } from "../../common/types/chain.js";
import type { MessageAdapters } from "../../common/types/message.js";
import type {
  PrepareCreateAccountCall,
  PrepareInviteAddressCall,
  PrepareAcceptInviteAddressCall,
  PrepareUnregisterAddressCall,
} from "../../common/types/module.js";
import type { Address, Hex } from "viem";

export const prepare = {
  async createAccount(accountId: Hex, adapters: MessageAdapters) {
    const folksChain = FolksCore.getSelectedFolksChain();

    // check adapters are compatible
    assertAdapterSupportsDataMessage(
      folksChain.folksChainId,
      adapters.adapterId,
    );

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.prepare.createAccount(
          folksChain.folksChainId,
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          folksChain.network,
          accountId,
          adapters,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async inviteAddress(
    accountId: Hex,
    folksChainIdToInvite: FolksChainId,
    addressToInvite: Address,
    adapters: MessageAdapters,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();

    // check adapters are compatible
    assertAdapterSupportsDataMessage(
      folksChain.folksChainId,
      adapters.adapterId,
    );

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.prepare.inviteAddress(
          folksChain.folksChainId,
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          folksChain.network,
          accountId,
          folksChainIdToInvite,
          addressToInvite,
          adapters,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async acceptInvite(accountId: Hex, adapters: MessageAdapters) {
    const folksChain = FolksCore.getSelectedFolksChain();

    // check adapters are compatible
    assertAdapterSupportsDataMessage(
      folksChain.folksChainId,
      adapters.adapterId,
    );

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.prepare.acceptInvite(
          folksChain.folksChainId,
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          folksChain.network,
          accountId,
          adapters,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async unregisterAddress(
    accountId: Hex,
    folksChainIdToUnregister: FolksChainId,
    adapters: MessageAdapters,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();

    // check adapters are compatible
    assertAdapterSupportsDataMessage(
      folksChain.folksChainId,
      adapters.adapterId,
    );

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.prepare.unregisterAddress(
          folksChain.folksChainId,
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          folksChain.network,
          accountId,
          folksChainIdToUnregister,
          adapters,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },
};

export const write = {
  async createAccount(accountId: Hex, prepareCall: PrepareCreateAccountCall) {
    const folksChain = FolksCore.getSelectedFolksChain();

    assertSpokeChainSupported(folksChain.folksChainId, folksChain.network);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.write.createAccount(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          FolksCore.getSigner<ChainType.EVM>(),
          accountId,
          prepareCall,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async inviteAddress(
    accountId: Hex,
    folksChainIdToInvite: number,
    addressToInvite: Address,
    prepareCall: PrepareInviteAddressCall,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();

    assertSpokeChainSupported(folksChain.folksChainId, folksChain.network);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.write.inviteAddress(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          FolksCore.getSigner<ChainType.EVM>(),
          accountId,
          folksChainIdToInvite,
          addressToInvite,
          prepareCall,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async acceptInvite(
    accountId: Hex,
    prepareCall: PrepareAcceptInviteAddressCall,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();

    assertSpokeChainSupported(folksChain.folksChainId, folksChain.network);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.write.acceptInvite(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          FolksCore.getSigner<ChainType.EVM>(),
          accountId,
          prepareCall,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },

  async unregisterAddress(
    accountId: Hex,
    folksChainIdToUnregister: FolksChainId,
    prepareCall: PrepareUnregisterAddressCall,
  ) {
    const folksChain = FolksCore.getSelectedFolksChain();

    assertSpokeChainSupported(folksChain.folksChainId, folksChain.network);

    switch (folksChain.chainType) {
      case ChainType.EVM:
        return await FolksEvmAccount.write.unregisterAddress(
          FolksCore.getProvider<ChainType.EVM>(folksChain.folksChainId),
          FolksCore.getSigner<ChainType.EVM>(),
          accountId,
          folksChainIdToUnregister,
          prepareCall,
        );
      default:
        return exhaustiveCheck(folksChain.chainType);
    }
  },
};

export const read = {
  async accountInfo(accountId: Hex, folksChainIds?: Array<FolksChainId>) {
    return FolksHubAccount.getAccountInfo(
      FolksCore.getHubProvider(),
      FolksCore.getSelectedNetwork(),
      accountId,
      folksChainIds,
    );
  },
};
