import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

function createBag(items, random = Math.random) {
  return new ShuffleBag(items, random);
}

describe("ShuffleBag", () => {
  test("returns an item from the bag", () => {
    const bag = createBag(["I"]);
    expect(bag.next()).to.equal("I");
  });

  test("returns each item once before repeating", () => {
    const bag = createBag(["I", "T"]);

    expect(bag.next()).to.equal("I");
    expect(bag.next()).to.equal("T");
  });

  test("starts over after all items are drawn", () => {
    const bag = createBag(["I", "T"], () => 0);

    const firstRound = [bag.next(), bag.next()];
    const secondRound = [bag.next(), bag.next()];

    expect(firstRound.slice().sort()).to.deep.equal(["I", "T"]);
    expect(secondRound.slice().sort()).to.deep.equal(["I", "T"]);
  });

  test("supports duplicate items", () => {
    const bag = createBag(["I", "I", "T"]);
    const drawn = [bag.next(), bag.next(), bag.next()];

    expect(drawn.slice().sort()).to.deep.equal(["I", "I", "T"]);
  });

  test("draws all items in shuffled order", () => {
    const bag = createBag(["I", "T", "L"], () => 0);
    const drawn = [bag.next(), bag.next(), bag.next()];

    expect(drawn.slice().sort()).to.deep.equal(["I", "L", "T"]);
  });
});
