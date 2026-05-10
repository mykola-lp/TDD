import { BlockGeometry } from "./BlockGeometry.mjs";
export class Board {
  // TODO: Move block geometry logic to Block/Shape class (getRows, getCell, getWidth, getHeight)
  // Suggested split: Board → game rules/state; Block/Shape → geometry.

  width;
  height;

  landedBlock;
  landedX;
  landedY;

  falling = false;

  geometry = new BlockGeometry();

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    if (this.falling) {
      throw new Error("already falling");
    }

    this.currentBlock = block;
    this.x = Math.floor((this.width - this.geometry.getWidth(block)) / 2);
    this.y = 0;

    if (!this.canPlace(block, this.x, this.y)) {
      this.currentBlock = undefined;
      return;
    }

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
      this.landedBlock = this.toString();
      this.landedX = 0;
      this.landedY = 0;
      this.falling = false;
      this.currentBlock = undefined;
      this.clearLines();
    } else {
      this.landedBlock = this.toString();
      this.landedX = 0;
      this.landedY = 0;
      this.falling = false;
      this.currentBlock = undefined;
      this.clearLines();
    }
  }

  moveDown() {
    this.tick();
  }

  moveLeft() {
    if (this.canPlace(this.currentBlock, this.x - 1, this.y)) {
      this.x -= 1;
    }
  }

  moveRight() {
    if (this.canPlace(this.currentBlock, this.x + 1, this.y)) {
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

  rotateLeft() {
    if (!this.falling) return;

    const block = this.currentBlock.rotateLeft();

    [0, 1, -1].some(offset =>
      this.tryPlaceRotatedBlock(block, this.x + offset)
    );
  }

  tryPlaceRotatedBlock(block, x) {
    if (!this.canPlace(block, x, this.y)) return false;

    this.currentBlock = block;
    this.x = x;
  
    return true;
  }

  canPlace(block, x, y) {
    if (y < 0 || x + this.getVisibleLeft(block) < 0) return false;
  
    if (x + this.geometry.getWidth(block) > this.width) return false;
    if (y + this.getHeight(block) > this.height) return false;

    if (this.wouldBlockHitLandedBlockAt(block, x, y)) return false;
    
    return true;
  }

  clearLines() {
    if (!this.landedBlock) return;

    const rows = this.getRows(this.landedBlock);

    const keptRows = [];
    let clearedRowCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (this.isFullRow(row)) {
        clearedRowCount += 1;
      } else {
        keptRows.push(row);
      }
    }

    this.applyClearedRows(keptRows, clearedRowCount);

    if (clearedRowCount > 0 && this.onClearLine) {
      this.onClearLine(clearedRowCount);
    }
  }

  isFullRow(row) {
    if (row.length !== this.width) return false;

    for (let i = 0; i < row.length; i++) {
      if (row[i] === ".") return false;
    }

    return true;
  }

  applyClearedRows(keptRows, clearedRowCount) {
    if (clearedRowCount === 0) return;

    if (keptRows.length === 0) {
      this.landedBlock = undefined;
      this.landedX = undefined;
      this.landedY = undefined;
      return;
    }

    this.landedBlock = keptRows.join("\n");
    this.landedY = this.landedY + clearedRowCount;
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
    return this.geometry.getRows(block);
  }

  getCell(rows, blockX, blockY, x, y) {
    return this.geometry.getCell(rows, blockX, blockY, x, y);
  }

  getVisibleLeft(block) {
    return this.geometry.getVisibleLeft(block);
  }

  getHeight(block) {
    return this.geometry.getHeight(block);
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
