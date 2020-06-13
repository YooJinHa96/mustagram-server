import { Router, Request, Response } from "express";
import { connection } from "../dbms";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { id, password } = req.body;

  connection.query(
    `call log_in('${id}','${password}', @login_sig)`,
    (error, results, fields) => {
      if (error) throw error;
      // 1 이상의 값은 유저번호
      // -1 비밀번호 오류
      // -2 아이디 오류
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

      // 1 회원가입 성공
      // -1 회원가입 실패
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

      console.log(results[0]);
      // res.send(results[0][0].update_info_sig);
    }
  );
});

router.post("/personal/get", (req, res) => {
  const { id } = req.body;
  connection.query(
    `call Print_User_Info('${id}')`,
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0][0]);
      // res.send(results[0][0].update_info_sig);
    }
  );
});

router.post("/count-posts", (req, res) => {
  const { id } = req.body;
  connection.query(`call Count_My_Posts('${id}')`, (error, results, fields) => {
    if (error) throw error;

    console.log(results[0][0]);
    res.send(results[0][0].post_count);
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

      console.log(results[0][0]);
      // res.send(results[0][0].following_count);
    }
  );
});

export const userRouter = router;
