import { parse } from "csv-parse/sync";

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

export function parsePeopleCsv(csvData) {
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
