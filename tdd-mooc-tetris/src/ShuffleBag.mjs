export class ShuffleBag {
  constructor(items) {
    this.items = items;
  }

  next() {
    return this.items[0];
  }
}
