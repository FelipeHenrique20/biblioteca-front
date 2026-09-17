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

    const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);
    const [nomeEditado, setNomeEditado] = useState("");

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

    function iniciarEdicao(autor: Autor) {
        setIdEmEdicao(autor.id);
        setNomeEditado(autor.nome);
    }

    function cancelarEdicao() {
        setIdEmEdicao(null);
        setNomeEditado("");
    }

    function salvarEdicao(id: number) {
        setError("");

        fetch(`http://localhost:3000/autores/${id}`, {
            method: "PUT",
            headers: criarCabecalhos(token),
            body: JSON.stringify({ nome: nomeEditado }),
        }).then((resposta) => {
            if (resposta.ok) {
                cancelarEdicao();
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
                {autores.map((autor) =>
                    idEmEdicao === autor.id ? (
                        <li key={autor.id}>
                            <input
                                type="text"
                                value={nomeEditado}
                                onChange={(e) => setNomeEditado(e.target.value)}
                                autoFocus
                            />
                            <div className="item-acoes">
                                <button onClick={() => salvarEdicao(autor.id)}>Salvar</button>
                                <button className="btn-neutro" onClick={cancelarEdicao}>Cancelar</button>
                            </div>
                        </li>
                    ) : (
                        <li key={autor.id}>
                            <span className="item-secundario">{autor.nome}</span>
                            {ehAdmin && (
                                <div className="item-acoes">
                                    <button className="btn-neutro" onClick={() => iniciarEdicao(autor)}>Editar</button>
                                    <button className="btn-perigo" onClick={() => handleRemover(autor.id)}>Remover</button>
                                </div>
                            )}
                        </li>
                    )
                )}
            </ul>
        </section>
    );
}

export default AutorSection;