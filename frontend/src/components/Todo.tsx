import { TodoType } from "../types/Todo";

export default function Todo({ todo }: { todo: TodoType }) {
  return (
    <div
      key={todo._id}
      className="border-4 border-green-200 w-1/3 rounded-md p-2"
    >
      <p className="text-xl text-center font-bold">{todo.title}</p>
      <p>{todo.description}</p>
      <p>
        <strong>Status:</strong> {todo.completed ? "COMPLETED" : "TODO"}
      </p>
      <p>
        <strong>Created on:</strong> {todo.createdAt.toString().slice(0, 10)}
      </p>
      <div className="flex justify-center mt-2">
        <button className="bg-green-600 text-white text-sm rounded-full py-1 px-4">
          Complete
        </button>
      </div>
    </div>
  );
}
