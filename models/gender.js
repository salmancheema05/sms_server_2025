import { pool } from "../dbConnection.js";
export const getGenderQuery = async (data) => {
  const query = `Select * from gender`;
  const result = await pool.query(query, data);
  return result;
};
