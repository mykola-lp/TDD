import argon2 from "@node-rs/argon2";

export class PostgresUserDao {
  constructor(db) {
    this.db = db;
  }

  #rowToUser(row) {
    return {
      userId: row.user_id,
      passwordHash: row.password_hash,
    };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId],
    );

    const row = rows[0];
    let user = null;

    if (row !== undefined) {
      user = this.#rowToUser(row);
    }

    return user;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash],
    );
  }
}

export class PasswordService {
  constructor(users) {
    this.users = users;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    const isOldPasswordValid = argon2.verifySync(
      user.passwordHash,
      oldPassword,
    );

    if (!isOldPasswordValid) {
      throw new Error("wrong old password");
    }

    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}
