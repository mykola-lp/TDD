export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let res = "";

    for (let i = 0; i < this.height; i++) {
      res += ".".repeat(this.width);
      res += "\n";
    }

    return res;
  }
}
