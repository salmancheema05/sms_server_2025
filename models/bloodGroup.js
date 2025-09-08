import { pool } from "../dbConnection.js";
export const getBloodGroupQuery = async () => {
  const query = `Select * from blood_group`;
  const result = await pool.query(query);
  return result;
};
