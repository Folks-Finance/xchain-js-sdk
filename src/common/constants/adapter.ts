import { AdapterType } from "../types/message.js";

export const DATA_ADAPTERS = [AdapterType.HUB, AdapterType.WORMHOLE_DATA, AdapterType.CCIP_DATA] as const;
