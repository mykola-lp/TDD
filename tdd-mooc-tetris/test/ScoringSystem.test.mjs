import { describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("ScoringSystem", () => {

  test("starts with zero score", () => {
    expect(new ScoringSystem().score).to.equal(0);
  });

  test("adds points for one cleared line", () => {
    const scoring = new ScoringSystem();

    scoring.linesCleared(1);

    expect(scoring.score).to.equal(40);
  });

  test("awards more points for two lines than one", () => {
    const scoring = new ScoringSystem();

    scoring.linesCleared(2);

    expect(scoring.score).to.equal(100);
  });
});
