import { useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import Todo from "../components/Todo";
import Layout from "../layouts/Layout";

function Todos() {
  const { todos, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 mt-10 w-full max-w-full mx-auto overflow-y-auto">
        {todos?.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </div>
    </Layout>
  );
}

export default Todos;
