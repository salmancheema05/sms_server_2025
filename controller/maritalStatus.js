import { getMaritalStatusQuery } from "../models/martialStatus.js";

export const fetchAllMaritalStatus = async (req, res) => {
  try {
    const result = await getMaritalStatusQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllMaritalStatus error in maritalStatus controller");
    res.status(404).json({ message: "internal error by server", error: true });
  }
};
