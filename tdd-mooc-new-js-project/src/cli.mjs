import { readFileSync } from "node:fs";

function parseRle(input) {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  const headerIndex = lines.findIndex((line) => /^x\s*=/i.test(line));

  if (headerIndex === -1) {
    throw new Error("Invalid RLE header");
  }

  const data = lines
    .slice(headerIndex + 1)
    .join("")
    .replace(/\s/g, "");
  const cells = new Set();

  let x = 0;
  let y = 0;
  let index = 0;
  let ended = false;

  while (index < data.length) {
    let countText = "";

    while (/\d/.test(data[index] ?? "")) {
      countText += data[index];
      index++;
    }

    const count = countText ? Number(countText) : 1;
    const symbol = data[index++];

    if (count < 1) {
      throw new Error("Invalid RLE run length");
    }

    if (symbol === "b") {
      x += count;
    } else if (symbol === "o") {
      for (let i = 0; i < count; i++) {
        cells.add(`${x},${y}`);
        x++;
      }
    } else if (symbol === "$") {
      y += count;
      x = 0;
    } else if (symbol === "!") {
      ended = true;
      break;
    } else {
      throw new Error("Invalid RLE data");
    }
  }

  if (!ended) {
    throw new Error("Missing RLE terminator");
  }

  return cells;
}

function nextGeneration(cells) {
  const neighborCounts = new Map();

  for (const cell of cells) {
    const [x, y] = cell.split(",").map(Number);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        const neighbor = `${x + dx},${y + dy}`;

        neighborCounts.set(neighbor, (neighborCounts.get(neighbor) ?? 0) + 1);
      }
    }
  }

  const next = new Set();

  for (const [cell, count] of neighborCounts) {
    if (count === 3 || (count === 2 && cells.has(cell))) {
      next.add(cell);
    }
  }

  return next;
}

function encodeRuns(row) {
  let result = "";
  let index = 0;

  while (index < row.length) {
    let end = index + 1;

    while (end < row.length && row[end] === row[index]) {
      end++;
    }

    const count = end - index;

    result += `${count > 1 ? count : ""}${row[index]}`;
    index = end;
  }

  return result;
}

function wrapRleBody(body) {
  const tokens = body.match(/\d*[bo$]|!/g) ?? [];
  const lines = [];
  let line = "";

  for (const token of tokens) {
    if (line && line.length + token.length > 70) {
      lines.push(line);
      line = "";
    }

    line += token;
  }

  if (line) {
    lines.push(line);
  }

  return lines.join("\n");
}

function serializeRle(cells) {
  if (cells.size === 0) {
    return "x = 0, y = 0\n!";
  }

  const coordinates = [...cells].map((cell) => cell.split(",").map(Number));

  const minX = Math.min(...coordinates.map(([x]) => x));
  const maxX = Math.max(...coordinates.map(([x]) => x));
  const minY = Math.min(...coordinates.map(([, y]) => y));
  const maxY = Math.max(...coordinates.map(([, y]) => y));

  const rows = [];

  for (let y = minY; y <= maxY; y++) {
    let row = "";

    for (let x = minX; x <= maxX; x++) {
      row += cells.has(`${x},${y}`) ? "o" : "b";
    }

    row = row.replace(/b+$/, "");
    rows.push(encodeRuns(row));
  }

  const body = `${rows.join("$")}!`;

  return `x = ${maxX - minX + 1}, y = ${maxY - minY + 1}\n${wrapRleBody(body)}`;
}

const inputPath = process.argv[2];
const generationCountArgument = process.argv[3];
const generationCount = Number(generationCountArgument);

if (!generationCountArgument?.trim() || !Number.isInteger(generationCount) || generationCount < 0) {
  process.stderr.write("Generation count must be a non-negative integer.\n");
  process.exitCode = 1;
} else {
  const input = readFileSync(inputPath, "utf8");
  let cells = parseRle(input);

  for (let i = 0; i < generationCount; i++) {
    cells = nextGeneration(cells);
  }

  process.stdout.write(`${serializeRle(cells)}\n`);
}
