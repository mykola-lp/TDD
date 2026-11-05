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

  test("reports an error when RLE data has no terminator", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "invalid.rle");

    try {
      writeFileSync(inputPath, "x = 3, y = 1\n3o\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "1"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("Missing RLE terminator");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("shows usage when required arguments are missing", () => {
    const result = spawnSync(process.execPath, [cliPath], {
      encoding: "utf8",
    });

    expect(result.error).to.equal(undefined);
    expect(result.status).to.equal(1);
    expect(result.stdout).to.equal("");
    expect(result.stderr.trim()).to.equal("Usage: node cli.mjs <input-file> <generation-count>");
  });

  test("rejects an RLE header without height", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "invalid-header.rle");

    try {
      writeFileSync(inputPath, "x = 3\n3o!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "1"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("Invalid RLE header");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("rejects RLE data wider than declared width", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "invalid-width.rle");

    try {
      writeFileSync(inputPath, "x = 2, y = 1\n3o!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "0"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("RLE data exceeds declared width");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("rejects RLE data taller than declared height", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "invalid-height.rle");

    try {
      writeFileSync(inputPath, "x = 1, y = 2\no$o$o!");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "0"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("RLE data exceeds declared height");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("rejects RLE data after the terminator", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "trailing-data.rle");

    try {
      writeFileSync(inputPath, "x = 3, y = 1\n3o!b");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "0"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("Unexpected data after RLE terminator");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("rejects a run length before the RLE terminator", () => {
    const directory = mkdtempSync(join(tmpdir(), "game-of-life-"));
    const inputPath = join(directory, "invalid-terminator.rle");

    try {
      writeFileSync(inputPath, "x = 1, y = 1\n2!\n");

      const result = spawnSync(process.execPath, [cliPath, inputPath, "0"], {
        encoding: "utf8",
      });

      expect(result.error).to.equal(undefined);
      expect(result.status).to.equal(1);
      expect(result.stdout).to.equal("");
      expect(result.stderr.trim()).to.equal("Invalid RLE data");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
