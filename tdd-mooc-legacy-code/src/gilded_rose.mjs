const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASSES_NAME = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS_NAME = "Sulfuras, Hand of Ragnaros";

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
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name != AGED_BRIE_NAME && item.name != BACKSTAGE_PASSES_NAME) {
        if (item.quality > 0) {
          if (item.name != SULFURAS_NAME) {
            item.quality -= 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;

          if (item.name == BACKSTAGE_PASSES_NAME) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != SULFURAS_NAME) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE_NAME) {
          if (item.name != BACKSTAGE_PASSES_NAME) {
            if (item.quality > 0) {
              if (item.name != SULFURAS_NAME) {
                item.quality -= 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
