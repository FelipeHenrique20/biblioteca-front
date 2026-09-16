import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Conta {
    id: number;
    nome: string;
    email: string;
    role: "admin" | "comum";
}

interface AuthContextType {
    conta: Conta | null;
    token: string | null;
    login: (token: string, conta: Conta) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [conta, setConta] = useState<Conta | null>(() => {
        const salvo = localStorage.getItem("conta");
        return salvo ? JSON.parse(salvo) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    function login(novoToken: string, novaConta: Conta) {
        localStorage.setItem("token", novoToken);
        localStorage.setItem("conta", JSON.stringify(novaConta));
        setToken(novoToken);
        setConta(novaConta);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("conta");
        setToken(null);
        setConta(null);
    }

    return (
        <AuthContext.Provider value={{ conta, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
    }
    return context;
}