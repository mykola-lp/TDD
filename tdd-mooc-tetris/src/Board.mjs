export class Board {
  width;
  height;
  falling = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(symbol) {
    if (this.falling) {
      throw new Error("already falling");
    }

    this.symbol = symbol;
    this.x = 1;
    this.y = 0;
    this.falling = true;
  }

  tick() {
    if (!this.falling) return;
    if (this.y < this.height - 1) {
      this.y += 1;
    } else {
      this.falling = false;
    }
  }

  hasFalling() {
    return this.falling;
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
