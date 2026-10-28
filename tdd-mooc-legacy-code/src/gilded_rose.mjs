const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASSES_NAME = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS_NAME = "Sulfuras, Hand of Ragnaros";

const MAX_QUALITY = 50;

function decreaseQuality(item) {
  if (item.quality > 0) {
    if (item.name != SULFURAS_NAME) {
      item.quality -= 1;
    }
  }
}

function decreaseSellIn(item) {
  if (item.name != SULFURAS_NAME) {
    item.sellIn -= 1;
  }
}

function increaseQualityIfBelowMaximum(item) {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1;
  }
}

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name != AGED_BRIE_NAME && item.name != BACKSTAGE_PASSES_NAME) {
        decreaseQuality(item);
      } else {
        increaseQualityIfBelowMaximum(item);

        if (item.name == BACKSTAGE_PASSES_NAME) {
          if (item.sellIn < 11) {
            increaseQualityIfBelowMaximum(item);
          }

          if (item.sellIn < 6) {
            increaseQualityIfBelowMaximum(item);
          }
        }
      }
      decreaseSellIn(item);

      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE_NAME) {
          if (item.name != BACKSTAGE_PASSES_NAME) {
            decreaseQuality(item);
          } else {
            item.quality = 0;
          }
        } else {
          increaseQualityIfBelowMaximum(item);
        }
      }
    }

    return this.items;
  }
}
