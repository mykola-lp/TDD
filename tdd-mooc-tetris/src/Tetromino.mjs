import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;

  constructor(shape) {
    this.shape = shape;
  }

  toString() {
    return this.shape.toString();
  }

  static T_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.T.
       TTT
       ...`
    )
  );

  rotateRight() {
    return new Tetromino(this.shape.rotateRight());
  }
  
  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft());
  }
}
