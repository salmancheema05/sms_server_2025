import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSchoolTimeTable = async () => {
  try {
    const createSchoolTimeTable = `
            CREATE TABLE school_time(
                school_time_id SERIAL PRIMARY KEY,
                school_id BIGINT NOT NULL,
                creator_id BIGINT NOT NULL,
                updator_id BIGINT,
                institute_class_id BIGINT NOT NULL,
                start_time TEXT NOT NULL,
                end_time TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (creator_id) REFERENCES users(user_id),
                FOREIGN KEY (updator_id) REFERENCES users(user_id),
                FOREIGN KEY (institute_class_id) REFERENCES institute_classes(institute_class_id)

            ) 
        `;
    const result = await existsTable("school_time");
    if (result) {
      console.log("School Time Table already exists");
    } else {
      await pool.query(createSchoolTimeTable);
      console.log("School Time table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
