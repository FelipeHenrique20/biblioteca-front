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
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <span className="item-secundario">
                            {usuario.nome} — {usuario.email}
                        </span>
                        {ehAdmin && (
                            <button onClick={() => handleRemover(usuario.id)}>Remover</button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UsuarioSection;