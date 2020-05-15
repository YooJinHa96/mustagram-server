import express, { Request, Response } from "express";
import { userRouter } from "./router/user";
import { fileRouter } from "./router/file";
import { connection } from "./dbms";
import mysql from "mysql";

const app = express();
const PORT = 3000;

app.use("/user", userRouter);
app.use("/file", fileRouter);

connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Success connecting at mustagram");
});

app.get("/hello", (req: Request, res: Response) => {
  res.send({ data: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
