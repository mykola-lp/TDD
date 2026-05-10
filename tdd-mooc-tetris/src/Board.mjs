import { BlockGeometry } from "./BlockGeometry.mjs";
import { PlacementRules } from "./PlacementRules.mjs";
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
  placement = new PlacementRules();

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

    const blockHeight = this.geometry.getHeight(this.currentBlock);
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
    return this.placement.canPlace(block, x, y, this.width, this.height, this.landedBlock, this.landedX, this.landedY);
  }

  clearLines() {
    if (!this.landedBlock) return;

    const rows = this.geometry.getRows(this.landedBlock);

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
    const currentRows = this.geometry.getRows(this.currentBlock);
    const landedRows = this.geometry.getRows(this.landedBlock);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const current = this.geometry.getCell(currentRows, this.x, this.y, x, y);
        const landed = this.geometry.getCell(landedRows, this.landedX, this.landedY, x, y);

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

  wouldBlockHitLandedBlockAt(block, nextX, nextY) {
    return this.placement.wouldBlockHitLandedBlockAt(block, nextX, nextY, this.landedBlock, this.landedX, this.landedY);
  }

  wouldHitLandedBlockAt(nextX, nextY) {
    return this.placement.wouldHitLandedBlockAt(this.currentBlock, nextX, nextY, this.landedBlock, this.landedX, this.landedY);
  }

  wouldHitLandedBlockBelow() {
    return this.wouldHitLandedBlockAt(this.x, this.y + 1);
  }
}
