import type { NonEmptyArray } from "../types/generics.js";

export const intersect =
  <T>(arr: Array<T>) =>
  (x: T) =>
    arr.includes(x);

export const ensureNonEmpty = <T>(arr: Array<T>, errMsg?: string): NonEmptyArray<T> => {
  if (arr.length === 0) throw new Error(errMsg ?? "Array cannot be empty");
  return arr as NonEmptyArray<T>;
};
