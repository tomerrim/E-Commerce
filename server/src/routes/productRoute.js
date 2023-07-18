import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getAllProducts, getCategories, getProductByToken, getProductById, searchProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", expressAsyncHandler(getAllProducts));

productRouter.get("/categories", expressAsyncHandler(getCategories));

productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));

productRouter.get("/:id", expressAsyncHandler(getProductById));

productRouter.post("/search", expressAsyncHandler(searchProduct));

export default productRouter;