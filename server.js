// server.js
import express from "express";
import cors from "cors";
import { connectdb } from "./dbConnection.js";
import { createSchoolDetailTable } from "./schemas/SchoolDetail.js";
import { createRoleTable } from "./schemas/role.js";
import { createUsersTable } from "./schemas/users.js";
import { createGenderTable } from "./schemas/gender.js";
import route from "./routes.js";
import { createSessionTable } from "./schemas/Session.js";
import { createClassesTable } from "./schemas/classes.js";
import { createClassGroupTable } from "./schemas/classGroup.js";
import { creatInstituteClassTable } from "./schemas/instituteClass.js";
import { createBloodGroupTable } from "./schemas/bloodgroup.js";
import { createMaritalStatusTable } from "./schemas/maritalStatus.js";
import { createTeachersTable } from "./schemas/teachers.js";
import dotenv from "dotenv";
import { createSubjectsTable } from "./schemas/subjects.js";
import { createSubjectsAssignToClassTable } from "./schemas/subjectAssignToClass.js";
import { createLevelTable } from "./schemas/level.js";
import { createSubjectCodeTable } from "./schemas/subjectCode.js";
import { createTeacherAssignClassesAndSubjectTable } from "./schemas/teacherassignclassesandsubject.js";
import { createSchoolTimeTable } from "./schemas/schooltime.js";
import { createSessionAssignWithClass } from "./schemas/sessionAssignWithClass.js";
import { createDaysTable } from "./schemas/days.js";
import { createSchoolTimeAssignToClassesTable } from "./schemas/schooltimeassigntoclasses.js";

dotenv.config();
const app = express();
const port = process.env.Port;
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(route);
// Test Route
app.get("/", (req, res) => {
  res.send("✅ CORS-enabled Express Server running with ES6 syntax");
});

connectdb();
createSchoolDetailTable();
createRoleTable();
createUsersTable();
createGenderTable();
createSessionTable();
createClassesTable();
createClassGroupTable();
creatInstituteClassTable();
createBloodGroupTable();
createMaritalStatusTable();
createTeachersTable();
createSubjectsTable();
createSubjectsAssignToClassTable();
createLevelTable();
createSubjectCodeTable();
createTeacherAssignClassesAndSubjectTable();
createSchoolTimeTable();
createSessionAssignWithClass();
createDaysTable();
createSchoolTimeAssignToClassesTable();
// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
