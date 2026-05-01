export class RotatingShape {
  grid;

  constructor(grid) {
    this.grid = grid;
  }

  static fromString(str) {
    return new RotatingShape(
      str
        .trim()
        .split("\n")
        .map(row => row.trim().split(""))
    );
  }

  rotateLeft() {
    return new RotatingShape([
      [this.grid[0][2], this.grid[1][2], this.grid[2][2]],
      [this.grid[0][1], this.grid[1][1], this.grid[2][1]],
      [this.grid[0][0], this.grid[1][0], this.grid[2][0]],
    ]);
  }

  rotateRight() {
    const size = this.grid.length;
    const rotated = [];

    for (let y = 0; y < size; y++) {
      rotated[y] = [];
      for (let x = 0; x < size; x++) {
        rotated[y][x] = this.grid[size - 1 - x][y];
      }
    }
    return new RotatingShape(rotated);
  }

  toString() {
    return this.grid.map(row => row.join("")).join("\n") + "\n";
  }
}
