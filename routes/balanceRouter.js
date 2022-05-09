import { Router } from "express";

import { addTransaction, getTransactions } from "../controllers/balanceController.js";
import { transactionValidation } from "../middlewares/transactionValidation.js";
import { transactionsValidation } from "../middlewares/transactionsValidation.js";

const balanceRouter = Router();

balanceRouter.post("/transactions",transactionValidation, addTransaction);
balanceRouter.get("/transactions",transactionsValidation, getTransactions);

export default balanceRouter;