export class ShuffleBag {
  constructor(items) {
    this.original = items;
    this.items = [...items];
  }

  next() {
    if (this.items.length === 0) {
      this.items = [...this.original];
    }

    return this.items.shift();
  }
}