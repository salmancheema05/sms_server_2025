import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSubjectsAssignToClassTable = async () => {
  try {
    const createSubjectsAssignToClassTable = `
            CREATE TABLE subjectsassigntoclass(
                subject_assign_to_class_id SERIAL PRIMARY KEY,
                class_id BIGINT NOT NULL,
                school_id  BIGINT NOT NULL,
                subject_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (class_id) REFERENCES institute_classes(institute_class_id), 
                FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
            ) 
        `;
    const result = await existsTable("subjectsassigntoclass");
    if (result) {
      console.log("subjectsAssignToClass Table already exists");
    } else {
      await pool.query(createSubjectsAssignToClassTable);
      console.log("subjectsAsignToClass table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
