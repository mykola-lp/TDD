import { describe, test } from "vitest";
import { expect } from "chai";

import { daysUntilChristmas } from "../src/testableTime.mjs";

describe("Testable time: days until Christmas", () => {
  test("returns one day when today is December 24", () => {
    expect(daysUntilChristmas(new Date(2024, 11, 24))).to.equal(1);
  });

  test("returns 364 days when today is December 26 in a leap year", () => {
    expect(daysUntilChristmas(new Date(2024, 11, 26))).to.equal(364);
  });

  test("returns zero when today is Christmas Day", () => {
    expect(daysUntilChristmas(new Date(2024, 11, 25))).to.equal(0);
  });

  test("returns 365 days when today is December 26 before a leap year", () => {
    expect(daysUntilChristmas(new Date(2023, 11, 26))).to.equal(365);
  });

  test("returns 359 days when today is January 1 in a leap year", () => {
    expect(daysUntilChristmas(new Date(2024, 0, 1))).to.equal(359);
  });

  test("returns 364 days when today is December 26 in a non-leap year", () => {
    expect(daysUntilChristmas(new Date(2025, 11, 26))).to.equal(364);
  });

  test("returns 360 days when today is December 31 before a leap year", () => {
    expect(daysUntilChristmas(new Date(2023, 11, 31))).to.equal(360);
  });
});
