import express, { Request, Response } from "express";
import mysql from "mysql";
import { userRouter } from "./router/user";
import { fileRouter } from "./router/file";

const connection = mysql.createConnection({
  host: "ec2-3-16-143-85.us-east-2.compute.amazonaws.com",
  user: "root",
  password: "1q2w3e!",
  database: "mustagram",
});
connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Success connecting at mustagram");
});

const app = express();
const PORT = 3000;

app.use("/user", userRouter);
app.use("/file", fileRouter);

app.get("/hello", (req: Request, res: Response) => {
    res.send("<h1>안녕하세요</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
