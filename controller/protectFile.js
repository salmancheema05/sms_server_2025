import path from "path";
import fs from "fs";
export const file = (req, res) => {
  try {
    let { filename } = req.params;
    const { foldername } = req.query;
    const imagePath = path.resolve(`uploadimages/${foldername}`, filename);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.sendFile(imagePath);
  } catch (error) {
    console.log("file error", error);
  }
};
