import { pool } from "../dbConnection.js";

const existsTable = async (tablename) => {
  try {
    const checkTableExistsSql = `
      SELECT EXISTS (
        SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = $1
      );
    `;
    const result = await pool.query(checkTableExistsSql, [tablename]);
    return result.rows[0].exists; // true or false
  } catch (error) {
    console.log("exists Table error:", error.message);
    return false;
  }
};

export default existsTable;
