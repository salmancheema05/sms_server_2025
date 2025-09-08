import { pool } from "../dbConnection.js";
export const schoolRegisterDataInsertQuery = async (data) => {
  try {
    const insertQuery = `INSERT INTO schoolregister(school_name,email,phone_number,adress)
    VALUES ($1, $2, $3, $4)  RETURNING school_id`;
    return await pool.query(insertQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const UserLoginDataInsertQuery = async (data) => {
  try {
    const insertQuery = `INSERT INTO users(
    school_id,
    user_role_id,
    user_gender,
    first_name,
    last_name,
    email,
    password,
    login_status,
    school_active
    )
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9) `;
    return await pool.query(insertQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const checkEmailExists = async (email) => {
  const query = `SELECT email FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rowCount > 0;
};
