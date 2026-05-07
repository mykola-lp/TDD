import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(orientations, index = 0) {
    this.orientations = orientations;
    this.index = index;
  }

  static fromShape(shape, orientationCount) {
    const orientations = [];
    let current = shape;

    for (let i = 0; i < orientationCount; i++) {
      orientations.push(current);
      current = current.rotateRight();
    }

    return new Tetromino(orientations, 0);
  }

  static fromString(str, orientationCount) {
    const shape = RotatingShape.fromString(str);
    return Tetromino.fromShape(shape, orientationCount);
  }

  static fromOrientations(strings) {
    const orientations = [];

    for (const str of strings) {
      orientations.push(RotatingShape.fromString(str));
    }

    return new Tetromino(orientations, 0);
  }

  toString() {
    return this.orientations[this.index].toString();
  }

  rotateRight() {
    const count = this.orientations.length;
    let nextIndex = this.index + 1;

    if (nextIndex === count) {
      nextIndex = 0;
    }

    return new Tetromino(this.orientations, nextIndex);
  }

  rotateLeft() {
    const count = this.orientations.length;
    let nextIndex = this.index - 1;

    if (nextIndex < 0) {
      nextIndex = count - 1;
    }

    return new Tetromino(this.orientations, nextIndex);
  }

  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
    4
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`,
    2
  );

  static O_SHAPE = Tetromino.fromString(
    `.OO
     .OO
     ...`,
    1
  );
}
