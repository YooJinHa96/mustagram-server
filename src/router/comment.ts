import { Router, Request, Response } from "express";
import { connection } from "../dbms";

const router = Router();

router.post("/create", (req, res) => {
  const { id, postNumber, comment } = req.body;
  connection.query(
    `call Create_Comment('${id}', ${postNumber}, '${comment}', @create_comment_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].create_comment_sig);
    }
  );
});

router.post("/update", (req, res) => {
  const { id, commentNumber, comment } = req.body;
  // console.log(id, commentNumber, comment);
  connection.query(
    `call Update_Comment('${id}', ${commentNumber}, '${comment}', @update_comment_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].update_comment_sig);
    }
  );
});

router.post("/delete", (req, res) => {
  const { id, commentNumber } = req.body;
  connection.query(
    `call Delete_Comment('${id}', ${commentNumber}, @delete_comment_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].delete_comment_sig);
    }
  );
});

router.post("/like", (req, res) => {
  const { id, commentNumber } = req.body;
  connection.query(
    `call Comment_Like('${id}', ${commentNumber}, @comment_like_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].comment_like_sig);
    }
  );
});

router.post("/count-like", (req, res) => {
  const { commentNumber } = req.body;
  connection.query(
    `call Count_Comment_Like(${commentNumber})`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0]);
      res.send(results[0][0].c_like_count);
    }
  );
});

export const commentRouter = router;
