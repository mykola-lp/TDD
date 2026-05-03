import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {

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
  
  rotateRightOrientations() {
    const count = this.orientations.length;
    let nextIndex = this.index + 1;

    if (nextIndex === count) {
      nextIndex = 0;
    }
    return new Tetromino(this.orientations[nextIndex], this.orientations, nextIndex);
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft());
  }

  rotateLeftOrientations() {
    const count = this.orientations.length;
    let nextIndex = this.index - 1;

    if (nextIndex < 0) {
      nextIndex = count - 1;
    }
    return new Tetromino(this.orientations[nextIndex], this.orientations, nextIndex);
  }

  static T_SHAPE = Tetromino.fromString(
    `.T.
    TTT
    ...`,
    4
  );
}
