import { getGroupQuery } from "../models/classGroup.js";

export const fetchAllGroup = async (req, res) => {
  try {
    const result = await getGroupQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllGender error in gender Controller", error);
  }
};
