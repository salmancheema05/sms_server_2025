import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createUsersTable = async () => {
  try {
    const createUserTable = `
            CREATE TABLE users(
                school_id INT NOT NULL,
                user_role_id INT NOT NULL,
                user_gender INT NOT NULL,
                user_id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE, 
                password TEXT NOT NULL,
                token TEXT[],
                refresh_token Text[],
                login_status TEXT NOT NULL,
                school_active TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP,
                FOREIGN KEY (school_id) REFERENCES schoolregister(school_id),
                FOREIGN KEY (user_role_id) REFERENCES roles(role_id),
                FOREIGN KEY (user_gender) REFERENCES gender(gender_id)
            ) 
        `;
    const result = await existsTable("users");
    if (result) {
      console.log("Users Table already exists");
    } else {
      await pool.query(createUserTable);
      console.log("Users table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
