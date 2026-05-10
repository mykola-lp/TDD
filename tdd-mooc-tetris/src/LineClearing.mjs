import { BlockGeometry } from "./BlockGeometry.mjs";

export class LineClearing {
  constructor(board) {
    this.board = board;
  }

  applyClearedRows(keptRows, clearedRowCount) {
    if (clearedRowCount === 0) return;

    if (keptRows.length === 0) {
      this.board.landedBlock = undefined;
      this.board.landedX = undefined;
      this.board.landedY = undefined;
      return;
    }

    this.board.landedBlock = keptRows.join("\n");
    this.board.landedY = this.board.landedY + clearedRowCount;
  }
}
