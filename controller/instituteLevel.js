import { fetchAllLevelQuery } from "../models/level.js";

export const getAllLevel = async (req, res) => {
  try {
    const result = await fetchAllLevelQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log("getAlllevel error in instituteLevel controller");
    res.status(500).json({ message: "internal server error", error: true });
  }
};
