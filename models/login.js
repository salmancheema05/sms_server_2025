import { pool } from "../dbConnection.js";

export const getUserDataQuery = async (data) => {
  const query = `
    SELECT 
      schoolregister.school_id,
      roles.role_id,
      gender.gender_id,
      schoolregister.school_name,
      roles.role_name,
      gender.gender_name,
      users.user_id,
      users.first_name,
      users.last_name,
      users.email,
      users.password
    FROM users 
    INNER JOIN schoolregister ON users.school_id = schoolregister.school_id
    INNER JOIN roles ON users.user_role_id = roles.role_id
    INNER JOIN gender ON users.user_gender = gender.gender_id
    WHERE users.email = $1
  `;
  const result = await pool.query(query, data);
  return result;
};
export const accessTokenSaveQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET token = ARRAY_APPEND(token, $1 )
    WHERE "user_id" = $2 RETURNING token`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const refreshTokenSaveQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET refresh_token = ARRAY_APPEND(refresh_token, $1 )
    WHERE "user_id" = $2 RETURNING refresh_token`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const refreshTokenUpdateQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET refresh_token = array_replace(refresh_token,$1,$2)
    WHERE user_id = $3 RETURNING refresh_token`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const accessTokenUpdateQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET token = array_replace(token,$1,$2)
    WHERE "user_id" = $3 RETURNING token`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const refreshTokenDeleteQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET refresh_token = array_remove(refresh_token,$1)
    WHERE user_id = $2`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const tokenDeleteQuery = async (data) => {
  try {
    const tokenSaveQuery = `UPDATE users SET token = array_remove(token,$1)
    WHERE user_id = $2`;
    return await pool.query(tokenSaveQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const tokenRemove = async (data) => {
  try {
    const tokenQuery = `UPDATE users SET token = array_remove(token , $1 ) WHERE "user_id" = $2`;
    return await pool.query(tokenQuery, data);
  } catch (error) {
    console.log(error);
  }
};
export const getUserTokens = async (data) => {
  try {
    const tokenQuery = `SELECT token,refresh_token FROM users WHERE "user_id" = $1`;
    return await pool.query(tokenQuery, data);
  } catch (error) {
    console.log(error);
  }
};
