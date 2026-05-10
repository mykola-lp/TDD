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
    const bag = new ShuffleBag(["I", "T"], () => 0);

    const firstRound = [bag.next(), bag.next()];
    const secondRound = [bag.next(), bag.next()];

    expect(firstRound.slice().sort()).to.deep.equal(["I", "T"]);
    expect(secondRound.slice().sort()).to.deep.equal(["I", "T"]);
  });

  test("supports duplicate items", () => {
    const bag = new ShuffleBag(["I", "I", "T"]);
    const drawn = [bag.next(), bag.next(), bag.next()];

    expect(drawn.slice().sort()).to.deep.equal(["I", "I", "T"]);
  });

  test("draws all items in shuffled order", () => {
    const bag = new ShuffleBag(["I", "T", "L"], () => 0);
    const drawn = [bag.next(), bag.next(), bag.next()];

    expect(drawn.slice().sort()).to.deep.equal(["I", "L", "T"]);
  });
});
