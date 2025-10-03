import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSubjectCodeTable = async () => {
  try {
    const createSubjectCodeTable = `
            CREATE TABLE subject_code(
                subject_code_id SERIAL PRIMARY KEY,
                school_id INT NOT NULL,
                subject_code_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id)
            ) 
        `;
    const result = await existsTable("subject_code");
    if (result) {
      console.log("Subject Code Table already exists");
    } else {
      await pool.query(createSubjectCodeTable);
      console.log("Subject Code table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
