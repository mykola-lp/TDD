import { describe, test } from "vitest";
import { expect } from "chai";

import { parsePeopleCsvContent } from "../src/testableFiles.mjs";

describe("Testable files: parse people CSV", () => {
  test("parses a person from CSV text", () => {
    const csvData = "John,Doe,30,Male";

    const people = parsePeopleCsvContent(csvData);

    expect(people).to.deep.equal([
      {
        firstName: "John",
        lastName: "Doe",
        gender: "m",
        age: 30,
      },
    ]);
  });

  test("omits age when CSV age is empty", () => {
    const csvData = "Jane,Doe,,Female";

    const people = parsePeopleCsvContent(csvData);

    expect(people).to.deep.equal([
      {
        firstName: "Jane",
        lastName: "Doe",
        gender: "f",
      },
    ]);
  });

  test("parses multiple people from CSV text", () => {
    const csvData = "John,Doe,30,Male\nJane,Smith,25,Female";

    const people = parsePeopleCsvContent(csvData);

    expect(people).to.deep.equal([
      {
        firstName: "John",
        lastName: "Doe",
        gender: "m",
        age: 30,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        gender: "f",
        age: 25,
      },
    ]);
  });
});
