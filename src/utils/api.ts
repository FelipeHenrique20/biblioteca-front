export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function criarCabecalhos(token: string | null): HeadersInit {
    const cabecalhos: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        cabecalhos["Authorization"] = `Bearer ${token}`;
    }

    return cabecalhos;
}

export function sessaoExpirada(resposta: Response): boolean {
    if (resposta.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("conta");
        window.location.href = "/login";
        return true;
    }
    return false;
}