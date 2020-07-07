import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const imageUpload = multer({
  storage : multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/images")
    },
    filename: (req, file, callback) => {
      const postNumber = req.body.postNumber;
      const extension = path.extname(file.originalname);
      callback(null, postNumber + extension);
    }
  })
});
const musicUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/music");
    },
    filename: (req, file, callback) => {
      const postNumber = req.body.postNumber;
      const extension = path.extname(file.originalname);
      callback(null, postNumber + extension);
    }
  })
});
const profileImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      console.log(req.body.id);
      callback(null, "./public/profile");
    },
    filename: (req, file, callback) => {
      const id = req.body.id;
      const extension = path.extname(file.originalname);
      callback(null, id + extension);
    }
  })
});

router.use((req, res, next) => {
  const publicPath = path.resolve("public");
  if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath);

  const musicPath = path.join(publicPath, "music");
  const imagePath = path.join(publicPath, "images");
  const profilePath = path.join(publicPath, "profile");
  if (!fs.existsSync(musicPath)) fs.mkdirSync(musicPath);
  if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath);
  if (!fs.existsSync(profilePath)) fs.mkdirSync(profilePath);

  next();
});

router.post("/music/upload", musicUpload.array("files"), (req, res) => {
  const postNumber = req.body.postNumber;
  const musicPath = path.resolve("public", "music", postNumber);
  if (fs.existsSync(musicPath))
    res.send("success");
  else res.send("fail");
});

router.post( "/image/upload", imageUpload.array("files"), (req, res) => {
  const postNumber = req.body.postNumber;
  const imagePath = path.resolve("public", "images", postNumber);
  if (fs.existsSync(imagePath)) res.send("success");
  else res.send("fail");
});

router.post("/profile/upload", profileImageUpload.array("files"), (req, res) => {
  const id = req.body.id;
  const profilePath = path.resolve("public", "profile", id);
  if (fs.existsSync(profilePath)) res.send("success");
  else res.send("fail");
});

export const fileRouter = router;
