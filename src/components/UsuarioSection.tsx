import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { criarCabecalhos } from "../utils/api";

interface Usuario {
    id: number;
    nome: string;
    email: string;
    createdAt: string;
}

function UsuarioSection() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { token, conta } = useAuth();
    const ehAdmin = conta?.role === "admin";

    const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [emailEditado, setEmailEditado] = useState("");

    useEffect(() => {
        buscarUsuarios();
    }, []);

    function buscarUsuarios() {
        fetch("http://localhost:3000/usuarios")
            .then((resposta) => resposta.json())
            .then((dados) => setUsuarios(dados));
    }

    function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setError("");

        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: criarCabecalhos(token),
            body: JSON.stringify({ nome, email }),
        }).then((resposta) => {
            if (resposta.status === 201) {
                setNome("");
                setEmail("");
                buscarUsuarios();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function handleRemover(id: number) {
        setError("");

        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE",
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (resposta.status === 204) {
                buscarUsuarios();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function iniciarEdicao(usuario: Usuario) {
        setIdEmEdicao(usuario.id);
        setNomeEditado(usuario.nome);
        setEmailEditado(usuario.email);
    }

    function cancelarEdicao() {
        setIdEmEdicao(null);
        setNomeEditado("");
        setEmailEditado("");
    }

    function salvarEdicao(id: number) {
        setError("");

        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: criarCabecalhos(token),
            body: JSON.stringify({ nome: nomeEditado, email: emailEditado }),
        }).then((resposta) => {
            if (resposta.ok) {
                cancelarEdicao();
                buscarUsuarios();
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
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail" 
                    />
                    <button type="submit">Adicionar</button>
                </form>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {usuarios.map((usuario) =>
                    idEmEdicao === usuario.id ? (
                        <li key={usuario.id}>
                            <input
                                type="text"
                                value={nomeEditado}
                                onChange={(e) => setNomeEditado(e.target.value)}
                                placeholder="Nome"
                                autoFocus
                            />
                            <input
                                type="email"
                                value={emailEditado}
                                onChange={(e) => setEmailEditado(e.target.value)}
                                placeholder="E-mail"
                            />
                            <div className="item-acoes">
                                <button onClick={() => salvarEdicao(usuario.id)}>Salvar</button>
                                <button className="btn-neutro" onClick={cancelarEdicao}>Cancelar</button>
                            </div>
                        </li>
                    ) : (
                        <li key={usuario.id}>
                            <span className="item-secundario">
                                {usuario.nome} — {usuario.email}
                            </span>
                            {ehAdmin && (
                                <div className="item-acoes">
                                    <button className="btn-neutro" onClick={() => iniciarEdicao(usuario)}>Editar</button>
                                    <button className="btn-perigo" onClick={() => handleRemover(usuario.id)}>Remover</button>
                                </div>
                            )}
                        </li>
                    )
                )}
            </ul>
        </section>
    );
}

export default UsuarioSection;