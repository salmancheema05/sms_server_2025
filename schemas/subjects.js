import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSubjectsTable = async () => {
  try {
    const createSubjectTable = `
            CREATE TABLE subjects(
                subject_id SERIAL PRIMARY KEY,
                school_id BIGINT NOT NULL,
                subject_name TEXT NOT NULL,
                board_or_writer_name TEXT NOT NULL,
                level_id BIGINT NOT NULL,
                subject_code_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (level_id) REFERENCES level(level_id),
                FOREIGN KEY (subject_code_id) REFERENCES subject_code(subject_code_id)
            ) 
        `;
    const result = await existsTable("subjects");
    if (result) {
      console.log("Subjects Table already exists");
    } else {
      await pool.query(createSubjectTable);
      console.log("Subjects table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
