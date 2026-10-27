import { describe, test } from "vitest";
import { expect } from "chai";
import argon2 from "@node-rs/argon2";

import { PasswordService } from "../src/testableGlobals.mjs";

describe("Testable globals: PasswordService", () => {
  test("changes password when the old password is correct", async () => {
    const user = {
      userId: 1,
      passwordHash: argon2.hashSync("old-password"),
    };

    let savedUser = null;

    const users = {
      async getById(userId) {
        return userId === user.userId ? user : null;
      },

      async save(updatedUser) {
        savedUser = { ...updatedUser };
      },
    };

    const service = new PasswordService(users);

    await service.changePassword(1, "old-password", "new-password");

    expect(savedUser.userId).to.equal(1);
    expect(argon2.verifySync(savedUser.passwordHash, "new-password")).to.equal(true);
    expect(argon2.verifySync(savedUser.passwordHash, "old-password")).to.equal(false);
  });
});
