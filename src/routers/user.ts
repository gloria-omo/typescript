import express from "express";
import { getAll, getById, getOne, login, register } from "../controllers/user";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/log-in', login);

userRouter.get('/get-all', getAll);
userRouter.get('/get-one', getOne);
userRouter.get('/getbyid/:id', getById);


export default userRouter;
