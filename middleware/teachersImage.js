import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: "./upload/teachers/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadTeacherPicture = multer({ storage });
