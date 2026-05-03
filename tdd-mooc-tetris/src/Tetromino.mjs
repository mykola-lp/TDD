import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.T.
       TTT
       ...`
    )
  );

  constructor(shape) {
    this.shape = shape;
  }

  toString() {
    return this.shape.toString();
  }

  rotateRight() {
    return new Tetromino(this.shape.rotateRight());
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft());
  }
}
