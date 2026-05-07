import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(orientations, index = 0) {
    this.orientations = orientations;
    this.index = index;
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

  static T_SHAPE = Tetromino.fromOrientations([
    `.T.
     TTT
     ...`,
    `.T.
     .TT
     .T.`,
    `TTT
     .T.
     ...`,
    `.T.
     TT.
     .T.`
  ]);

  static I_SHAPE = Tetromino.fromOrientations([
    `.....
     .....
     IIII.
     .....
     .....`,
    `..I..
     ..I..
     ..I..
     ..I..
     .....`,
  ]);

  static O_SHAPE = Tetromino.fromOrientations([
    `.OO
     .OO
     ...`,
  ]);
}
