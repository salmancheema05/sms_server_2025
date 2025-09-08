import { pool } from "../dbConnection.js";
export const fetchAllSessionQuery = async () => {
  const query = `SELECT * FROM session `;
  const result = await pool.query(query);
  return result;
};
