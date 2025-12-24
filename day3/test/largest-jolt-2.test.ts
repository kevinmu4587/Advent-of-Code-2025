import { describe, it, expect } from "vitest";
import { findLargestJolts } from "../largest-jolt-2";

describe.only("largest-jolt-2", () => {
  describe("findLargestJolts", () => {
    it("should find the largest jolts", () => {
      expect(findLargestJolts("9876543211111111")).toEqual(987654321111);
      expect(findLargestJolts("12345678901234567890")).toEqual(901234567890);
    });
  });
});
