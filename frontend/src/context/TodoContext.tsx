import { createContext, ReactNode, useState, useContext } from "react";
import { TodoType, TodoContextType } from "../types/Todo";
import { api } from "../api";
import { useAuth } from "./AuthContext";

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { token } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchTodos = async () => {
    try {
      await api.get("/todos", { headers }).then((resp) => {
        setTodos(resp.data.todos);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const saveTodo = async (todo: TodoType) => {
    try {
      const response = await api.post("/todos", { todo }, { headers });
      const newTodo = response.data.newTodo;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      return response.data.message;
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodo = () => {};

  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
