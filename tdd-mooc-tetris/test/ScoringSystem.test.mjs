import { describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("ScoringSystem", () => {
  test("starts with zero score", () => {
    expect(new ScoringSystem().score).to.equal(0);
  });
});
