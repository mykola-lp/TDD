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

  getWidth(block) {
    const rows = this.getRows(block);

    let width = 0;
  
    for (const row of rows) {
      if (row !== ".".repeat(row.length)) {
        width = Math.max(width, row.search(/\.*$/));
      }
    }
  
    return width;
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

  getVisibleLeft(block) {
    let inset = this.getWidth(block);

    for (const row of this.getRows(block))
      for (let i = 0; i < inset; i++) {
        if (row[i] !== ".") inset = i;
    }

    return inset;
  }
}
