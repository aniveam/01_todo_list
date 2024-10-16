import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("jwtToken")
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("jwtToken", token);
        } else {
            localStorage.removeItem("jwtToken");
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
