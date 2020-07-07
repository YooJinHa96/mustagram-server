import { Router, Request, Response } from "express";
import { connection } from "../dbms";
import moment from "moment";
import { PostFormat } from "./post";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { id, password } = req.body;

  connection.query(
    `call log_in('${id}','${password}', @login_sig)`,
    (error, results, fields) => {
      if (error) throw error;
      const result = results[0][0].login_sig;
      console.log(result);

      res.send(results[0][0].login_sig);
    }
  );
});

router.post("/sign-in", (req: Request, res: Response) => {
  const { id, password } = req.body;
  connection.query(
    `call join_in('${id}','${password}', @join_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].join_sig);
    }
  );
});

router.post("/personal/save", (req, res) => {
  const { id, name, sex, intro, birthday } = req.body;
  console.log(id, name, sex, intro, birthday);
  connection.query(
    `call Store_User_Info('${id}', '${name}', '${sex}', '${intro}', '${birthday}', @store_info_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].store_info_sig);
    }
  );
});

router.post("/follow", (req, res) => {
  const { id, friendId } = req.body;
  connection.query(
    `call Friend_Follow('${id}', '${friendId}', @follow_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].follow_sig);
    }
  );
});

router.post("/unfollow", (req, res) => {
  const { id, friendId } = req.body;
  connection.query(
    `call Friend_Unfollow('${id}', '${friendId}', @unfollow_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].unfollow_sig);
    }
  );
});

router.post("/personal/modify", (req, res) => {
  const { id, intro } = req.body;
  connection.query(
    `call Update_User_Info('${id}', '${intro}', @update_info_sig)`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      res.send(results[0][0].update_info_sig);
    }
  );
});

// 수정해야합니다.
router.post("/friends", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Check_My_Friends('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      let list: Array<number> = [];

      results[0].forEach(({ Friend_Num }: { Friend_Num: number | null }) => {
        if (Friend_Num != null) list.push(Friend_Num);
      });
      console.log(list);
      res.send(list);
    }
  );
});

router.post("/personal/get", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Print_User_Info('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      // const {User_Num, Name, Sex, Intro, Birth} = results[0][0];
      // console.log(User_Num, Name, Sex, Intro, moment(Birth).format("YYMMDD"));
      const intro = results[0][0]?.Intro;
      res.send(intro);
    }
  );
});

router.post("/count-posts", (req, res) => {
  const { id } = req.body;
  connection.query(`call Count_My_Posts('${id}')`, (error, results, fields) => {
    if (error) throw error;

    const result = results[0][0].post_count;
    res.send({ post: result });
  });
});

router.post("/count-followers", (req, res) => {
  const { id } = req.body;
  connection.query(`call Count_Follower('${id}')`, (error, results, fields) => {
    if (error) throw error;

    const result = results[0][0].follower_count;
    res.send({ follower: result });
  });
});

router.post("/count-followings", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Count_Following('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      const result = results[0][0].following_count;
      // console.log(results[0][0].following_count);
      res.send({ following: result });
    }
  );
});

router.post("/id", (req, res) => {
  const { userNumber } = req.body;
  connection.query(
    `call Get_User_ID(${userNumber})`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0].ID);
      res.send(results[0][0].ID);
    }
  );
});

router.post("/posts", (req, res) => {
  const { id } = req.body;
  console.log(id);
  connection.query(`call Check_My_Posts('${id}')`, (error, results, fields) => {
    if (error) throw error;

    const result: PostFormat[] = results[0];

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
    // res.send(results[0][0].ID);
  });
});

type FriendRecommendation = {
  User_Num: number;
  ID: string;
};

router.post("/friend/recommendation", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Friend_Recommended('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      const result: FriendRecommendation[] = results[0];
      result.length !== 0
        ? res.send(
            result.map(({ User_Num, ID }: FriendRecommendation) => ({
              userNumber: User_Num,
              id: ID,
            }))
          )
        : res.send(result);
    }
  );
});

export const userRouter = router;
