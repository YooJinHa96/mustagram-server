import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "ec2-18-191-128-120.us-east-2.compute.amazonaws.com",
  user: "mustadle",
  password: "1q2w3e!",
  database: "mustagram",
});
