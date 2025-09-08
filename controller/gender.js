import { getGenderQuery } from "../models/gender.js";

export const fetchAllGender = async (req, res) => {
  try {
    const result = await getGenderQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllGender error in gender Controller", error);
  }
};
