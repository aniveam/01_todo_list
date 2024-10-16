import { useEffect, useState } from "react";
import { api } from "../api/index";
import Layout from "../layouts/Layout";
import Todo from "../types/Todo";

function Todos() {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    useEffect(() => {
        const fetchTodos = async () =>
            await api.get("/todos").then((resp) => {
                setTodos(resp.data.todos);
            });
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
