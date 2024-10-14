import express, { Request, Response } from "express";
const router = express.Router();
import { authenticate, AuthRequest } from "../middleware/auth";
import Todo from "../models/Todo";

//Create
router.post("/", authenticate, async (req: AuthRequest, res: Response) => {
    const { title } = req.body;
    const userId = req.userId;
    try {
        const newTodo = await Todo.create({ title, userId });
        res.status(200).json({
            message: "Successfully created todo!",
            newTodo,
        });
    } catch (error) {
        res.status(500).json({ error: "Error creating todo" });
    }
});

//Read
router.get("/", authenticate, async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        const todos = await Todo.find({ userId });
        res.status(200).json({ message: "Fetched todos", todos });
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

//Update
router.put("/:id", authenticate, async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId },
            req.body,
            { new: true }
        );
        if (!todo) {
            res.status(404).json({ error: "Todo not found" });
            return;
        }
        res.status(200).json({ message: "Successfully updated todo!", todo });
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});

//Delete
router.delete("/:id", authenticate, async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const todo = await Todo.deleteOne({ _id: req.params.id, userId });
    if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
    }
    res.json({ message: 'Successfully deleted todo!', todo })
});

export default router;
