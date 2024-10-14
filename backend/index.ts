import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes); // api/auth/login, api/auth/register

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
