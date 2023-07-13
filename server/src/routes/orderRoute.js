import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getOrderById, createNewUser } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrderById));

orderRouter.post("/", isAuth, expressAsyncHandler(createNewUser));

export default orderRouter;
