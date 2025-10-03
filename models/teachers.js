import { pool } from "../dbConnection.js";
export const insertQuery = async (data) => {
  const query = `INSERT INTO teachers
       (
            school_id, 
            creator_id,
            marital_status_id,
            blood_group_id,
            gender_id,
            teacher_name,
            spouse,
            nic_number,
            contact_number,
            email,
            teacher_pic,
            joining_date,
            teacher_salary,
            current_adress,
            job_type,
            subject_code_id,
            at_school,
            has_class_now,
            qualification,
            school_teacher_id,
            level_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`;
  const result = await pool.query(query, data);
  return result;
};
export const totalTeacherOfSchool = async (data) => {
  const query = `SELECT COUNT(*) AS total_teachers FROM teachers WHERE school_id = $1`;
  const result = await pool.query(query, data);
  return result;
};
export const selectAllTeachersQuery = async (data) => {
  const SelectQuery = `
    SELECT
      t.marital_status_id,
      t.gender_id,
      t.blood_group_id,
      t.school_teacher_id,
      t.teacher_name,
      t.spouse,
      t.nic_number,
      t.contact_number,
      t.email,
      t.teacher_pic,
      t.joining_date,
      t.teacher_salary,
      t.current_adress,  
      t.job_type,
      t.qualification,
      t.updator_id,
      t.created_at,
      t.updated_at,
      bg.blood_group_name,
      g.gender_name,
      ms.marital_status,
      u.first_name AS creator_first_name,
      u.last_name AS creator_last_name,
      r.role_name
    FROM teachers t
    INNER JOIN marital_status ms ON t.marital_status_id = ms.marital_status_id
    INNER JOIN gender g ON t.gender_id = g.gender_id
    INNER JOIN blood_group bg ON t.blood_group_id = bg.blood_group_id
    INNER JOIN users u ON t.creator_id = u.user_id
    INNER JOIN roles r ON u.user_role_id = r.role_id
    WHERE t.school_id = $1
  `;

  const result = await pool.query(SelectQuery, data);
  return result;
};
export const selectTeacherQuery = async (data) => {
  const SelectQuery = `
    SELECT
      t.marital_status_id,
      t.gender_id,
      t.blood_group_id,
      t.school_teacher_id,
      t.teacher_name,
      t.spouse,
      t.nic_number,
      t.contact_number,
      t.email,
      t.teacher_pic,
      t.joining_date,
      t.teacher_salary,
      t.current_adress,  
      t.job_type,
      t.qualification,
      t.updator_id,
      t.created_at,
      t.updated_at,
      bg.blood_group_name,
      g.gender_name,
      ms.marital_status,
      u.first_name AS creator_first_name,
      u.last_name AS creator_last_name,
      r.role_name
    FROM teachers t
    INNER JOIN marital_status ms ON t.marital_status_id = ms.marital_status_id
    INNER JOIN gender g ON t.gender_id = g.gender_id
    INNER JOIN blood_group bg ON t.blood_group_id = bg.blood_group_id
    INNER JOIN users u ON t.creator_id = u.user_id
    INNER JOIN roles r ON u.user_role_id = r.role_id
    WHERE t.school_id = $1 AND t.school_teacher_id=$2
  `;

  const result = await pool.query(SelectQuery, data);
  return result;
};
export const getAllteachersAtSchoolAndFreeQuery = async (data) => {
  const query = `SELECT 
        t.teacher_id,
        t.school_teacher_id,
        t.teacher_name, 
        t.contact_number,
        sc.subject_code_name,
        t.at_school,
        l.level_name,
        has_class_now
        From
        teachers t
        INNER JOIN subject_code sc ON t.subject_code_id = sc.subject_code_id
        INNER JOIN level l ON t.level_id = l.level_id
        WHERE t.at_school='yes' AND t.has_class_now ='no' AND t.school_id=$1 
    
    `;
  const result = await pool.query(query, data);
  return result;
};
