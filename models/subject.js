import { pool } from "../dbConnection.js";
export const subjectInsertQuery = async (data) => {
  const query = `INSERT INTO subjects 
                    (school_id, subject_name,board_or_writer_name)
                    VALUES ($1,$2,$3) RETURNING subject_id
                `;
  const result = await pool.query(query, data);
  return result;
};
export const CheckExistSubjectQuery = async (data) => {
  const query = `SELECT * FROM subjects WHERE subject_name = $1 AND school_id= $2`;
  const result = await pool.query(query, data);
  return result;
};
export const getAllSubjectOfClassQuery = async (data) => {
  const query = `SELECT subject_id,subject_name FROM subjects WHERE subject_name LIKE $1 AND school_id= $2`;
  data[0] = `%${data[0]}%`;
  const result = await pool.query(query, data);
  return result;
};
