import { getClassesQuery } from "../models/classes.js";

export const fetchAllClasses = async (req, res) => {
  try {
    const result = await getClassesQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllGender error in gender Controller", error);
  }
};
