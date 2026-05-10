import { BlockGeometry } from "./BlockGeometry.mjs";

export class PlacementRules {
  geometry = new BlockGeometry();

  wouldBlockHitLandedBlockAt(block, nextX, nextY, landedBlock, landedX, landedY) {
    const currentRows = this.geometry.getRows(block);
    const landedRows = this.geometry.getRows(landedBlock);

    for (let row = 0; row < currentRows.length; row++) {
      for (let column = 0; column < currentRows[row].length; column++) {
        const currentCell = currentRows[row][column];

        if (currentCell === ".") continue;

        const boardX = nextX + column;
        const boardY = nextY + row;
        const landedCell = this.geometry.getCell(landedRows, landedX, landedY, boardX, boardY);

        if (landedCell !== ".") return true;
      }
    }

    return false;
  }
}
