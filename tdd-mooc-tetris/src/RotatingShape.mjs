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
    const size = this.grid.length;
    const rotated = [];

    for (let y = 0; y < size; y++) {
      rotated[y] = [];

      for (let x = 0; x < size; x++) {
        rotated[y][x] = this.grid[x][size - 1 - y];
      }
    }

    return new RotatingShape(rotated);
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
