export function criarCabecalhos(token: string | null): HeadersInit {
    const cabecalhos: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        cabecalhos["Authorization"] = `Bearer ${token}`;
    }

    return cabecalhos;
}