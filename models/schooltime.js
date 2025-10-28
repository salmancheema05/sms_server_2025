import { pool } from "../dbConnection.js";
export const insertSchoolTimeQuery = async (data) => {
  const query = `INSERT INTO school_time 
     (school_id,creator_id,start_time,end_time)
     VALUES ($1,$2,$3,$4)
     `;
  const result = await pool.query(query, data);
  return result;
};
export const getSchoolTimeQuery = async (data) => {
  const query = `SELECT school_time_id, start_time,end_time From school_time
     WHERE  school_id = $1
    `;
  const result = await pool.query(query, data);
  return result;
};
export const timeassigntoclassesQuery = async (data) => {
  const query = `INSERT INTO schooltimeassigntoclasses 
     (school_id,creator_id,school_time_id,institute_class_id)
     VALUES ($1,$2,$3,$4)
     `;
  const result = await pool.query(query, data);
  return result;
};
