import { pool } from "../dbConnection.js";
export const subjectInsertQuery = async (data) => {
  const query = `INSERT INTO subjects 
                    (school_id, subject_name,board_or_writer_name,level_id,subject_code_id)
                    VALUES ($1,$2,$3,$4,$5) RETURNING subject_id
                `;
  const result = await pool.query(query, data);
  return result;
};
export const CheckExistSubjectQuery = async (data) => {
  const query = `SELECT * FROM subjects WHERE subject_name = $1 AND school_id = $2 `;
  const result = await pool.query(query, data);
  return result;
};
export const getAllSubjectOfClassQuery = async (data) => {
  const query = `SELECT subject_id,subject_name FROM subjects WHERE subject_name LIKE $1 AND school_id= $2`;
  data[0] = `%${data[0]}%`;
  const result = await pool.query(query, data);
  return result;
};
export const createSubjectCodeQuery = async (data) => {
  const query = `INSERT INTO subject_code (school_id, subject_code_name) VALUES ($1,$2)`;
  const result = await pool.query(query, data);
  return result;
};
export const subjectCodeExistOrNot = async (data) => {
  const query =
    "SELECT * From subject_code WHERE  school_id =$1 AND subject_code_name =$2";
  const result = await pool.query(query, data);
  return result;
};
export const fetchallSubjectCode = async (data) => {
  const query =
    "SELECT  subject_code_id,subject_code_name From subject_code WHERE school_id =$1";
  const result = await pool.query(query, data);
  return result;
};
export const fetchSubjectByClass = async (data) => {
  const query = `
       SELECT 
       s.subject_id,
       s.subject_name
       FROM
       institute_classes ic
       INNER JOIN subjectsassigntoclass sc ON ic.institute_class_id = sc.class_id
       INNER JOIN subjects s ON sc.subject_id = s.subject_id
       WHERE
       sc.class_id = $1 AND sc.school_id = $2
    `;
  const result = await pool.query(query, data);
  return result;
};
