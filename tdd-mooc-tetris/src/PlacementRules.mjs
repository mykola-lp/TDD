import { BlockGeometry } from "./BlockGeometry.mjs";

export class PlacementRules {
  constructor({ geometry, board }) {
    this.geometry = geometry;
    this.board = board;
  }

  canPlace(block, x, y, width, height, landedBlock, landedX, landedY) {
    if (y < 0 || x + this.geometry.getVisibleLeft(block) < 0) return false;
  
    if (x + this.geometry.getWidth(block) > this.board.width) return false;
    if (y + this.geometry.getHeight(block) > this.board.height) return false;

    if (this.wouldBlockHitLandedBlockAt(block, x, y)) return false;
    
    return true;
  }

  wouldBlockHitLandedBlockAt(block, nextX, nextY) {
    const currentRows = this.geometry.getRows(block);
    const landedRows = this.geometry.getRows(this.board.landedBlock);

    for (let row = 0; row < currentRows.length; row++) {
      for (let column = 0; column < currentRows[row].length; column++) {
        const currentCell = currentRows[row][column];

        if (currentCell === ".") continue;

        const boardX = nextX + column;
        const boardY = nextY + row;
        const landedCell = this.geometry.getCell(landedRows, this.board.landedX, this.board.landedY, boardX, boardY);

        if (landedCell !== ".") return true;
      }
    }

    return false;
  }

  wouldHitLandedBlockAt(block, nextX, nextY) {
    return this.wouldBlockHitLandedBlockAt(block, nextX, nextY);
  }

  wouldHitLandedBlockBelow(block, x, y) {
    return this.wouldHitLandedBlockAt(block, x, y + 1);
  }
}
