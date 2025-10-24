import { pool } from "../dbConnection.js";
export const insertSchoolTimeQuery = async (data) => {
  const query = `INSERT INTO school_time 
     (school_id,creator_id,institute_class_id,start_time,end_time)
     VALUES ($1,$2,$3,$4,$5)
     `;
  const result = await pool.query(query, data);
  return result;
};
export const getSchoolTimeQuery = async (data) => {
  const query = `SELECT start_time,end_time From school_time
     WHERE institute_class_id = $1 AND school_id = $2 
    `;
  const result = await pool.query(query, data);
  return result;
};
