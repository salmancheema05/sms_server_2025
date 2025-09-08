import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createClassGroupTable = async () => {
  try {
    const createClassGroupTable = `
            CREATE TABLE class_group(
                group_id SERIAL PRIMARY KEY,
                group_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            ) 
        `;
    const result = await existsTable("class_group");
    if (result) {
      console.log("class Group Table already exists");
    } else {
      await pool.query(createClassGroupTable);
      console.log("class Group table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
