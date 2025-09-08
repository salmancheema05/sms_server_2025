import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createBloodGroupTable = async () => {
  try {
    const createBloodGroupTable = `
            CREATE TABLE blood_group(
                blood_group_id SERIAL PRIMARY KEY,
                blood_group_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            ) 
        `;
    const result = await existsTable("blood_group");
    if (result) {
      console.log("blood group table already exists");
    } else {
      await pool.query(createBloodGroupTable);
      console.log("blood group table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
