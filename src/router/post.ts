import { Router, Request, Response } from "express";
import { connection } from "../dbms";

const router = Router();

router.post("/create", (req, res) => {
  const { id, content } = req.body;
  connection.query(
    `call Create_Post('${id}', '${content}', @create_post_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].create_post_sig);
    }
  );
});

router.post("/update", (req, res) => {
  const { id, postNumber, content } = req.body;
  connection.query(
    `call Update_Post('${id}', ${postNumber}, '${content}', @update_post_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].update_post_sig);
    }
  );
});

router.post("/delete", (req, res) => {
  const { id, postNumber } = req.body;
  connection.query(
    `call Delete_Post('${id}', ${postNumber}, @delete_post_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].delete_post_sig);
    }
  );
});

router.post("/like", (req, res) => {
  const { id, postNumber } = req.body;
  connection.query(
    `call Post_Like('${id}', ${postNumber}, @post_like_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].post_like_sig);
    }
  );
});

router.post("/count-like", (req, res) => {
  const { postNumber } = req.body;
  connection.query(
    `call Count_Post_Like(${postNumber})`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0]);
      res.send(results[0][0].p_like_count);
    }
  );
});

// 게시물 부분 수정해야합니다.
router.post("/friends", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Check_Friend_Posts('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0]);
      console.log(results[0][0]);
    }
  );
});

router.post("/comments", (req, res) => {
  const { postNumber } = req.body;
  connection.query(
    `call Check_Posts_Comments(${postNumber})`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0]);
    }
  );
});

export const postRouter = router;
