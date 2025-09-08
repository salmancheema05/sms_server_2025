import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const creatInstituteClassTable = async () => {
  try {
    const creatInstituteClassTable = `
                CREATE TABLE institute_classes(
                    institute_class_id SERIAL PRIMARY KEY,
                    school_id INT NOT NULL,
                    creator_id INT NOT NULL,
                    updator_id INT,
                    class_id INT NOT NULL,
                    session_id INT NOT NULL,
                    group_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP,
                    FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                    FOREIGN KEY (creator_id) REFERENCES users(user_id),
                    FOREIGN KEY (updator_id) REFERENCES users(user_id),
                    FOREIGN KEY (class_id) REFERENCES classes(school_class_id),
                    FOREIGN KEY (session_id) REFERENCES session(session_id),
                    FOREIGN KEY (group_id) REFERENCES class_group(group_id)
                ) 
            `;
    const result = await existsTable("institute_classes");
    if (result) {
      console.log("institute classesTable already exists");
    } else {
      await pool.query(creatInstituteClassTable);
      console.log("institut classes table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
