import { Router } from "express";
import { connection } from "../dbms";
import moment from "moment";

const router = Router();

export type PostFormat = {
  Post_Num: number;
  User_Num: number;
  Wr_Time: Date;
  Post_Content: string;
};

type CommentFormat = {
  Comment_Num: number;
  User_Num: number;
  Wr_Time: Date;
  Comment_Content: string;
};

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

      console.log(results[0][0].post_like_sig);
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
      res.send({
        like: results[0][0].p_like_count,
      });
    }
  );
});

router.post("/friends", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Check_Friend_Posts('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      const result: PostFormat[] = results[0];
      console.log(results[0]);

      result.length !== 0
        ? res.send(
            result.map(
              ({ Post_Num, User_Num, Wr_Time, Post_Content }: PostFormat) => ({
                postNumber: Post_Num,
                userNumber: User_Num,
                time: moment(Wr_Time).format("YYMMDD-hhmmss"),
                content: Post_Content,
              })
            )
          )
        : res.send(result);
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
      const result: CommentFormat[] = results[0];
      result.length !== 0
        ? res.send(
            result.map(
              ({ User_Num, Comment_Num, Wr_Time, Comment_Content }: CommentFormat) => ({
                commentNumber: Comment_Num,
                userNumber: User_Num,
                time: Wr_Time,
                content: Comment_Content,
              })
            )
          )
        : res.send(result);
    }
  );
});

export const postRouter = router;
