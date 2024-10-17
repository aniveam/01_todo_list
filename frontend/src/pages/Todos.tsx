import { useEffect, useState } from "react";
import { api } from "../api/index";
import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";
import Todo from "../types/Todo";

function Todos() {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const resp = await api.get("/todos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTodos(resp.data.todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    return (
        <Layout>
            <div className="flex flex-row justify-center">
                <h1>TODOS</h1>
            </div>
        </Layout>
    );
}

export default Todos;
