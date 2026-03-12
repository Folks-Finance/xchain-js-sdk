import { AdapterType } from "../types/message.js";

export const DATA_ADAPTERS = [AdapterType.HUB, AdapterType.CCIP_DATA, AdapterType.WORMHOLE_EXECUTOR_DATA] as const;
