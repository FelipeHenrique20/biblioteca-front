import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { criarCabecalhos } from "../utils/api";

interface Autor {
    id: number;
    nome: string;
    createdAt: string;
}

function AutorSection() {
    const [autores, setAutores] = useState<Autor[]>([]);
    const [novoNome, setNovoNome] = useState("");
    const [error, setError] = useState("");
    const { token, conta } = useAuth();
    const ehAdmin = conta?.role === "admin";

    useEffect(() => {
        buscarAutores();
    }, []);

    function buscarAutores() {
        fetch("http://localhost:3000/autores")
            .then((resposta) => resposta.json())
            .then((dados) => setAutores(dados));
    }

    function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setError("");

        fetch("http://localhost:3000/autores", {
            method: "POST",
            headers: criarCabecalhos(token),
            body: JSON.stringify({ nome: novoNome }),
        }).then((resposta) => {
            if (resposta.ok) {
                setNovoNome("");
                buscarAutores();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function handleRemover(id: number) {
        setError("");

        fetch(`http://localhost:3000/autores/${id}`, {
            method: "DELETE",
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (resposta.status === 204) {
                buscarAutores();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }
    
    return (
        <section>
            {ehAdmin && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={novoNome}
                        onChange={(evento) => setNovoNome(evento.target.value)}
                        placeholder="Nome do autor"
                    />
                    <button type="submit">Adicionar</button>
                </form>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {autores.map((autor) => (
                    <li key={autor.id}>
                        <span className="item-secundario">{autor.nome}</span>
                        {ehAdmin && (
                            <button onClick={() => handleRemover(autor.id)}>Remover</button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AutorSection;