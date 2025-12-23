import { describe, it, expect } from "vitest";
import { getFactors, isInvalidNumber, splitIntoSizeChunks } from "../invalid-code-finder-2";

describe.only("invalid-code-finder-2", () => {
  describe("getFactors", () => {
    it("should return factors of the number", () => {
      expect(getFactors(12)).toEqual([1, 2, 3, 4, 6]);
      expect(getFactors(1)).toEqual([]);
      expect(getFactors(9)).toEqual([1, 3]);
    });
  });

  describe("isInvalidNumber", () => {
    it("should return true if the number is invalid", () => {
      expect(isInvalidNumber(12)).toBe(false);
      expect(isInvalidNumber(1)).toBe(false);
      expect(isInvalidNumber(11)).toBe(true);
      expect(isInvalidNumber(1010)).toBe(true);
      expect(isInvalidNumber(19501950)).toBe(true);
      expect(isInvalidNumber(195019501950)).toBe(true);
      expect(isInvalidNumber(1111111111111)).toBe(true);
      expect(isInvalidNumber(99999999)).toBe(true);
      expect(isInvalidNumber(1717171717)).toBe(true);
      expect(isInvalidNumber(123122)).toBe(false);
      expect(isInvalidNumber(19551955195519)).toBe(false);
      expect(isInvalidNumber(121314151617)).toBe(false);
      expect(isInvalidNumber(12345676)).toBe(false);
      expect(isInvalidNumber(1231212312312312121)).toBe(false);
    });
  });

  describe("splitIntoSizeChunks", () => {
    it("should split the string into chunks of the given size", () => {
      expect(splitIntoSizeChunks("123456789", 3)).toEqual(["123", "456", "789"]);
      expect(splitIntoSizeChunks("123456789", 1)).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
      expect(splitIntoSizeChunks("1234567890", 2)).toEqual(["12", "34", "56", "78", "90"]);
      expect(splitIntoSizeChunks("19501950", 4)).toEqual(["1950", "1950"]);
    });
  });
});
