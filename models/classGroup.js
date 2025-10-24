import { pool } from "../dbConnection.js";
export const getGroupQuery = async (data) => {
  const query = `Select * from class_group`;
  const result = await pool.query(query, data);
  return result;
};
export const getClassGroupByQuery = async (data) => {
  const query = `
    SELECT
        cg.group_id,
        cg.group_name
    FROM
       institute_classes ic
       INNER JOIN class_group cg ON ic.group_id  = cg.group_id  
       WHERE
       ic.institute_class_id=$1 AND ic.school_id =$2
    `;
  const result = await pool.query(query, data);
  return result;
};
