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

export const userRouter = router;
