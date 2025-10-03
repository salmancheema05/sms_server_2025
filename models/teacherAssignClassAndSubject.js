import { pool } from "../dbConnection.js";
export const getClassForAssignTeachersQuery = async (data) => {
  const query = `SELECT 
        sac.subject_assign_to_class_id,
        c.school_class_name,
        s.subject_name,
        l.level_name,
        sc.subject_code_name
        FROM 
        subjectsassigntoclass sac
        INNER JOIN classes c ON sac.class_id = c.school_class_id
        INNER JOIN subjects s ON sac.subject_id = s.subject_id
        INNER JOIN level l ON s.level_id = l.level_id
        INNER JOIN subject_code sc ON s.subject_code_id = sc.subject_code_id
        WHERE
         sac.school_id= $1 AND sc.subject_code_name = $2 AND l.level_name= $3
    `;
  const result = await pool.query(query, data);
  return result;
};
export const checkSubujectHasTeacherOrNotQuery = async (data) => {
  const query = `SELECT teacher_asign_class_id FROM teacherassignclassesandsubject 
    where school_id = $1 AND class_subject_id = $2 `;
  const result = await pool.query(query, data);
  return result;
};
export const assignQuery = async (data) => {
  const query = `INSERT INTO teacherassignclassesandsubject 
    (school_id,class_subject_id,teacher_id,creator_id) VALUES ($1,$2,$3,$4)`;
  const result = await pool.query(query, data);
  return result;
};
