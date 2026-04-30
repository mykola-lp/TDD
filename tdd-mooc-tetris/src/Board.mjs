export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(symbol) {
    this.symbol = symbol;
    this.x = 1;
    this.y = 0;
  }

  tick() {
    this.y += 1;
  }

  toString() {
    let res = "";

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (x === this.x && y === this.y) {
          res += this.symbol;
        } else {
          res += ".";
        }
      }
      res += "\n";
    }

    return res;
  }
}
