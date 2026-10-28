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

  test("decreases quality twice after sell-by date", () => {
    const gildedRose = new Shop([new Item("foo", 0, 2)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("increases quality of Aged Brie", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(11);
  });

  test("increases backstage passes quality by 2 within 10 days", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(12);
  });

  test("drops backstage passes quality to zero after the concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });
});
