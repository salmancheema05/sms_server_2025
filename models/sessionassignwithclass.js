import { pool } from "../dbConnection.js";
export const sessionInsertQuery = async (data) => {
  const query = `INSERT INTO sessionassignwithclass 
    (school_id,session_id,institute_class_id) VALUES ($1,$2,$3)`;
  const result = await pool.query(query, data);
  return result;
};
export const existOrNotSessionQuery = async (data) => {
  const query = `SELECT 1 FROM sessionassignwithclass 
                WHERE school_id = $1  AND session_id = $2 AND institute_class_id =$3`;
  const result = await pool.query(query, data);
  return result;
};
