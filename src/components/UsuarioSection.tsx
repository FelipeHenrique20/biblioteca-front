import { useEffect, useState } from "react";

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
            headers: { "Content-Type": "application/json" },
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
        }).then((resposta) => {
            if (resposta.status === 204) {
                buscarUsuarios();
            } else {
                resposta.json().then((dados) => setError(dados.error))
            }
        });
    }

    return (
        <section>
            <h2>Usuários</h2>

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

            {error && <p style={{color: "red" }}>{error}</p>}

            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.nome} — {usuario.email}
                        <button onClick={() => handleRemover(usuario.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UsuarioSection;