import { pool } from "../dbConnection.js";
export const getGroupQuery = async (data) => {
  const query = `Select * from class_group`;
  const result = await pool.query(query, data);
  return result;
};
