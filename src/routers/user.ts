import express from "express";
import { register } from "../controllers/user";

const userRouter = express.Router();

userRouter.post('/register', register);

export default userRouter;