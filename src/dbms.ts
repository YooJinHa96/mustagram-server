import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "ec2-3-16-143-85.us-east-2.compute.amazonaws.com",
  user: "root",
  password: "1q2w3e!",
  database: "mustagram",
});
