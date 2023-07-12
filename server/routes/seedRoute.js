import express from "express";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    try{
        await Product.deleteMany({});
        await Order.deleteMany({});
        await User.deleteMany({});
        const createProducts = await Product.insertMany(data.products);
        const createUsers = await User.insertMany(data.users);
        res.send({ createProducts, createUsers })

    } catch (e) {
        console.log(e.message);
    }

})

export default seedRouter;