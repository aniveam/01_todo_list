import { Schema, model, Document, Types } from "mongoose";

interface ITodo extends Document {
  title: string;
  completed: Boolean;
  createdAt: Date;
  userId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
});

const Todo = model<ITodo>("todo", todoSchema);
export default Todo;