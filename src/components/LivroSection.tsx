import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { criarCabecalhos } from "../utils/api";

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
    const { token, conta } = useAuth();
    const ehAdmin = conta?.role === "admin";

    const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);
    const [tituloEditado, setTituloEditado] = useState("");
    const [isbnEditado, setIsbnEditado] = useState("");
    const [quantidadeEditada, setQuantidadeEditada] =useState("1");
    const [autorIdEditado, setAutorIdEditado] = useState("");

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
            headers: criarCabecalhos(token),
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
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (resposta.status === 204) {
                buscarLivros();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function iniciarEdicao(livro: Livro) {
        setIdEmEdicao(livro.id);
        setTituloEditado(livro.titulo);
        setIsbnEditado(livro.isbn);
        setQuantidadeEditada(String(livro.quantidade));
        setAutorIdEditado(String(livro.autorId));
    }

    function cancelarEdicao() {
        setIdEmEdicao(null);
        setTituloEditado("");
        setIsbnEditado("");
        setQuantidadeEditada("1");
        setAutorIdEditado("");
    }

    function salvarEdicao(id: number) {
        setError("");

        fetch(`http://localhost:3000/livros/${id}`, {
            method: "PUT",
            headers: criarCabecalhos(token),
            body: JSON.stringify({
                titulo: tituloEditado,
                isbn: isbnEditado,
                quantidade: Number(quantidadeEditada),
                autorId: Number(autorIdEditado),
            }),
        }).then((resposta) => {
            if (resposta.ok) {
                cancelarEdicao();
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
            {ehAdmin && (
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
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {livros.map((livro) =>
                    idEmEdicao === livro.id ? (
                        <li key={livro.id}>
                            <input
                                type="text"
                                value={tituloEditado}
                                onChange={(e) => setTituloEditado(e.target.value)}
                                placeholder="Título"
                                autoFocus
                            />
                            <input
                                type="text"
                                value={isbnEditado}
                                onChange={(e) => setIsbnEditado(e.target.value)}
                                placeholder="ISBN"
                            />
                            <input
                                type="number"
                                min="1"
                                value={quantidadeEditada}
                                onChange={(e) => setQuantidadeEditada(e.target.value)}
                                placeholder="Quantidade"
                            />
                            <select
                                value={autorIdEditado}
                                onChange={(e) => setAutorIdEditado(e.target.value)}
                            >
                                <option value="">Selecione um autor</option>
                                {autores.map((autor) => (
                                    <option key={autor.id} value={autor.id}>
                                        {autor.nome}
                                    </option>
                                ))}
                            </select>
                            <div className="item-acoes">
                                <button onClick={() => salvarEdicao(livro.id)}>Salvar</button>
                                <button className="btn-neutro" onClick={cancelarEdicao}>Cancelar</button>
                            </div>
                        </li>
                    ) : (
                        <li key={livro.id}>
                            <div>
                                <strong>{livro.titulo}</strong>
                                <span className="item-secundario"> —  {nomeDoAutor(livro.autorId)}</span>
                            </div>
                            <div className="item-acoes">
                                <span className={`badge ${livro.quantidadeDisponivel > 0 ? "badge-sucesso" : "badge-erro"}`}>
                                    {livro.quantidadeDisponivel}/{livro.quantidade} disponíveis
                                </span>
                                {ehAdmin && (
                                    <>
                                        <button className="btn-neutro" onClick={() => iniciarEdicao(livro)}>Editar</button>
                                        <button className="btn-perigo" onClick={() => handleRemover(livro.id)}>Remover</button>
                                    </>
                                )}
                            </div>
                        </li>
                    )
                )}
            </ul>
        </section>
    );
}

export default LivroSection;