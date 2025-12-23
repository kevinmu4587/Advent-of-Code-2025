import { describe, it, expect } from "vitest";
import {
  roundUpToEvenDigits,
  roundDownToEvenDigits,
  isInvalidNumber,
} from "../invalid-code-finder";

describe("invalid-code-finder", () => {
  describe("roundUpToEvenDigits", () => {
    it("should round up to even digits", () => {
      // Add your test cases here
      expect(roundUpToEvenDigits(9)).toBe(10);
      expect(roundUpToEvenDigits(0)).toBe(10);
      expect(roundUpToEvenDigits(10)).toBe(10);
      expect(roundUpToEvenDigits(999)).toBe(1000);
      expect(roundUpToEvenDigits(763)).toBe(1000);
      expect(roundUpToEvenDigits(100)).toBe(1000);
      expect(roundUpToEvenDigits(1000)).toBe(1000);
    });
  });

  describe("roundDownToEvenDigits", () => {
    it("should round down to even digits", () => {
      expect(roundDownToEvenDigits(0)).toBe(0);
      expect(roundDownToEvenDigits(9)).toBe(0);
      expect(roundDownToEvenDigits(123)).toBe(99);
      expect(roundDownToEvenDigits(12345)).toBe(9999);
      expect(roundDownToEvenDigits(96)).toBe(96);
      expect(roundDownToEvenDigits(100)).toBe(99);
    });
  });

  describe("isInvalidNumber", () => {
    it("should return true if the number is invalid", () => {
      expect(isInvalidNumber(11)).toBe(true);
      expect(isInvalidNumber(1212)).toBe(true);
      expect(isInvalidNumber(9999)).toBe(true);
      expect(isInvalidNumber(456456)).toBe(true);
      expect(isInvalidNumber(19501950)).toBe(true);
      expect(isInvalidNumber(19501950)).toBe(true);
      expect(isInvalidNumber(123)).toBe(false);
      expect(isInvalidNumber(1)).toBe(false);
      expect(isInvalidNumber(19531954)).toBe(false);
      expect(isInvalidNumber(123122)).toBe(false);
    });
  });
});
