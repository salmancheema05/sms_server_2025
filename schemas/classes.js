import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createClassesTable = async () => {
  try {
    const createClassesTable = `
            CREATE TABLE classes(
                school_class_id SERIAL PRIMARY KEY,
                school_class_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            ) 
        `;
    const result = await existsTable("classes");
    if (result) {
      console.log("classes Table already exists");
    } else {
      await pool.query(createClassesTable);
      console.log("classes table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
