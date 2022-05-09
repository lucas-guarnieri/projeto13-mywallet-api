import { ObjectId } from "mongodb";
import joi from "joi";
import dayjs from "dayjs";

import db from "./../db.js";

export async function addTransaction(req, res) {
    const transaction = req.body;
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "").trim();
    
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }

    try {
        await db.collection("balances").insertOne({
            userId: session.userId,
            amount: transaction.amount,
            description: transaction.description,
            date: dayjs().format("DD/MM")
        });
        res.status(200).send("transaction upload successful");
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getTransactions(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "").trim();
   
    
    const session = await db.collection("sessions").findOne({ token });
    console.log(session.userId);
    if (!session) {
        return res.sendStatus(401);
    }

    try {
        const transactions = await db.collection("balances").find({userId : new ObjectId(session.userId)}).toArray();
        res.status(200).send(transactions);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}