import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api";
import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";

export default function SignIn() {
    const navigate = useNavigate();
    const [type, setType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useAuth();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        try {
            if (type === "login") {
                const response = await api.post("/auth/login", {
                    email,
                    password,
                });
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("jwtToken", token);
                    setToken(token);
                    setAuthToken(token);
                    navigate("/todos");
                } else {
                    console.error("Login failed, no token received");
                }
            } else {
                const response = await api.post("/auth/register", {
                    email,
                    password,
                });
                navigate("/");
            }
        } catch (error) {}
    }
    return (
        <Layout>
            <form
                onSubmit={handleSubmit}
                className="flex bg-slate-200 flex-col gap-4 p-4 max-w-sm mx-auto rounded-md"
            >
                <div className="flex flex-col items-center gap-4">
                    <div>
                        <label htmlFor="email" className="mx-3">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="rounded-md p-1 border"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mx-3">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="rounded-md p-1 border"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex mt-3 space-x-3">
                        <button
                            onClick={() => setType("login")}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 rounded-md"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setType("register")}
                            type="submit"
                            className="bg-slate-400 hover:bg-slate-500 font-bold py-2 px-4 rounded-md"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
