import { Router } from "express";

import { singUp, login } from "./../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", singUp); 
userRouter.post("/login", login);

export default userRouter;