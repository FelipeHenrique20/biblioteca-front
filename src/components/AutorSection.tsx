import { useEffect, useState } from "react";

interface Autor {
    id: number;
    nome: string;
    createdAt: string;
}

function AutorSection() {
    const [autores, setAutores] = useState<Autor[]>([]);
    const [novoNome, setNovoNome] = useState("");
    const [error, setError] = useState("");

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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome }),
        })
            .then((resposta) => resposta.json())
            .then(() => {
                setNovoNome("");
                buscarAutores();
            });
    }

    function handleRemover(id: number) {
        setError("");

        fetch(`http://localhost:3000/autores/${id}`, {
            method: "DELETE",
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
            <h2>Autores</h2>

            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 value={novoNome}
                 onChange={(evento) => setNovoNome(evento.target.value)}
                 placeholder="Nome do autor"
                />
                <button type="submit">Adicionar</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {autores.map((autor) => (
                    <li key={autor.id}>
                        {autor.nome}
                        <button onClick={() => handleRemover(autor.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AutorSection;