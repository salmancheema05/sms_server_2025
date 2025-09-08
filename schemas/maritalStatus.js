import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createMaritalStatusTable = async () => {
  try {
    const createMaritalStatusTable = `
            CREATE TABLE marital_status(
                marital_status_id SERIAL PRIMARY KEY,
                marital_status TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            ) 
        `;
    const result = await existsTable("marital_status");
    if (result) {
      console.log("marital status Table already exists");
    } else {
      await pool.query(createMaritalStatusTable);
      console.log("marital status table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
