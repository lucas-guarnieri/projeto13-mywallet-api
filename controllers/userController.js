
import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

import db from "./../db.js"


export async function singUp(req, res){
    const user = req.body;

    const userSingUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        passwordConfirm: joi.ref("password")
    });
    const validation = userSingUpSchema.validate(user);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    try {
        const findUser = await db.collection("users").findOne({email : user.email});
        if (!findUser){
            await db.collection("users").insertOne({
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            });
            console.log("usuario cadastrado");
            res.sendStatus(201);
        }else {
            res.sendStatus(409);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
};

export async function login(req, res) {
    const login = req.body;

    const userLoginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const validation = userLoginSchema.validate(login);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    try {
        const user = await db.collection("users").findOne({email: login.email }); 
        if (user && bcrypt.compareSync(login.password, user.password)){
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token,
            });
            res.status(200).send({ token, name: user.name });
        } else {
            res.sendStatus(500);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}