import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSessionTable = async () => {
  try {
    const createSessionTable = `
            CREATE TABLE session(
                session_id SERIAL PRIMARY KEY,
                session_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            )
        `;
    const result = await existsTable("session");
    if (result) {
      console.log("Session Table already exists");
    } else {
      await pool.query(createSessionTable);
      console.log("Session table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
