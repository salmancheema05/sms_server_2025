import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createTeachersTable = async () => {
  try {
    const createTeachersTable = `
            CREATE TABLE teachers(
                teacher_id SERIAL PRIMARY KEY,
                marital_status_id BIGINT NOT NUll,
                gender_id BIGINT NOT NULL,
                creator_id BIGINT NOT NULL,
                blood_group_id BIGINT NOT NULL,
                level_id BIGINT NOT NULL,
                school_id BIGINT NOT NUll,
                school_teacher_id BIGINT NOT NULL,
                teacher_name TEXT NOT NULL,
                spouse TEXT NOT NULL,
                nic_number BIGINT  NOT NULL,
                contact_number BIGINT  NOT NULL,
                email TEXT NOT NULL,
                teacher_pic TEXT NOT NULL,
                joining_date TEXT NOT NULL,
                teacher_salary INT NOT NULL,
                current_adress TEXT NOT NULL,
                job_type TEXT NOT NULL,
                subject TEXT NOT NULL,
                at_school TEXT NOT NULL, 
                has_class_now TEXT NOT NULL,
                qualification JSONB NOT NULL,
                updator_id INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (creator_id) REFERENCES users(user_id),
                FOREIGN KEY (updator_id) REFERENCES users(user_id),
                FOREIGN KEY (gender_id) REFERENCES gender(gender_id),
                FOREIGN KEY (blood_group_id) REFERENCES blood_group(blood_group_id),
                FOREIGN KEY (marital_status_id) REFERENCES marital_status(marital_status_id),
                FOREIGN KEY (level_id) REFERENCES level(level_id)
            ) 
        `;
    const result = await existsTable("teachers");
    if (result) {
      console.log("Teachers Table already exists");
    } else {
      await pool.query(createTeachersTable);
      console.log("Teachers table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
