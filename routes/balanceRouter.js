import { Router } from "express";

import { addTransaction } from "../controllers/balanceController.js";

const balanceRouter = Router();

balanceRouter.post("/transactions", addTransaction);

export default balanceRouter;