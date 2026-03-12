import { size, sliceHex } from "viem";

import type { Hex } from "viem";

export function safeSliceHex(hex: Hex, start: number, end?: number): Hex {
  if (size(hex) === start) return "0x";
  return sliceHex(hex, start, end);
}
