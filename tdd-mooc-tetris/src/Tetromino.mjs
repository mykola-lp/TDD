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
}
