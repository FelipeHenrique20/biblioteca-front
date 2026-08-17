import { useEffect, useState } from "react";

interface Livro {
    id: number;
    titulo: string;
    quantidade: number;
    quantidadeDisponivel: number;
}

interface Usuario {
    id: number;
    nome: string;
    email: string;
}

interface Emprestimo {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: string;
    dataDevolucao: string | null;
}

function EmprestimoSection() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [livros, setLivros] = useState<Livro[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [livroId, setLivroId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        buscarEmprestimosAtivos();
        buscarLivros();
        buscarUsuarios();
    }, []);

    function buscarEmprestimosAtivos() {
        fetch("http://localhost:3000/emprestimos/ativos")
            .then((resposta) => resposta.json())
            .then((dados) => setEmprestimos(dados));
    }

    function buscarLivros() {
        fetch("http://localhost:3000/livros")
            .then((resposta) => resposta.json())
            .then((dados) => setLivros(dados));
    }

    function buscarUsuarios() {
        fetch("http://localhost:3000/usuarios")
            .then((resposta) => resposta.json())
            .then((dados) => setUsuarios(dados));
    }

    function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setError("");

        fetch("http://localhost:3000/emprestimos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                livroId: Number(livroId),
                usuarioId: Number(usuarioId),
            }),
        }).then((resposta) => {
            if (resposta.ok) {
                setLivroId("");
                setUsuarioId("");
                buscarEmprestimosAtivos();
                buscarLivros();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function handleDevolver(id: number) {
        setError("");

        fetch(`http://localhost:3000/emprestimos/${id}/devolver`, {
            method: "PATCH",
        }).then((resposta) => {
            if (resposta.ok) {
                buscarEmprestimosAtivos();
                buscarLivros();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function nomeDoLivro(id: number) {
        const livro = livros.find((livro) => livro.id === id);

        return livro ? livro.titulo : "Livro desconhecido";
    }

    function nomeDoUsuario(id: number) {
        const usuario = usuarios.find((usuario) => usuario.id === id);

        return usuario ? usuario.nome : "Usuário desconhecido";
    }

    return (
        <section>
            <h2>Empréstimos</h2>

            <form onSubmit={handleSubmit}>
                <select
                    value={livroId}
                    onChange={(e) => setLivroId(e.target.value)}
                >
                    <option value="">Selecione um livro</option>

                    {livros
                        .filter((livro) => livro.quantidadeDisponivel > 0)
                        .map((livro) => (
                            <option key={livro.id} value={livro.id}>
                                {livro.titulo} (
                                {livro.quantidadeDisponivel} disponíveis)
                            </option>
                        ))}
                </select>

                <select
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                >
                    <option value="">Selecione um usuário</option>

                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">
                    Registrar empréstimo
                </button>
            </form>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <h3>Empréstimos ativos</h3>

            <ul>
                {emprestimos.map((emprestimo) => (
                    <li key={emprestimo.id}>
                        <strong>
                            {nomeDoLivro(emprestimo.livroId)}
                        </strong>

                        {" — "}

                        {nomeDoUsuario(emprestimo.usuarioId)}

                        {" — "}

                        {emprestimo.dataEmprestimo}

                        <button
                            onClick={() =>
                                handleDevolver(emprestimo.id)
                            }
                        >
                            Devolver
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default EmprestimoSection;