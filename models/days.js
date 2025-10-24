import { pool } from "../dbConnection.js";
export const getDaysQuery = async () => {
  const query = `Select day_id,day_name from days`;
  const result = await pool.query(query);
  return result;
};
