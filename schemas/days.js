import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createDaysTable = async () => {
  try {
    const createDaysTable = `
            CREATE TABLE days(
                day_id SERIAL PRIMARY KEY,
                day_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            ) 
        `;
    const result = await existsTable("days");
    if (result) {
      console.log("Days Table already exists");
    } else {
      await pool.query(createDaysTable);
      console.log("Days table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
