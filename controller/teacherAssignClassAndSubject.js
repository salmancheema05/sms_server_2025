import {
  assignQuery,
  checkSubujectHasTeacherOrNotQuery,
  getClassForAssignTeachersQuery,
} from "../models/teacherAssignClassAndSubject.js";

export const fetchClassAndSubjectHasNoTeacher = async (req, res) => {
  try {
    const { school_id, subject_code_name, level_name } = req.query;
    if (!school_id || !subject_code_name || !level_name) {
      res
        .status(400)
        .json({ message: "Missing required query parameters", error: false });
    } else {
      const result = await getClassForAssignTeachersQuery([
        school_id,
        subject_code_name,
        level_name,
      ]);
      let data = [];
      for (let i = 0; i <= result.rows.length - 1; i++) {
        const assignID = result.rows[i].subject_assign_to_class_id;
        const checked = await checkSubujectHasTeacherOrNotQuery([
          school_id,
          assignID,
        ]);
        if (checked.rowCount === 0) {
          data.push(result.rows[i]);
        }
      }
      if (data.length > 0) {
        res.status(200).json({ result: data, error: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const teacherAssignToClassAndSubject = async (req, res) => {
  try {
    const { school_id, teacher_id, user_id, class_subject_id } = req.body;
    if (
      school_id == "" ||
      teacher_id == "" ||
      user_id == "" ||
      class_subject_id == ""
    ) {
      res.status(400).json({
        message:
          "school_id, teacher_id, user_id, class_subject_id parameters are required",
        error: true,
      });
    } else {
      const result = await assignQuery([
        school_id,
        class_subject_id,
        teacher_id,
        user_id,
      ]);
      if (result.rowCount == 1) {
        res
          .status(200)
          .json({ message: "teacher has been assigned ", error: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
