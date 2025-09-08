import { pool } from "../dbConnection.js";
export const getClassesQuery = async () => {
  const query = `Select * from classes`;
  const result = await pool.query(query);
  return result;
};
