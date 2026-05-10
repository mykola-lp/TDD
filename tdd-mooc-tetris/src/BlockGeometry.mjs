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
}
