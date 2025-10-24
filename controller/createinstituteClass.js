import {
  assignInsertQuery,
  existOrNotClassQuery,
  fetchAllclassesForSelectBoxQuery,
  insertQuery,
  selectAllClassesQuery,
} from "../models/createinstituteclass.js";
import {
  existOrNotSessionQuery,
  sessionInsertQuery,
} from "../models/sessionassignwithclass.js";
import { getAllSubjectOfClassQuery } from "../models/subject.js";

export const createInstituteClass = async (req, res) => {
  try {
    const {
      school_id,
      creator_id,
      class_id,
      session_id,
      group_id,
      subjects,
      level,
    } = req.body;
    if (
      school_id == "" ||
      creator_id == "" ||
      class_id == "" ||
      session_id == "" ||
      group_id == "" ||
      subjects.length == 0 ||
      level == ""
    ) {
      res.status(200).json({
        message:
          "school_id,creator_id,class_id,session_id,group_id are required",
        error: true,
      });
    }
    const classExist = await existOrNotClassQuery([
      class_id,
      group_id,
      school_id,
      level,
    ]);
    const existClass_id = classExist.rows[0]?.institute_class_id || null;
    const sessionExists = await existOrNotSessionQuery([
      school_id,
      session_id,
      existClass_id,
    ]);

    if (classExist.rowCount > 0 && sessionExists.rowCount > 0) {
      return res.status(200).json({
        message: "Your class has already been created",
        error: false,
      });
    } else if (existClass_id != null) {
      await sessionInsertQuery([school_id, session_id, existClass_id]);
      res
        .status(200)
        .json({ message: "Create New session of exist class", error: false });
    } else {
      const result = await insertQuery([
        school_id,
        creator_id,
        class_id,
        group_id,
        level,
      ]);
      const classID = result.rows[0].institute_class_id;
      for (let subjectId of subjects) {
        await assignInsertQuery([classID, school_id, subjectId]);
      }
      await sessionInsertQuery([school_id, session_id, classID]);
      res
        .status(200)
        .json({ message: "your class has been created", error: false });
    }
  } catch (error) {
    console.log(
      "create Institute class error in createInstituteClass function and controller",
      error
    );
    res.status(404).json({
      message: "internal server error in createInstituteClass ",
      error: true,
    });
  }
};
export const fetchAllInstituteClasses = async (req, res) => {
  try {
    const { school_id } = req.query;
    const result = await selectAllClassesQuery([school_id]);

    if (result.rowCount > 0) {
      res.status(200).json({ result: result.rows, error: false });
    } else {
      res.status(200).json({ message: "No classes", error: true });
    }
  } catch (error) {
    console.error(
      "error in getAllInstituteClasses in createinstituteClass controller",
      error
    );
    res.status(404).json({
      message:
        "internal server error in getAllInstituteClasses function in createinstituteClass controller ",
      error: true,
    });
  }
};
export const findAllSubjectsofclass = async (req, res) => {
  try {
    const { subject_name, school_id } = req.query;
    const result = await getAllSubjectOfClassQuery([subject_name, school_id]);
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log(
      "error in findAllSubjectOfClass in createinstituteclass controller",
      error
    );
    res.status(200).json({ message: "internal server error", error: true });
  }
};
export const fetchAllClassesForSelectBox = async (req, res) => {
  try {
    const { school_id } = req.query;
    if (!school_id || isNaN(school_id)) {
      res.status(200).json({
        message: "school_id query is required",
        error: true,
        status: 400,
      });
    } else {
      const result = await fetchAllclassesForSelectBoxQuery([school_id]);
      res.status(200).json({ result: result.rows, error: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
