import {
  asignInsertQuery,
  insertQuery,
  selectAllClassesQuery,
} from "../models/createinstituteclass.js";

export const createInstituteClass = async (req, res) => {
  try {
    const { school_id, creator_id, class_id, session_id, group_id, subjects } =
      req.body;
    if (
      school_id &&
      creator_id &&
      class_id &&
      session_id &&
      session_id &&
      group_id &&
      subjects.length == 0
    ) {
      res.status(200).json({ message: "all field required", error: true });
    } else {
      const result = await insertQuery([
        school_id,
        creator_id,
        class_id,
        session_id,
        group_id,
      ]);
      const classID = result.rows[0].institute_class_id;
      await subjectAsignToClass(subjectIds, classID);
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

// export const subjectAsignToClass = async (subjectIds, classID) => {
//   for (let i = 0; i <= subjectIds.length - 1; i++) {
//     const subjectID = subjectIds[i];
//     await asignInsertQuery([classID, subjectID]);
//   }
// };
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
