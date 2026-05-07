import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Line clear", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("clears a single full row", () => {
    board.drop("XXXXXXXXXX");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("does not clear a row that is not full", () => {
    board.drop("XXXXXXXXX.");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       XXXXXXXXX.`
    );
  });

  test("clears a full row even when it is inside a multi-row landed shape", () => {
    board.drop("XXXXXXXXX.\nXXXXXXXXXX");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       XXXXXXXXX.`
    );
  });

  test("moves rows above down after clearing one row", () => {
    board.landedBlock = "....X.....\nXXXXXXXXXX";
    board.landedX = 0;
    board.landedY = 4;

    board.clearLines();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....X.....`
    );
  });

  test("clears two full rows at once", () => {
    board.drop("XXXXXXXXXX\nXXXXXXXXXX");
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("moves rows above down by two after clearing two rows", () => {
    board.landedBlock = "....X.....\n....Y.....\nXXXXXXXXXX\nXXXXXXXXXX";
    board.landedX = 0;
    board.landedY = 2;

    board.clearLines();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....X.....
       ....Y.....`
    );
  });
});
