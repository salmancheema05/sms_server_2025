import {
  getSchoolTimeQuery,
  insertSchoolTimeQuery,
  timeassigntoclassesQuery,
} from "../models/schooltime.js";

export const createSchooltime = async (req, res) => {
  try {
    const { school_id, creator_id, start_time, end_time } = req.body;
    if (
      school_id == "" ||
      creator_id == "" ||
      start_time == "" ||
      end_time == ""
    ) {
      res.status(200).json({
        message: "school_id, creator_id, start_time, end_time are required",
        error: true,
      });
    } else {
      const result = await insertSchoolTimeQuery([
        school_id,
        creator_id,
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
    const { school_id } = req.query;
    if (school_id === undefined) {
      res.status(200).json({
        message: "required school_id query parameters",
        error: true,
        status: 400,
      });
    } else {
      const result = await getSchoolTimeQuery([school_id]);
      const timeData = result.rows[0];
      const startTime = timeData?.start_time || null;
      const endTime = timeData?.end_time || null;
      if (startTime != null && endTime != null) {
        const objectTime = {
          start_time: convertTo12Hour(timeData.start_time),
          end_time: convertTo12Hour(timeData.end_time),
        };
        const obj = {
          school_time_id: timeData.school_time_id,
          time: objectTime.start_time + " - " + objectTime.end_time,
        };
        res.status(200).json({ result: obj, error: false });
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
export const assignTimeToClass = async (req, res) => {
  try {
    const { school_id, school_time_id, institute_class_id, creator_id } =
      req.body;
    if (
      !school_id || // catches undefined, null, or empty string
      !creator_id ||
      !school_time_id ||
      !institute_class_id
    ) {
      res.status(200).json({
        message:
          "school_id,creator_id,school_time_id,institute_class_id any parameters is missing ",
        error: true,
        status: 400,
      });
    } else if (
      school_id == "" ||
      institute_class_id.length == 0 ||
      creator_id == "" ||
      school_time_id == ""
    ) {
      res.status(200).json({
        message:
          "required school_id , creator_id,school_time_id,institute_class_id array of object parameters",
        error: true,
        status: 400,
      });
    } else {
      for (let i = 0; i <= institute_class_id.length - 1; i++) {
        const instituteClassId = institute_class_id[i];
        await timeassigntoclassesQuery([
          school_id,
          creator_id,
          school_time_id,
          instituteClassId,
        ]);
      }
      res
        .status(200)
        .json({ message: "assigned school time to classes", error: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
