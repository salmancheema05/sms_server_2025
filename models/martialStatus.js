import { pool } from "../dbConnection.js";
export const getMaritalStatusQuery = async () => {
  const query = `Select * from marital_status`;
  const result = await pool.query(query);
  return result;
};
