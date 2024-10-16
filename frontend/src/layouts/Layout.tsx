import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const logout = () => {
        localStorage.setItem("jwtToken", "");
        setToken(null);
        setAuthToken(null);
        navigate("/");
    };
    return (
        <>
            <div className="flex flex-row item-center justify-between p-10">
                <div className="text-lg mx-auto">Welcome to the Todo App!</div>
                {token && (
                    <div>
                        <button
                            onClick={() => logout()}
                            className="bg-blue-400 hover:bg-blue-300 py-2 px-4 rounded-md float-right"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            <main>{children}</main>
        </>
    );
}
