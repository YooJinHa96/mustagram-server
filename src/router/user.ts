import { Router, Request, Response } from "express";
import { connection } from "../dbms";

type ResultType = [[{ join_signal: number }]];

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  connection.query(
    "call log_in('이승철','1234', @log_signal)",
    (error, results, fields) => {
      if (error) throw error;
      // 1 이상의 값은 유저번호
      // -2 아이디 오류
      // -3 비밀번호 오류
      console.log(results[0][0].log_signal);
    }
  );
});

router.get("/sign-in", (req: Request, res: Response) => {
  connection.query(
    "call join_in('kim','1234',@join_signal)",
    (error, results: ResultType, fields) => {
      if (error) throw error;
      console.log(results[0][0].join_signal);
    }
  );
});

export const userRouter = router;
