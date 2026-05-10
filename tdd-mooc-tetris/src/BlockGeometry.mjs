export class BlockGeometry {

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
}
