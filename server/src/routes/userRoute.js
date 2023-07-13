import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { signIn, signUp, getUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signin", expressAsyncHandler(signIn));

userRouter.post("/signup", expressAsyncHandler(signUp));

userRouter.get("/", isAuth, getUser);

export default userRouter;
