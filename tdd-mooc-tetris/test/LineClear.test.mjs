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
});
