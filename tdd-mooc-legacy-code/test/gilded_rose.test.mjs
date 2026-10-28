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
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(12);
  });

  test("drops backstage passes quality to zero after the concert", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("does not decrease quality below zero", () => {
    const gildedRose = new Shop([new Item("foo", 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0);
  });

  test("does not change Sulfuras", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(80);
  });

  test("does not increase backstage passes quality above 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
  });

  test("does not increase Aged Brie quality above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
  });

  test("increases backstage passes quality by 1 when sellIn is 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(11);
  });

  test("does not increase backstage passes quality above 50 with bonuses", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
  });

  test("increases backstage passes quality by 2 when sellIn is 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(12);
  });

  test("increases backstage passes quality by 3 within 5 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(13);
  });
});
