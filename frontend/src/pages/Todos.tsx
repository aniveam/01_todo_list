import { useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import Layout from "../layouts/Layout";

function Todos() {
  const { todos, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 mt-10">
        {todos?.map((todo) => (
          <div
            key={todo._id}
            className="border-4 border-green-200 w-1/3 rounded-md p-2"
          >
            <p className="text-xl text-center font-bold">{todo.title}</p>
            <p>
              <strong>Status:</strong> {todo.completed ? "COMPLETED" : "TODO"}
            </p>
            <p>
              <strong>Created on:</strong>{" "}
              {todo.createdAt.toString().slice(0, 10)}
            </p>
            <div className="flex justify-center mt-2">
              <button className="bg-green-600 text-white text-sm rounded-full py-1 px-4">
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Todos;
