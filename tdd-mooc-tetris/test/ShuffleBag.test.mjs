import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {
  test("returns an item from the bag", () => {
    const bag = new ShuffleBag(["I"]);
    expect(bag.next()).to.equal("I");
  });

  test("returns each item once before repeating", () => {
    const bag = new ShuffleBag(["I", "T"]);

    expect(bag.next()).to.equal("I");
    expect(bag.next()).to.equal("T");
  });

  test("starts over after all items are drawn", () => {
    const bag = new ShuffleBag(["I", "T"]);

    expect(bag.next()).to.equal("I");
    expect(bag.next()).to.equal("T");

    expect(bag.next()).to.equal("I");
    expect(bag.next()).to.equal("T");
  });
});
