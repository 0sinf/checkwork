import { Pool } from "pg";
import pool from "./pool";
import { UserCreateRequest, UserRepository, UserUpdateRequest } from "users";

class UserRepositoryImpl implements UserRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(userCreateRequest: UserCreateRequest) {
    const { name, email, company, wage, password } = userCreateRequest;

    const client = await this.pool.connect();

    const query = `
      INSERT INTO 
        users (name, email, password, company, wage)
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING id`;

    const result = await client.query(query, [
      name,
      email,
      password,
      company,
      wage,
    ]);
    client.release();
    return result.rows[0].id;
  }

  async findById(userId: number) {
    const client = await this.pool.connect();
    const query = `
      SELECT name, email, password, company, wage FROM users WHERE id=$1
    `;
    const result = await client.query(query, [userId]);
    client.release();

    return result.rows[0];
  }

  async findByIdAndUpdate(
    userId: number,
    userUpdateRequest: UserUpdateRequest
  ) {
    const [getAllSetStrings, getAllValues] = Object.entries(userUpdateRequest)
      .filter(([, value]) => value !== undefined)
      .reduce(this.setUpdateQuerySet, [[], []]);

    const client = await this.pool.connect();
    const query = `
      UPDATE users
        SET ${getAllSetStrings.join(",")} 
        WHERE id=$${getAllSetStrings.length + 1}
        RETURNING company, wage
    `;
    const result = await client.query(query, [...getAllValues, userId]);
    client.release();

    if (result.rowCount === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    return result.rows[0];
  }

  private setUpdateQuerySet(
    prev: [string[], string[]],
    curr: [string, any],
    idx: number
  ) {
    const [key, value] = curr;
    prev[0].push(`${key}=$${idx + 1}`);
    prev[1].push(value);
    return prev;
  }

  async findByIdAndDelete(userId: number) {
    const client = await this.pool.connect();

    const query = `
      DELETE FROM users WHERE id=$1
    `;

    const result = await client.query(query, [userId]);

    client.release();

    if (result.rowCount === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }
  }
}

const userRepository = new UserRepositoryImpl();

export default userRepository;
