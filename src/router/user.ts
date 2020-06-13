import { Router, Request, Response } from "express";
import { connection } from "../dbms";

type ResultType = [[{ join_sig: number }]];

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
  const {id, password} = req.body;
  connection.query(
    `call join_in('${id}','${password}', @join_sig)`,
    (error, results: ResultType, fields) => {
      if (error) throw error;

      // 1 회원가입 성공
      // -1 회원가입 실패
      console.log(results[0][0]);
      res.send(results[0][0].join_sig);
    }
  );
});

export const userRouter = router;
