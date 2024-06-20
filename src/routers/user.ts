import express from "express";
import { getAll, login, register } from "../controllers/user";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/log-in', login);
userRouter.get('/get-all', getAll);

export default userRouter;
