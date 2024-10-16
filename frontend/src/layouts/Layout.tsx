import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateModal from "../components/CreateModal";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const logout = () => {
    localStorage.setItem("jwtToken", "");
    setToken(null);
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between p-5 bg-indigo-950 sticky top-0">
        <img width={50} src="/img/leaf-logo.png" alt="logo" />
        {token && (
          <div className="flex flex-row space-x-10 items-center">
            <Link
              to="/todos"
              className="text-white cursor-pointer hover:underline"
            >
              Home
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white cursor-pointer hover:underline"
            >
              Create
            </button>
            <button
              onClick={logout}
              className="bg-blue-800 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={() => setIsModalOpen(false)} />}
      <main className="flex-grow bg-gradient-to-r from-violet-200 to-violet-400 min-h-screen">
        {children}
      </main>
    </>
  );
}
