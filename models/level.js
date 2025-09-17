import { pool } from "../dbConnection.js";
export const fetchAllLevelQuery = async (data) => {
  const query = `SELECT level_id,level_name FROM level`;
  const result = await pool.query(query, data);
  return result;
};
