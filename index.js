import express, {json} from "express";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import joi from 'joi'
import dayjs from "dayjs";
import bcrypt from 'bcrypt';

import db from "./db.js";
import { singUp } from "./controllers/userController.js";

const server = express();
server.use(json());
server.use(cors());
dotenv.config();



//SINGUP
server.post("/sign-up", singUp);
// server.post("/sign-up", async (req, res) => {
//     const user = req.body;

//     const userSingUpSchema = joi.object({
//         name: joi.string().required(),
//         email: joi.string().email().required(),
//         password: joi.string().required(),
//         passwordConfirm: joi.ref("password")
//     });
//     const validation = userSingUpSchema.validate(user);
//     if (validation.error) {
//         res.status(422).send(validation.error.details);
//         return;
//     }

//     try {
//         const findUser = await db.collection("users").findOne({email : user.email});
//         if (findUser === null){
//             await db.collection("users").insertOne({
//                 name: user.name,
//                 email: user.email,
//                 password: bcrypt.hash(user.password, 10)
//             });
//             console.log("usuario cadastrado");
//             res.sendStatus(201);
//         }else {
//             res.sendStatus(409);
//         }
//     } catch (error){
//         console.error(error);
//         res.sendStatus(500);
//     }
// });

server.listen(5000, () => {
    console.log(`Running on http://localhost:${process.env.PORTA}`);
});