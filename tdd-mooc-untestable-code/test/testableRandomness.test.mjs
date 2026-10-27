import { describe, test } from "vitest";
import { expect } from "chai";

import { diceHandValue } from "../src/testableRandomness.mjs";

describe("Testable randomness: dice hand value", () => {
  test("returns 104 when both dice show four", () => {
    expect(diceHandValue(4, 4)).to.equal(104);
  });

  test("returns the higher die when dice differ", () => {
    expect(diceHandValue(2, 5)).to.equal(5);
  });
});
