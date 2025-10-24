import { pool } from "../dbConnection.js";
export const fetchAllSessionQuery = async () => {
  const query = `SELECT * FROM session `;
  const result = await pool.query(query);
  return result;
};
export const getSessionByQuery = async (data) => {
  const query = `
    SELECT
        s.session_id,
        s.session_name
    FROM
       institute_classes ic
       INNER JOIN sessionassignwithclass sc ON ic.institute_class_id  = sc.institute_class_id  
       INNER JOIN session s ON sc.session_id  = s.session_id 
       WHERE
       ic.institute_class_id=$1 AND ic.school_id =$2
    `;
  const result = await pool.query(query, data);
  return result;
};
