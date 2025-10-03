import express from "express";
import { schoolregister } from "./controller/schoolRegister.js";
import {
  createNewToken,
  userLogin,
  userLogout,
} from "./controller/userLogin.js";
import { fetchAllGender } from "./controller/gender.js";
import { verifyUserToken } from "./middleware/verifytoken.js";
import { fetchAllSession } from "./controller/session.js";
import { fetchAllClasses } from "./controller/classes.js";
import { fetchAllGroup } from "./controller/classGroup.js";
import {
  createInstituteClass,
  fetchAllInstituteClasses,
  findAllSubjectsofclass,
} from "./controller/createinstituteClass.js";
import { fetchAllBloodGroup } from "./controller/bloodGroup.js";
import { fetchAllMaritalStatus } from "./controller/maritalStatus.js";
import {
  addTeacher,
  allDataOfteacher,
  fetchAllTeachers,
  getAllTeachersAtInstituteAndFree,
} from "./controller/teachers.js";
import { uploadTeacherPicture } from "./middleware/teachersImage.js";
import { file } from "./controller/protectFile.js";
import {
  createSubject,
  createSubjectCode,
  createSubjectCodeByAi,
  fetchSubjectcode,
} from "./controller/subject.js";
import { getAllLevel } from "./controller/instituteLevel.js";
import {
  fetchClassAndSubjectHasNoTeacher,
  teacherAssignToClassAndSubject,
} from "./controller/teacherAssignClassAndSubject.js";
const route = express.Router();
// Post Route start
route.post("/api/schoolregister", schoolregister);
route.post("/api/userLogin", userLogin);
route.post("/api/createnewtoken", createNewToken);
// Post Route end

// Post Route start with user token
route.post("/api/userlogout", verifyUserToken, userLogout);
route.post("/api/createinstituteclass", verifyUserToken, createInstituteClass);
route.post(
  "/api/addteacher",
  verifyUserToken,
  uploadTeacherPicture.single("image"),
  addTeacher
);
route.post("/api/createsubject", verifyUserToken, createSubject);
route.post("/api/createsubjectcode", verifyUserToken, createSubjectCode);
route.post(
  "/api/assignteachertosubjectandclass",
  verifyUserToken,
  teacherAssignToClassAndSubject
);

// Post Route end with user token

// Get Route start with user token
route.get("/api/fetchalllevel", verifyUserToken, getAllLevel);
route.get("/api/fetchallSession", verifyUserToken, fetchAllSession);
route.get("/api/fetchallclasses", verifyUserToken, fetchAllClasses);
route.get("/api/fetchclassgroup", verifyUserToken, fetchAllGroup);
route.get("/api/fetchallinstituteclasses", fetchAllInstituteClasses);
route.get("/api/fetchallteachers", fetchAllTeachers);
route.get("/api/fetchallbloodgroup", verifyUserToken, fetchAllBloodGroup);
route.get("/api/fetchallmaritalstatus", verifyUserToken, fetchAllMaritalStatus);
route.get("/api/protectimage/:filename", verifyUserToken, file);
route.get("/api/getdetialofteacher", verifyUserToken, allDataOfteacher);
route.get(
  "/api/findallsubjectofclass",
  verifyUserToken,
  findAllSubjectsofclass
);
route.get(
  "/api/getclasssubjectshasnoteacher",
  verifyUserToken,
  fetchClassAndSubjectHasNoTeacher
);
route.get(
  "/api/getallteachersatschoolandfree",
  verifyUserToken,
  getAllTeachersAtInstituteAndFree
);
route.get("/api/dataai", createSubjectCodeByAi);
route.get("/api/fetchallsubjectcode", verifyUserToken, fetchSubjectcode);
// Get Route end with user token

// Get Route start
route.get("/api/fetchallgender", fetchAllGender);
// Get Route start end
export default route;
