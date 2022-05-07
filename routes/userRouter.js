import { Router } from "express";

import { singUp } from "./../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", singUp); 

export default userRouter;