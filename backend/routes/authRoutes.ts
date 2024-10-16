import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ email, password: hashedPassword });
        res.status(200).json({ messsage: "User registered" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1hr",
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;
