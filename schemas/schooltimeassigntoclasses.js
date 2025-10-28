import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSchoolTimeAssignToClassesTable = async () => {
  try {
    const createSchoolTimeAssignToClassesTable = `
            CREATE TABLE schooltimeassigntoclasses(
                school_time_assign_to_class_id SERIAL PRIMARY KEY,
                school_id BIGINT NOT NULL,
                creator_id BIGINT NOT NULL,
                updator_id BIGINT,
                school_time_id BIGINT NOT NULL,
                institute_class_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (school_time_id) REFERENCES school_time(school_time_id),
                FOREIGN KEY (creator_id) REFERENCES users(user_id),
                FOREIGN KEY (updator_id) REFERENCES users(user_id),
                FOREIGN KEY (institute_class_id) REFERENCES institute_classes(institute_class_id)
            ) 
        `;
    const result = await existsTable("schooltimeassigntoclasses");
    if (result) {
      console.log("schooltimeassigntoclassestable already exists");
    } else {
      await pool.query(createSchoolTimeAssignToClassesTable);
      console.log("schooltimeassigntoclasses table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
