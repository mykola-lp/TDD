import { describe, test } from "vitest";
import { expect } from "chai";

import { daysUntilChristmas } from "../src/testableTime.mjs";

describe("Testable time: days until Christmas", () => {
  test("returns one day when today is December 24", () => {
    expect(daysUntilChristmas(new Date(2024, 11, 24))).to.equal(1);
  });
});
