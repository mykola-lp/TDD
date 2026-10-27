import {
  afterAll,
  beforeEach,
  describe,
  test,
} from "vitest";
import { expect } from "chai";
import pg from "pg";

import { PostgresUserDao } from "../src/testableGlobals.mjs";

const databaseName = process.env.TEST_PGDATABASE ?? "test_untestable";

if (!databaseName.startsWith("test")) {
  throw new Error(
    `Refusing to run database tests against "${databaseName}". ` +
      "TEST_PGDATABASE must start with 'test'.",
  );
}

const db = new pg.Pool({
  user: process.env.TEST_PGUSER ?? "untestable",
  host: process.env.TEST_PGHOST ?? "127.0.0.1",
  database: databaseName,
  password: process.env.TEST_PGPASSWORD ?? "secret",
  port: Number(process.env.TEST_PGPORT ?? 5432),
});

const userDao = new PostgresUserDao(db);

beforeEach(async () => {
  await db.query("DROP TABLE IF EXISTS users");

  await db.query(`
    CREATE TABLE users (
      user_id integer PRIMARY KEY,
      password_hash varchar(100) NOT NULL
    )
  `);
});

afterAll(async () => {
  try {
    await db.query("DROP TABLE IF EXISTS users");
  } finally {
    await db.end();
  }
});

describe("Testable globals: PostgresUserDao", () => {
  test("saves and retrieves a user", async () => {
    const user = {
      userId: 1,
      passwordHash: "test-password-hash",
    };

    await userDao.save(user);
    const savedUser = await userDao.getById(1);

    expect(savedUser).to.deep.equal(user);
  });
});
