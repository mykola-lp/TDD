import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect } from "chai";
import { describe, test } from "vitest";

const cliPath = fileURLToPath(new URL("../src/cli.mjs", import.meta.url));

describe("Game of Life CLI", () => {
  test("outputs a stable block pattern after one generation", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "block.rle");

    try {
      writeFileSync(inputPath, "x = 2, y = 2\n2o$2o!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "1"], { encoding: "utf8" });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(0);
      expect(result.stdout.trim()).to.equal("x = 2, y = 2\n2o$2o!");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("outputs a vertical blinker after one generation", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "blinker.rle");

    try {
      writeFileSync(inputPath, "x = 3, y = 1\n3o!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "1"], { encoding: "utf8" });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(0);
      expect(result.stdout.trim()).to.equal("x = 1, y = 3\no$o$o!");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("wraps RLE output at 70 characters", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "long-pattern.rle");
    const pattern = "ob".repeat(35) + "o";

    try {
      writeFileSync(inputPath, `x = 71, y = 1\n${pattern.slice(0, 70)}\n${pattern.slice(70)}!\n`);

      const result = spawnSync(process.execPath, [cliPath, inputPath, "0"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(0);
      expect(result.stdout.trim()).to.equal(`x = 71, y = 1\n${"ob".repeat(35)}\no!`);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("rejects a non-numeric generation count", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "block.rle");

    try {
      writeFileSync(inputPath, "x = 2, y = 2\n2o$2o!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "abc"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stderr.trim()).to.equal("Generation count must be a non-negative integer.");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
