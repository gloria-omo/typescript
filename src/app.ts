import express from 'express';
import userRouter from './routers/user'
export const PORT =  2024;

const app = express();
 app.use(express.json());

 app.use('/api', userRouter)

export default app;