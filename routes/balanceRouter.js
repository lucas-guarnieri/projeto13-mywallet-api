import { Router } from "express";

import { addTransaction, getTransactions } from "../controllers/balanceController.js";

const balanceRouter = Router();

balanceRouter.post("/transactions", addTransaction);
balanceRouter.get("/transactions", getTransactions);

export default balanceRouter;