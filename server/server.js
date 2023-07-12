import dotenv from "dotenv"
import  express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import seedRouter from "./routes/seedRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/seedData", seedRouter);

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
}).catch((e) => console.error(e));
