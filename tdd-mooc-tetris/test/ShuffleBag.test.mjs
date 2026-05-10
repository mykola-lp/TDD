import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {
  test("returns an item from the bag", () => {
    const bag = new ShuffleBag(["I"]);
    expect(bag.next()).to.equal("I");
  });
});
