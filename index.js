import express, {json} from "express";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import joi from 'joi'
import dayjs from "dayjs";
import bcrypt from 'bcrypt';

import db from "./db.js";
import { singUp } from "./controllers/userController.js";
import userRouter from "./routes/userRouter.js"

const server = express();
server.use(json());
server.use(cors());
dotenv.config();



//SINGUP
server.use(userRouter);


server.listen(5000, () => {
    console.log(`Running on http://localhost:${process.env.PORTA}`);
});