export class Board {
  width;
  height;

  landedBlock;
  landedX;
  landedY;

  falling = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    if (this.falling) {
      throw new Error("already falling");
    }

    const rows = this.getRows(block);

    this.currentBlock = block;
    this.x = Math.floor((this.width - rows[0].length) / 2);
    this.y = 0;
    this.falling = true;
  }

  tick() {
    if (!this.falling) return;

    if (this.y < this.height - 1 && !(this.x === this.landedX && this.y + 1 === this.landedY)) {
      this.y += 1;
    } else if (this.y === this.height - 1) {
      this.landedBlock = this.currentBlock;
      this.landedX = this.x;
      this.landedY = this.y;
      this.falling = false;
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
          res += this.currentBlock;
        } else if (x === this.landedX && y === this.landedY) {
          res += this.landedBlock;
        } else {
          res += ".";
        }
      }
      res += "\n";
    }

    return res;
  }

  getRows(block) {
    if (!block) return [];
    const text = block.toString().trim();
    const lines = text.split("\n");
    const rows = [];
    for (const line of lines) {
      rows.push(line.trim());
    }
    return rows;
  }
}
