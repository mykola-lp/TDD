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

    this.currentBlock = block;
    this.x = Math.floor((this.width - this.getWidth(block)) / 2);
    this.y = 0;
    this.falling = true;
  }

  tick() {
    if (!this.falling) return;

    const blockHeight = this.getHeight(this.currentBlock);
    const bottomY = this.y + blockHeight;

    const hitsLandedBlock = this.wouldHitLandedBlock();

    if (bottomY < this.height && !hitsLandedBlock) {
      this.y += 1;
    } else if (bottomY === this.height) {
      this.landedBlock = this.currentBlock;
      this.landedX = this.x;
      this.landedY = this.y;
      this.falling = false;
    } else {
      this.falling = false;
    }
  }

  moveDown() {
    this.tick();
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    let res = "";
    const currentRows = this.getRows(this.currentBlock);
    const landedRows = this.getRows(this.landedBlock);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const current = this.getCell(currentRows, this.x, this.y, x, y);
        const landed = this.getCell(landedRows, this.landedX, this.landedY, x, y);

        if (current !== ".") {
          res += current;
        } else if (landed !== ".") {
          res += landed;
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

  getCell(rows, blockX, blockY, x, y) {
    const rowIndex = y - blockY;
    const columnIndex = x - blockX;

    if (rowIndex < 0 || columnIndex < 0) return ".";
  
    const row = rows[rowIndex];
    if (!row) return ".";

    const cell = row[columnIndex];
    if (!cell) return ".";

    return cell;
  }

  getWidth(block) {
    const rows = this.getRows(block);
  
    if (rows.length === 0) return 0;

    return rows[0].length;
  }

  getHeight(block) {
    const rows = this.getRows(block);
  
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i] !== ".".repeat(rows[i].length)) {
        return i + 1;
      }
    }
  
    return 0;
  }

  wouldHitLandedBlock() {
    const currentRows = this.getRows(this.currentBlock);
    const landedRows = this.getRows(this.landedBlock);
  
    for (let row = 0; row < currentRows.length; row++) {
      for (let column = 0; column < currentRows[row].length; column++) {
        const currentCell = currentRows[row][column];

        if (currentCell === ".") continue;

        const boardX = this.x + column;
        const boardY = this.y + 1 + row;

        const landedCell = this.getCell(landedRows, this.landedX, this.landedY, boardX, boardY);

        if (landedCell !== ".") return true;
      }
    }

    return false;
  }
}
