import pool from "./pool";

export async function save(email: string, password: string): Promise<number> {
  const sql = "INSERT INTO Users(email, password) VALUES(?, ?)";
  const res = await pool.query(sql, [email, password]);
  return res.rows[0].userId;
}
