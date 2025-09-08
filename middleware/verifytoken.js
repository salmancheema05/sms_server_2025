import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { tokenRemove } from "../models/login.js";
dotenv.config();
export const verifyUserToken = (req, res, next) => {
  const tokenKey = process.env.SECRET_KEY;
  let token = req.headers["authorizated"];
  if (!token) {
    return res
      .status(400)
      .send({ message: "Please provide token", error: true });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, tokenKey, async (error) => {
      if (error) {
        const decoded = jwt.decode(token);
        await tokenRemove([token, decoded.user_id]);
        return res.status(200).send({ message: "unauthorizated", error: true });
      } else {
        next();
      }
    });
  }
};
