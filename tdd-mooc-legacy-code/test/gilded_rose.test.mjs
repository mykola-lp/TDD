import { describe, test } from "vitest";
import { expect } from "chai";

import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("decreases quality and sellIn for a normal item", () => {
    const gildedRose = new Shop([new Item("foo", 1, 2)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);
  });
});
