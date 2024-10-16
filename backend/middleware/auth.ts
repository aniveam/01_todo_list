//This is to ensure that only authenticated users can access our routes
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = payload.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
