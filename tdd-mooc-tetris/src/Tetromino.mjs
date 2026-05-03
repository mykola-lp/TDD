import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.T.
       TTT
       ...`
    )
  );

  constructor(shape, orientations = [shape], index = 0) {
    this.shape = shape;
    this.orientations = orientations;
    this.index = index;
  }

  static fromString(str, orientationCount) {
    const orientations = [];
    let shape = RotatingShape.fromString(str);
    for (let i = 0; i < orientationCount; i++) {
      orientations.push(shape);
      shape = shape.rotateRight();
    }
    return new Tetromino(orientations[0], orientations, 0);
  }

  toString() {
    return this.shape.toString();
  }

  toStringOrientations() {
    return this.orientations[this.index].toString();
  }

  rotateRight() {
    return new Tetromino(this.shape.rotateRight());
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft());
  }

  static T_SHAPE_ORIENTATIONS = Tetromino.fromString(
    `.T.
    TTT
    ...`,
    4
  );
}
