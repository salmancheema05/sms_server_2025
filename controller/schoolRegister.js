import {
  checkEmailExists,
  schoolRegisterDataInsertQuery,
  UserLoginDataInsertQuery,
} from "../models/schoolRegister.js";
import bcrypt from "bcrypt";

export const schoolregister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      school_name,
      phone_number,
      adress,
      user_role_id,
      user_gender,
    } = req.body;

    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === "" ||
      school_name === "" ||
      phone_number === "" ||
      adress === "" ||
      user_role_id === "" ||
      user_gender === ""
    ) {
      res.status(200).json({ message: "All fields are required", error: true });
    } else {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        res
          .status(200)
          .json({ message: "you email already exists", error: true });
      } else {
        const result = await schoolRegisterDataInsertQuery([
          school_name,
          email,
          phone_number,
          adress,
        ]);
        if (result.rowCount === 1) {
          const userData = [
            {
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: password,
              user_role_id: user_role_id,
              user_gender_id: user_gender,
              school_id: result.rows[0].school_id,
            },
          ];
          const saveData = await userDataInsert(userData);
          res
            .status(saveData.code)
            .json({ message: saveData.message, error: saveData.error });
        } else {
          res.status(500).json({
            message: "schoolRegisterDataInsertQuery Query error in server",
            error: true,
          });
        }
      }
    }
  } catch (error) {
    console.error("register function in schoolRegister Controller", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};
const userDataInsert = async (userData) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      user_role_id,
      user_gender_id,
      school_id,
    } = userData[0];
    const newPassword = await hashPassword(password);
    const result = await UserLoginDataInsertQuery([
      school_id,
      user_role_id,
      user_gender_id,
      first_name,
      last_name,
      email,
      newPassword,
      "active",
      "active",
    ]);
    if (result.rowCount === 1) {
      const clientMessage = {
        code: 200,
        message: "you have been registered successfully",
        error: false,
      };
      return clientMessage;
    }
  } catch (error) {
    console.error("UserDataInsert in schoolRegister Controller", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("UserDataInsert in schoolRegister Controller", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};
