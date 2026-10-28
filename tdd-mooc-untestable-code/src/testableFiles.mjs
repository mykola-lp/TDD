import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const people = parsePeopleCsvContent(csvData);

  return people;
}

export function parsePeopleCsvContent(csvData) {
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });

  const people = [];

  for (const record of records) {
    const person = parsePerson(record);
    people.push(person);
  }

  return people;
}

function parsePerson([firstName, lastName, age, gender]) {
  const normalizedGender = gender.charAt(0).toLowerCase();

  const person = {
    firstName,
    lastName,
    gender: normalizedGender,
  };

  if (age !== "") {
    person.age = parseInt(age);
  }

  return person;
}
