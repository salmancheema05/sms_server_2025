import { pool } from "../dbConnection.js";
export const insertQuery = async (data) => {
  const query = `INSERT INTO institute_classes  
                    (school_id, creator_id, class_id,session_id,group_id,level_id)
                    VALUES ($1,$2,$3,$4,$5,$6) RETURNING institute_class_id
                `;
  const result = await pool.query(query, data);
  return result;
};
export const asignInsertQuery = async (data) => {
  const query = `INSERT INTO subjectsasigntoclass 
                    (class_id,school_id,subject_id)  
                    VALUES ($1,$2,$3)
                `;
  const result = await pool.query(query, data);
  return result;
};
export const selectAllClassesQuery = async (data) => {
  const SelectQuery = `
    SELECT 
      c.school_class_id,
      c.school_class_name,
      s.session_id,
      s.session_name,
      cg.group_id,
      cg.group_name,
      array_agg(
        json_build_object(
          'id', sb.subject_id,
          'name', sb.subject_name,
          'board_or_writer_name', sb.board_or_writer_name
        )
      ) AS subjects,
      r.role_id AS creator_role_id,
      r.role_name AS creator_role
    FROM 
      subjectsasigntoclass sac
      INNER JOIN institute_classes ic ON sac.class_id = ic.institute_class_id
      INNER JOIN classes c ON ic.class_id = c.school_class_id
      INNER JOIN subjects sb ON sac.subject_id = sb.subject_id
      INNER JOIN session s ON ic.session_id = s.session_id
      INNER JOIN class_group cg ON ic.group_id = cg.group_id
      INNER JOIN users u ON ic.creator_id = u.user_id
      INNER JOIN roles r ON u.user_role_id = r.role_id
    WHERE 
      ic.school_id = $1 AND sb.school_id = $1
    GROUP BY 
      c.school_class_id, c.school_class_name,
      s.session_id, s.session_name,
      cg.group_id, cg.group_name,
      r.role_id, r.role_name
  `;
  const result = await pool.query(SelectQuery, data);
  return result;
};
export const existOrNotClassQuery = async (data) => {
  const query = `SELECT 1 FROM institute_classes 
                WHERE class_id = $1 AND session_id = $2 AND group_id = $3 AND school_id =$4 AND
                 level_id=$5
                `;
  const result = await pool.query(query, data);
  return result;
};
