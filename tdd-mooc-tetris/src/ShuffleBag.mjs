export class ShuffleBag {
  constructor(items, random = Math.random) {
    this.original = items;
    this.random = random;
    this.items = [...items];
  }

  next() {
    if (this.items.length === 0) {
      this.items = this.shuffle(this.original);
    }

    return this.items.shift();
  }

  shuffle(items) {
    items = [...items];

    const random = this.randomIndex(items.length);
  
    const curr = items[0];
    items[0] = items[random];
    items[random] = curr;

    return items;
  }

  randomIndex(length) {
    return Math.floor(this.random() * length);
  }
}