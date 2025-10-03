import {
  CheckExistSubjectQuery,
  createSubjectCodeQuery,
  fetchallSubjectCode,
  subjectCodeExistOrNot,
  subjectInsertQuery,
} from "../models/subject.js";
import OpenAI from "openai";
import "dotenv/config";
export const createSubject = async (req, res) => {
  try {
    const { school_id, subjects, level } = req.body;
    const subjectExists = await checkSubjectExists(school_id, subjects);
    if (subjectExists) {
      res
        .status(200)
        .json({ message: "This subject already exists", error: false });
    } else {
      for (let i = 0; i <= subjects.length - 1; i++) {
        const data = subjects[i];

        await subjectInsertQuery([
          school_id,
          data.subject_name,
          data.board_or_writer_name,
          level,
          data.subject_code,
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
  let status = false;
  for (let i = 0; i <= subjectarray.length - 1; i++) {
    const data = subjectarray[i];
    const result = await CheckExistSubjectQuery([data.subject_name, school_id]);
    if (result.rowCount > 0) {
      status = true;
    }
  }
  return status;
};
export const createSubjectCodeByAi = async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const chatCompletion = await openai.responses.create({
      input: "apple color is",
      model: "gpt-4o-mini",
    });
    console.log(chatCompletion.output_text);
  } catch (error) {
    console.log("error in createSubjectCodeByAi in subject controller", error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
export const createSubjectCode = async (req, res) => {
  try {
    const { school_id, subject_code_name } = req.body;
    const checkExist = await subjectCodeExistOrNot([
      school_id,
      subject_code_name,
    ]);
    if (checkExist.rowCount == 1) {
      res
        .status(200)
        .json({ message: "subject code already exists", error: false });
    } else {
      const result = await createSubjectCodeQuery([
        school_id,
        subject_code_name,
      ]);
      if (result.rowCount) {
        res
          .status(200)
          .json({ message: "subject code has been created", error: false });
      }
    }
  } catch (error) {
    console.log("error in createSubjectCode in subject controller", error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
export const fetchSubjectcode = async (req, res) => {
  try {
    const { school_id } = req.query;
    const result = await fetchallSubjectCode([school_id]);
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log("fetchSubjectcode error in subject controller", error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
