import { getClassGroupByQuery, getGroupQuery } from "../models/classGroup.js";

export const fetchAllGroup = async (req, res) => {
  try {
    const result = await getGroupQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.error("fetchAllGender error in gender Controller", error);
  }
};
export const fetchClassGroupBYQuery = async (req, res) => {
  try {
    const { school_id, institute_class_id } = req.query;
    if (school_id == "" || institute_class_id == "") {
      res.status(200).json({
        status: 400,
        error: true,
      });
    } else {
      const result = await getClassGroupByQuery([
        institute_class_id,
        school_id,
      ]);
      res.status(200).json({ result: result.rows, error: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
