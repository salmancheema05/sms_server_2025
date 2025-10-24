import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSessionAssignWithClass = async () => {
  try {
    const createSessionAssignWithClass = `
            CREATE TABLE sessionassignwithclass(
                session_and_class_id SERIAL PRIMARY KEY,
                school_id BIGINT NOT NULL,
                session_id BIGINT NOT NULL,
                institute_class_id BIGINT,
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (session_id) REFERENCES session(session_id),
                FOREIGN KEY (institute_class_id) REFERENCES institute_classes(institute_class_id)
            ) 
        `;
    const result = await existsTable("sessionassignwithclass");
    if (result) {
      console.log("Session Assign With Class Table already exists");
    } else {
      await pool.query(createSessionAssignWithClass);
      console.log("Session Assign With Class table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
