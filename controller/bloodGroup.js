import { getBloodGroupQuery } from "../models/bloodGroup.js";

export const fetchAllBloodGroup = async (req, res) => {
  try {
    const result = await getBloodGroupQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllBloodGroup error in bloodGroupe controller");
    res.status(500).json({ message: "internal error by server" });
  }
};
