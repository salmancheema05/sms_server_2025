import { pool } from "../dbConnection.js";
import existsTable from "./exisitsTable.js";
export const createSchoolDetailTable = async () => {
  try {
    const createSchoolDetailTable = `
            CREATE TABLE schoolregister(
                school_id SERIAL PRIMARY KEY,
                school_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone_number TEXT  NOT NULL,
                adress TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            )
        `;
    const result = await existsTable("schoolregister");
    if (result) {
      console.log("school Register Table already exists");
    } else {
      await pool.query(createSchoolDetailTable);
      console.log("school Register table has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
