import { Router } from "express";

import { singUp } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/sign-up", singUp); 

export default userRouter;