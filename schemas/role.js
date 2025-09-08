import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createRoleTable = async () => {
  try {
    const createRoleTable = `
            CREATE TABLE roles(
                role_id SERIAL PRIMARY KEY,
                role_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            ) 
        `;
    const result = await existsTable("roles");
    if (result) {
      console.log("Roles Table already exists");
    } else {
      await pool.query(createRoleTable);
      console.log("Roles table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
