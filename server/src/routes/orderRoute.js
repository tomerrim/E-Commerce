import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getOrderById, createNewOrder } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrderById));

orderRouter.post("/", isAuth, expressAsyncHandler(createNewOrder));

export default orderRouter;
