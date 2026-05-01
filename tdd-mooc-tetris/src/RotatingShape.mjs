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
    return new RotatingShape([
      [this.grid[2][0], this.grid[1][0], this.grid[0][0]],
      [this.grid[2][1], this.grid[1][1], this.grid[0][1]],
      [this.grid[2][2], this.grid[1][2], this.grid[0][2]],
    ]);
  }

  toString() {
    return this.grid.map(row => row.join("")).join("\n") + "\n";
  }
}
