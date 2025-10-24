import { fetchAllSessionQuery, getSessionByQuery } from "../models/session.js";

export const fetchAllSession = async (req, res) => {
  try {
    const result = await fetchAllSessionQuery();
    res.status(200).json({ message: result.rows, error: false });
  } catch (error) {
    console.error("fetchallSession error in Session Controller", error);
  }
};
export const fetchSessionBYQuery = async (req, res) => {
  try {
    const { school_id, institute_class_id } = req.query;
    if (school_id == "" || institute_class_id == "") {
      res.status(200).json({
        status: 400,
        error: true,
      });
    } else {
      const result = await getSessionByQuery([institute_class_id, school_id]);
      res.status(200).json({ result: result.rows, error: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
