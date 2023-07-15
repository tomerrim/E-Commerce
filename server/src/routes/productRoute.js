import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/")
.get(expressAsyncHandler(getAllProducts))
.post(isAuth, expressAsyncHandler(createProduct));

productRouter.route("/:id")
.get(expressAsyncHandler(getProductById))
.put(isAuth, expressAsyncHandler(updateProduct))
.delete(isAuth, expressAsyncHandler(deleteProduct));

export default productRouter;