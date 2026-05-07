export class Board {
  // TODO: Move block geometry logic to Block/Shape class (getRows, getCell, getWidth, getHeight)
  // Suggested split: Board → game rules/state; Block/Shape → geometry.

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

    const hitsLandedBlock = this.wouldHitLandedBlockBelow();

    if (bottomY < this.height && !hitsLandedBlock) {
      this.y += 1;
    } else if (bottomY === this.height) {
      this.landedBlock = this.currentBlock;
      this.landedX = this.x;
      this.landedY = this.y;
      this.falling = false;
      this.currentBlock = undefined;
      this.clearSingleLine();
    } else {
      this.falling = false;
    }
  }

  moveDown() {
    this.tick();
  }

  moveLeft() {
    if (this.x > 0 && !this.wouldHitLandedBlockAt(this.x - 1, this.y)) {
      this.x -= 1;
    }
  }

  moveRight() {
    const blockWidth = this.getWidth(this.currentBlock);

    if (this.x + blockWidth < this.width && !this.wouldHitLandedBlockAt(this.x + 1, this.y)) {
      this.x += 1;
    }
  }

  rotateRight() {
    if (!this.falling) return;

    const rotatedBlock = this.currentBlock.rotateRight();

    if (this.tryPlaceRotatedBlock(rotatedBlock, this.x)) return;
    if (this.tryPlaceRotatedBlock(rotatedBlock, this.x + 1)) return;

    this.tryPlaceRotatedBlock(rotatedBlock, this.x - 1);
  }

  tryPlaceRotatedBlock(block, x) {
    if (!this.canPlace(block, x, this.y)) return false;

    this.currentBlock = block;
    this.x = x;
  
    return true;
  }

  canPlace(block, x, y) {
    if (x < 0 || y < 0) return false;

    if (x + this.getWidth(block) > this.width) return false;
    if (y + this.getHeight(block) > this.height) return false;

    if (this.wouldBlockHitLandedBlockAt(block, x, y)) return false;
    
    return true;
  }

  clearSingleLine() {
    if (!this.landedBlock) return;

    const rows = this.getRows(this.landedBlock);
    const keptRows = [];
    let clearedRowCount = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i] === "X".repeat(this.width)) {
        clearedRowCount += 1;
      } else {
        keptRows.push(rows[i]);
      }
    }
  
    if (clearedRowCount === 0) return;

    if (keptRows.length === 0) {
      this.landedBlock = undefined;
      this.landedX = undefined;
      this.landedY = undefined;
      return;
    }

    this.landedBlock = keptRows.join("\n");
    this.landedY = this.landedY + clearedRowCount;
    return;

    if (rows.length === 2 && rows[0] === "XXXXXXXXXX" && rows[1] === "XXXXXXXXXX") {
      this.landedBlock = undefined;
      this.landedX = undefined;
      this.landedY = undefined;
      return;
    }

    if (rows.length === 2 && rows[1] === "XXXXXXXXXX") {
      this.landedBlock = rows[0];
      this.landedY = this.landedY + 1;
      return;
    }

    if (rows.length === 4 && rows[2] === "XXXXXXXXXX" && rows[3] === "XXXXXXXXXX") {
      this.landedBlock = rows[0] + "\n" + rows[1];
      this.landedY = this.landedY + 2;
    }
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

  wouldBlockHitLandedBlockAt(block, nextX, nextY) {
    const currentRows = this.getRows(block);
    const landedRows = this.getRows(this.landedBlock);

    for (let row = 0; row < currentRows.length; row++) {
      for (let column = 0; column < currentRows[row].length; column++) {
        const currentCell = currentRows[row][column];

        if (currentCell === ".") continue;

        const boardX = nextX + column;
        const boardY = nextY + row;
        const landedCell = this.getCell(landedRows, this.landedX, this.landedY, boardX, boardY);

        if (landedCell !== ".") return true;
      }
    }

    return false;
  }

  wouldHitLandedBlockAt(nextX, nextY) {
    return this.wouldBlockHitLandedBlockAt(this.currentBlock, nextX, nextY);
  }

  wouldHitLandedBlockBelow() {
    return this.wouldHitLandedBlockAt(this.x, this.y + 1);
  }
}
