import {
  CheckExistSubjectQuery,
  subjectInsertQuery,
} from "../models/subject.js";

export const createSubject = async (req, res) => {
  try {
    const { school_id, subjects } = req.body;
    const existSubject = await checkSubjectExists(school_id, subjects);
    if (existSubject) {
      res.status(200).json({
        message: "this subject are already created",
        error: false,
      });
    } else {
      for (let i = 0; i <= subjects.length - 1; i++) {
        const data = subjects[i];
        await subjectInsertQuery([
          school_id,
          data.subject_name,
          data.board_or_writer_name,
        ]);
      }
      res.status(200).json({
        message: "Subjects inserted successfully",
        error: false,
      });
    }
  } catch (error) {
    console.log(
      "error in create subject function in subject controller",
      error
    );
    res.stutus(500).json({ message: "internal server error", error: true });
  }
};
const checkSubjectExists = async (school_id, subjectarray) => {
  for (let i = 0; i <= subjectarray.length - 1; i++) {
    const subject_name = subjectarray[i].subject_name;
    const result = await CheckExistSubjectQuery([subject_name, school_id]);
    if (result.rowCount > 0) {
      return true;
    }
  }
};
