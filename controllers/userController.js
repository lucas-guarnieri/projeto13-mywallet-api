
import joi from "joi";
import bcrypt from 'bcrypt';

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
        if (findUser === null){
            await db.collection("users").insertOne({
                name: user.name,
                email: user.email,
                password: bcrypt.hash(user.password, 10)
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