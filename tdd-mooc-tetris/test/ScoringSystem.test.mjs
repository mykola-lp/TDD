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

  test("accumulates score across multiple clears", () => {
    const scoring = new ScoringSystem();

    scoring.linesCleared(1);
    scoring.linesCleared(2);

    expect(scoring.score).to.equal(140);
  });

  test("awards points for clearing three lines", () => {
    const scoring = new ScoringSystem();

    scoring.linesCleared(3);

    expect(scoring.score).to.equal(300);
  });

  test("awards points for clearing four lines", () => {
    const scoring = new ScoringSystem();

    scoring.linesCleared(4);

    expect(scoring.score).to.equal(1200);
  });

  test("starts at level one", () => {
    expect(new ScoringSystem().level).to.equal(1);
  });

  test("reaches level two after clearing ten lines", () => {
    const scoring = new ScoringSystem();

    for (let i = 0; i < 10; i++) {
      scoring.linesCleared(1);
    }

    expect(scoring.level).to.equal(2);
  });

  test("awards more points at level two", () => {
    const scoring = new ScoringSystem();

    for (let i = 0; i < 10; i++) {
      scoring.linesCleared(1);
    }

    scoring.linesCleared(1);

    expect(scoring.score).to.equal(480);
  });

  test("reaches level five after clearing forty lines", () => {
    const scoring = new ScoringSystem();

    for (let i = 0; i < 10; i++) {
        scoring.linesCleared(4);
    }

    expect(scoring.level).to.equal(5);
  });
});
