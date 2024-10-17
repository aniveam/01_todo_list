import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";

export default function SignIn() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<string | null>(null);
    const [type, setType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useAuth();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (type === "login") {
            try {
                const response = await api.post("/auth/login", {
                    email,
                    password,
                });
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("jwtToken", token);
                    setToken(token);
                    navigate("/todos");
                } else {
                    console.error("Login failed, no token received");
                }
            } catch (error: any) {
                setAlert(error.response.data.error);
            }
        } else {
            try {
                const response = await api.post("/auth/register", {
                    email,
                    password,
                });
                setAlert(response.data.message);
                setEmail("");
                setPassword("");
            } catch (error: any) {
                setAlert(error.response.data.message);
            }
        }
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }
    return (
        <Layout>
            {alert && (
                <div className="text-lg text-center bg-red-200 max-w-sm mx-auto p-2 m-4 rounded-md">
                    {alert}
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="flex bg-slate-200 flex-col gap-4 p-4 max-w-lg mx-auto rounded-md"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="ml-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="rounded-md p-2 border"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="ml-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="rounded-md p-2 border"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex mt-3 justify-between">
                        <button
                            onClick={() => setType("login")}
                            type="submit"
                            className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setType("register")}
                            type="submit"
                            className="bg-slate-300 hover:bg-violet-200 text-violet-600 font-bold py-2 px-4 rounded-md"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
