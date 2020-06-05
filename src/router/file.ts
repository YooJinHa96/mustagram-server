import { Router, Request, Response } from "express";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})

const uploads = multer({
  storage
})

router.get('uploads', uploads.array("files"), (req: Request, res: Response) => {
  console.log(req.files);
});

export const fileRouter = router;