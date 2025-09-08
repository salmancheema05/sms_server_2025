import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createGenderTable = async () => {
  try {
    const createGenderTable = `
            CREATE TABLE gender(
                gender_id SERIAL PRIMARY KEY,
                gender_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            ) 
        `;
    const result = await existsTable("gender");
    if (result) {
      console.log("Gender Table already exists");
    } else {
      await pool.query(createGenderTable);
      console.log("Gender table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
