import {
  getAllteachersAtSchoolAndFreeQuery,
  insertQuery,
  selectAllTeachersQuery,
  selectTeacherQuery,
  totalTeacherOfSchool,
} from "../models/teachers.js";
import path from "path";

export const addTeacher = async (req, res) => {
  try {
    const image = req.file;
    const {
      joining_date,
      teacher_salary,
      job_type,
      teacher_name,
      spouse,
      marital_status,
      nic_number,
      contact_number,
      choose_gender,
      choose_blood_group,
      current_adress,
      email,
      subject,
      qualification,
      school_id,
      creator_id,
      level,
    } = req.body;
    const imageExists = existImage(image);
    const newTeacherID = await createTeacherID(school_id);
    const filename = path.basename(imageExists);
    const result = await insertQuery([
      school_id,
      creator_id,
      marital_status,
      choose_blood_group,
      choose_gender,
      teacher_name,
      spouse,
      nic_number,
      contact_number,
      email,
      filename,
      joining_date,
      teacher_salary,
      current_adress,
      job_type,
      subject,
      "no",
      "no",
      qualification,
      newTeacherID,
      level,
    ]);
    if (result.rowCount === 1) {
      res
        .status(200)
        .json({ message: "teacher Detail has been entered", error: false });
    }
  } catch (error) {
    console.log("error in addTeacher function in teachers controllers", error);
    res.status(500).json({ message: "internal error by server" });
  }
};
const existImage = (image) => {
  if (image === undefined) {
    return "no image";
  } else {
    return image.path;
  }
};
export const createTeacherID = async (school_id) => {
  const result = await totalTeacherOfSchool([school_id]);
  const totalCount = Number(result.rows[0].total_teachers);
  const createId = totalCount + 1;
  return createId;
};
export const fetchAllTeachers = async (req, res) => {
  try {
    const { school_id } = req.query;
    const result = await selectAllTeachersQuery([school_id]);
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log("getAllTeacher error in teacher controller", error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
export const allDataOfteacher = async (req, res) => {
  try {
    const { school_id, school_teacher_id } = req.query;
    const result = await selectTeacherQuery([school_id, school_teacher_id]);
    const data = result.rows[0];
    res.status(200).json({ result: data, error: false });
  } catch (error) {
    console.log(
      "error in allDataOfteacher function in teachers controllers",
      error
    );
    res.status(500).json({ message: "internal error by server" });
  }
};
export const getAllTeachersAtInstituteAndFree = async (req, res) => {
  try {
    const { school_id } = req.query;
    const result = await getAllteachersAtSchoolAndFreeQuery([school_id]);
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log(error);
  }
};
