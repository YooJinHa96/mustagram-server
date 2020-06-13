import express, { Request, Response } from "express";
import { userRouter } from "./router/user";
import { fileRouter } from "./router/file";
import { connection } from "./dbms";
import { postRouter } from "./router/post";
import mysql from "mysql";
import bodyParser from "body-parser";
import { commentRouter } from "./router/comment";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/file", fileRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Success connecting at mustagram");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
