import { BlockGeometry } from "./BlockGeometry.mjs";

export class PlacementRules {
  geometry = new BlockGeometry();

  constructor(board) {
    this.board = board;
  }

  canPlace(block, x, y, width, height, landedBlock, landedX, landedY) {
    if (y < 0 || x + this.geometry.getVisibleLeft(block) < 0) return false;
  
    if (x + this.geometry.getWidth(block) > width) return false;
    if (y + this.geometry.getHeight(block) > height) return false;

    if (this.wouldBlockHitLandedBlockAt(block, x, y, landedBlock, landedX, landedY)) return false;
    
    return true;
  }

  wouldBlockHitLandedBlockAt(block, nextX, nextY) {
    const board = this.board;

    const currentRows = this.geometry.getRows(block);
    const landedRows = this.geometry.getRows(board.landedBlock);

    for (let row = 0; row < currentRows.length; row++) {
      for (let column = 0; column < currentRows[row].length; column++) {
        const currentCell = currentRows[row][column];

        if (currentCell === ".") continue;

        const boardX = nextX + column;
        const boardY = nextY + row;
        const landedCell = this.geometry.getCell(landedRows, board.landedX, board.landedY, boardX, boardY);

        if (landedCell !== ".") return true;
      }
    }

    return false;
  }

  wouldHitLandedBlockAt(block, nextX, nextY, landedBlock, landedX, landedY) {
    return this.wouldBlockHitLandedBlockAt(block, nextX, nextY, landedBlock, landedX, landedY);
  }

  wouldHitLandedBlockBelow(block, x, y, landedBlock, landedX, landedY) {
    return this.wouldHitLandedBlockAt(block, x, y + 1, landedBlock, landedX, landedY);
  }
}
