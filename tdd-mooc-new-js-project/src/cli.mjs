import { readFileSync } from "node:fs";

const inputPath = process.argv[2];
const pattern = readFileSync(inputPath, "utf8");

process.stdout.write(pattern);
