import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createLevelTable = async () => {
  try {
    const createLevelTable = `
            CREATE TABLE level(
                level_id SERIAL PRIMARY KEY,
                level_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            ) 
        `;
    const result = await existsTable("level");
    if (result) {
      console.log("level Table already exists");
    } else {
      await pool.query(createLevelTable);
      console.log("level table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
