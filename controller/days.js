import { getDaysQuery } from "../models/days.js";

export const getAllDays = async (req, res) => {
  try {
    const result = await getDaysQuery();
    res.status(200).json({ result: result.rows, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error: true });
  }
};
