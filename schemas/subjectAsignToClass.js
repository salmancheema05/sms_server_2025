import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSubjectsAsignToClassTable = async () => {
  try {
    const createSubjectsAsignToClassTable = `
            CREATE TABLE subjectsasigntoclass(
                subject_asign_to_class_id SERIAL PRIMARY KEY,
                class_id BIGINT NOT NULL,
                school_id  BIGINT NOT NULL,
                subject_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (class_id) REFERENCES classes(school_class_id),
                FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
            ) 
        `;
    const result = await existsTable("subjectsasigntoclass");
    if (result) {
      console.log("subjectsAsignToClass Table already exists");
    } else {
      await pool.query(createSubjectsAsignToClassTable);
      console.log("subjectsAsignToClass table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
