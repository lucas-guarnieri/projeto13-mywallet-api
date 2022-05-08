import express, {json} from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/userRouter.js"

const server = express();
server.use(json());
server.use(cors());
dotenv.config();

server.use(userRouter);


server.listen(5000, () => {
    console.log(`Running on http://localhost:${process.env.PORTA}`);
});