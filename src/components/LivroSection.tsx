import { useEffect, useState } from "react";

interface Autor {
    id: number;
    nome: string;
}

interface Livro {
    id: number;
    titulo: string;
    isbn: string;
    quantidade: number;
    quantidadeDisponivel: number;
    autorId: number; 
}

function LivroSection() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [autores, setAutores] = useState<Autor[]>([]);
    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantidade, setQuantidade] = useState("1");
    const [autorId, setAutorId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        buscarLivros();
        buscarAutores();
    }, []);

    function buscarLivros() {
        fetch("http://localhost:3000/livros")
            .then((resposta) => resposta.json())
            .then((dados) => setLivros(dados));
    }

    function buscarAutores() {
        fetch("http://localhost:3000/autores")
            .then((resposta) => resposta.json())
            .then((dados) => setAutores(dados));
    }

    function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setError("");

        fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titulo,
                isbn,
                quantidade: Number(quantidade),
                autorId: Number(autorId),
            }),
        }).then((resposta) => {
            if (resposta.status === 201) {
                setTitulo("");
                setIsbn("");
                setQuantidade("1");
                setAutorId("");
                buscarLivros();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function handleRemover(id: number) {
        setError("");

        fetch(`http://localhost:3000/livros/${id}`, {
            method: "DELETE",
        }).then((resposta) => {
            if (resposta.status === 204) {
                buscarLivros();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function nomeDoAutor(id: number) {
        const autor = autores.find((a) => a.id === id);
        return autor ? autor.nome : "Desconhecido";
    }

    return (
        <section>
            <h2>Livros</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Titulo"
                />
                <input 
                    type="text" 
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBN"
                />
                <input
                    type="number" 
                    min="1"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="Quantidade"
                />

                <select value={autorId} onChange={(e) => setAutorId(e.target.value)}>
                    <option value="">Selecione um autor</option>
                    {autores.map((autor) => (
                        <option key={autor.id} value={autor.id}>
                            {autor.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Adicionar</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {livros.map((livro) => (
                    <li key={livro.id}>
                        {livro.titulo} - {nomeDoAutor(livro.autorId)} (
                        {livro.quantidadeDisponivel}/{livro.quantidade} disponiveis)
                        <button onClick={() => handleRemover(livro.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default LivroSection;