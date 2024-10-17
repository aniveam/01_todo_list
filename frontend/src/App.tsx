import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import Todos from "./pages/Todos";

function App() {
    const { token } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={!token ? <SignIn /> : <Navigate to="/todos" />}
            />
            <Route
                path="/todos"
                element={token ? <Todos /> : <Navigate to="/" />}
            />
        </Routes>
    );
}

export default App;
