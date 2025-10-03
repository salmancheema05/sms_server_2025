import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createTeacherAssignClassesAndSubjectTable = async () => {
  try {
    const createTeacherAssignClassesAndSubjectTable = `
            CREATE TABLE teacherassignclassesandsubject(
                teacher_asign_class_id SERIAL PRIMARY KEY,
                school_id BIGINT NOT NULL,
                class_subject_id BIGINT NOT NULL,
                teacher_id BIGINT NOT NULL,
                creator_id BIGINT NOT NULL,
                Updator_id BIGINT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (class_subject_id) REFERENCES subjectsassigntoclass(subject_assign_to_class_id),
                FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
                FOREIGN KEY (creator_id) REFERENCES users(user_id),
                FOREIGN KEY (Updator_id) REFERENCES users(user_id)

            ) 
        `;
    const result = await existsTable("teacherassignclassesandsubject");
    if (result) {
      console.log("teacher assign classes Table already exists");
    } else {
      await pool.query(createTeacherAssignClassesAndSubjectTable);
      console.log("teacher assign classes table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
