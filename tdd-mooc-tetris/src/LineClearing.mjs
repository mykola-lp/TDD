export function isFullRow(row, width) {
  if (row.length !== width) return false;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === ".") return false;
  }

  return true;
}

export function applyClearedRows(board, keptRows, clearedRowCount) {
  if (clearedRowCount === 0) return;

  if (keptRows.length === 0) {
    board.landedBlock = undefined;
    board.landedX = undefined;
    board.landedY = undefined;
    return;
  }

  board.landedBlock = keptRows.join("\n");
  board.landedY += clearedRowCount;
}
