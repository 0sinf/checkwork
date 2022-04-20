import { Pool } from "pg";
import pool from "./pool";
import { UserCreateRequest } from "users";

class User {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(userCreateRequest: UserCreateRequest) {
    const { name, email, company, wage } = userCreateRequest;

    const client = await this.pool.connect();

    const query = `
      INSERT INTO 
        users (name, email, company, wage)
      VALUES 
        ($1, $2, $3, $4)
      RETURNING id`;

    const result = await client.query(query, [name, email, company, wage]);
    client.release();
    return result.rows[0].id;
  }

  async findById(userId: number) {
    const client = await this.pool.connect();
    const query = `
      SELECT * FROM users WHERE id=$1
    `;
    const result = await client.query(query, [userId]);
    client.release();

    return result.rows[0];
  }
}

const userRepository = new User();

export default userRepository;
