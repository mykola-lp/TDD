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

    const randomIndex = Math.floor(this.random() * items.length);
  
    const curr = items[0];
    items[0] = items[randomIndex];
    items[randomIndex] = curr;

    return items;
  }
}