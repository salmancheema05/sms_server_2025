import {
  getSchoolTimeQuery,
  insertSchoolTimeQuery,
} from "../models/schooltime.js";

export const createSchooltime = async (req, res) => {
  try {
    const { school_id, institute_class_id, creator_id, start_time, end_time } =
      req.body;
    if (
      school_id == "" ||
      institute_class_id == "" ||
      creator_id == "" ||
      start_time == "" ||
      end_time == ""
    ) {
      res.status(400).json({
        message:
          "school_id, institute_class_id, creator_id, start_time, end_time are required",
        error: true,
      });
    } else {
      const result = await insertSchoolTimeQuery([
        school_id,
        creator_id,
        institute_class_id,
        start_time,
        end_time,
      ]);
      if (result.rowCount == 1) {
        res.status(200).json({
          message: "school class time has been created",
          error: false,
        });
      }
    }
  } catch (error) {
    console.log("createSchoolTime error in school time controller", error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
export const getSchooltimeByQuery = async (req, res) => {
  try {
    const { school_id, institute_class_id } = req.query;
    if (school_id === undefined || institute_class_id === undefined) {
      res.status(200).json({
        message: "required school_id, institute_class_id query parameters",
        error: true,
        status: 400,
      });
    } else {
      const result = await getSchoolTimeQuery([institute_class_id, school_id]);
      const timeData = result.rows[0];
      const startTime = timeData?.start_time || null;
      const endTime = timeData?.end_time || null;
      if (startTime != null && endTime != null) {
        const objectTime = {
          start_time: convertTo12Hour(timeData.start_time),
          end_time: convertTo12Hour(timeData.end_time),
        };
        res.status(200).json({ result: objectTime, error: false });
      } else {
        res.status(200).json({ result: null, error: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
const convertTo12Hour = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12; // Convert 0 → 12 for midnight, 13 → 1, etc.
  return `${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${period}`;
};
