import pool from "./pool";

interface UserCreateRequest {
  name: string;
  email: string;
  company: string;
  wage: number;
}

export async function create(
  userCreateRequest: UserCreateRequest
): Promise<number> {
  const { name, email, company, wage } = userCreateRequest;

  const client = await pool.connect();

  const query = `
    INSERT INTO 
      users (name, email, company, wage)
    VALUES
      ($1, $2, $3, $4)
    RETURNING id
  `;

  const result = await client.query(query, [name, email, company, wage]);

  return result.rows[0].id;
}
