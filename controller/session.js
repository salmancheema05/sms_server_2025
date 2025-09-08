import { fetchAllSessionQuery } from "../models/session.js";

export const fetchAllSession = async (req, res) => {
  try {
    const result = await fetchAllSessionQuery();
    res.status(200).json({ message: result.rows, error: false });
  } catch (error) {
    console.error("fetchallSession error in Session Controller", error);
  }
};
