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
    return [...items];
  }
}