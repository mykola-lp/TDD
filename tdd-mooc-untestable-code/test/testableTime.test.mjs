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
});
