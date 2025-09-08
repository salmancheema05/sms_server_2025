import {
  accessTokenSaveQuery,
  getUserDataQuery,
  refreshTokenDeleteQuery,
  refreshTokenSaveQuery,
  refreshTokenUpdateQuery,
  tokenDeleteQuery,
} from "../models/login.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const expiredTime = "1m";
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await getUserDataQuery([email]);
    if (result.rowCount === 1) {
      const ChackedhashedPassword = await checkedPassword(
        password,
        result.rows[0]
      );
      if (ChackedhashedPassword) {
        res.status(200).json(ChackedhashedPassword);
      } else {
        res
          .status(400)
          .json({ message: "Invalid email or password", error: true });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid email or password", error: true });
    }
  } catch (error) {
    console.log("userlogin error in userLogin Controller", error);
    res.status(500).json({
      message:
        "Internal Server Error userLoginFunction in userLogin controller",
    });
  }
};
const checkedPassword = async (userPassword, data) => {
  const hashedPassword = data.password;
  const result = await bcrypt.compare(userPassword, hashedPassword);
  if (result) {
    return loginToken(data);
  } else {
    return false;
  }
};
const loginToken = async (data) => {
  delete data.email;
  delete data.password;
  const accessToken = await jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: expiredTime,
  });
  const refreshToken = await jwt.sign(data, process.env.SECRET_KEY);
  const getAccessToken = await accessTokenSave(accessToken, data.user_id);
  const getRefreshToken = await refreshTokenSave(refreshToken, data.user_id);
  const message = { message: getAccessToken, refreshToken: getRefreshToken };
  return message;
};
const accessTokenSave = async (accessToken, user_id) => {
  const result = await accessTokenSaveQuery([accessToken, user_id]);
  const arrayToken = result.rows[0].token;
  const newTokenlastIndex = arrayToken.length - 1;
  const latestToken = arrayToken[newTokenlastIndex];
  return latestToken;
};
const refreshTokenSave = async (accessToken, user_id) => {
  const result = await refreshTokenSaveQuery([accessToken, user_id]);
  const arrayToken = result.rows[0].refresh_token;
  const newTokenlastIndex = arrayToken.length - 1;
  const latestToken = arrayToken[newTokenlastIndex];
  return latestToken;
};
export const createNewToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedData = jwt.decode(refreshToken);
    delete decodedData.iat;
    const newrefreshToken = await jwt.sign(decodedData, process.env.SECRET_KEY);
    const refreshTokenSave = await refreshTokenUpdateQuery([
      refreshToken,
      newrefreshToken,
      decodedData.user_id,
    ]);
    const newaccessToken = await jwt.sign(decodedData, process.env.SECRET_KEY, {
      expiresIn: expiredTime,
    });
    const accessTokenSave = await accessTokenSaveQuery([
      newaccessToken,
      decodedData.user_id,
    ]);
    res.status(200).json({
      message: accessTokenSave.rows[0].token[0],
      refreshToken: refreshTokenSave.rows[0].refresh_token[0],
      error: false,
    });
  } catch (error) {
    console.error("createNewToken function in userLogin controller", error);
  }
};
export const userLogout = async (req, res) => {
  try {
    const { token, refreshToken } = req.body;
    const decodedData = jwt.decode(token);
    const tokenDelete = await tokenDeleteQuery([token, decodedData.user_id]);
    const refreshtokenDelete = await refreshTokenDeleteQuery([
      refreshToken,
      decodedData.user_id,
    ]);
    if (tokenDelete.rowCount === 1 && refreshtokenDelete.rowCount === 1) {
      res.status(200).json({ message: "you have been logout", error: false });
    }
  } catch (error) {
    console.error("logout function in userLogin controller", error);
  }
};
