import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

function simulateLineClears(scoring, linesPerClear, times = 10) {
  for (let i = 0; i < times; i++) {
    scoring.linesCleared(linesPerClear);
  }
}

describe("ScoringSystem", () => {
  let scoring;

  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("starts with zero score", () => {
    expect(new ScoringSystem().score).to.equal(0);
  });

  test("adds points for one cleared line", () => {
    scoring.linesCleared(1);
    expect(scoring.score).to.equal(40);
  });

  test("awards more points for two lines than one", () => {
    scoring.linesCleared(2);
    expect(scoring.score).to.equal(100);
  });

  test("accumulates score across multiple clears", () => {
    scoring.linesCleared(1);
    scoring.linesCleared(2);

    expect(scoring.score).to.equal(140);
  });

  test("awards points for clearing three lines", () => {
    scoring.linesCleared(3);
    expect(scoring.score).to.equal(300);
  });

  test("awards points for clearing four lines", () => {
    scoring.linesCleared(4);
    expect(scoring.score).to.equal(1200);
  });

  test("starts at level one", () => {
    expect(new ScoringSystem().level).to.equal(1);
  });

  test("reaches level two after clearing ten lines", () => {
    for (let i = 0; i < 10; i++) {
      scoring.linesCleared(1);
    }

    expect(scoring.level).to.equal(2);
  });

  test("awards more points at level two", () => {
    for (let i = 0; i < 10; i++) {
      scoring.linesCleared(1);
    }

    scoring.linesCleared(1);

    expect(scoring.score).to.equal(480);
  });

  test("reaches level five after clearing forty lines", () => {
    for (let i = 0; i < 10; i++) {
        scoring.linesCleared(4);
    }

    expect(scoring.level).to.equal(5);
  });

  test("awards Nintendo points at level five", () => {
    for (let i = 0; i < 10; i++) {
        scoring.linesCleared(4);
    }

    const previousScore = scoring.score;
    scoring.linesCleared(4);

    expect(scoring.score - previousScore).to.equal(6000);
  });
});
