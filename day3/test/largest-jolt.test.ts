import { describe, it, expect } from "vitest";
import { findLargestJolts } from "../largest-jolt";

describe.only("invalid-code-finder-2", () => {
  describe("findLargestJolts", () => {
    it("should return the largest jolts", () => {
      expect(findLargestJolts("911118")).toEqual(98);
      expect(findLargestJolts("9111189")).toEqual(99);
      expect(findLargestJolts("56")).toEqual(56);
      expect(findLargestJolts("567")).toEqual(67);
      expect(findLargestJolts("123456789")).toEqual(89);
      expect(findLargestJolts("987654321")).toEqual(98);
      expect(findLargestJolts("24642")).toEqual(64);
      expect(findLargestJolts("818181911112111")).toEqual(92);
    });
  });
});
