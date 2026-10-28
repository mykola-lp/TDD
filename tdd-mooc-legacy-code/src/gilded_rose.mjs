const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASSES_NAME = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS_NAME = "Sulfuras, Hand of Ragnaros";
const CONJURED_PREFIX = "Conjured ";

const MAX_QUALITY = 50;

function decreaseQuality(item) {
  if (item.name == SULFURAS_NAME) {
    return;
  }

  let qualityDecrease = 1;

  if (item.name.startsWith(CONJURED_PREFIX)) {
    qualityDecrease = 2;
  }

  const updatedQuality = item.quality - qualityDecrease;
  item.quality = Math.max(0, updatedQuality);
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

function updateQualityAfterSellByDate(item) {
  if (item.name == AGED_BRIE_NAME) {
    increaseQualityIfBelowMaximum(item);
    return;
  }

  if (item.name == BACKSTAGE_PASSES_NAME) {
    item.quality = 0;
    return;
  }

  decreaseQuality(item);
}

function updateBackstagePassQuality(item) {
  increaseQualityIfBelowMaximum(item);

  if (item.sellIn < 11) {
    increaseQualityIfBelowMaximum(item);
  }

  if (item.sellIn < 6) {
    increaseQualityIfBelowMaximum(item);
  }
}

function updateQualityBeforeSellByDate(item) {
  if (item.name == BACKSTAGE_PASSES_NAME) {
    updateBackstagePassQuality(item);
    return;
  }

  if (item.name == AGED_BRIE_NAME) {
    increaseQualityIfBelowMaximum(item);
    return;
  }

  decreaseQuality(item);
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
      updateQualityBeforeSellByDate(item);
      decreaseSellIn(item);

      if (item.sellIn < 0) {
        updateQualityAfterSellByDate(item);
      }
    }

    return this.items;
  }
}
