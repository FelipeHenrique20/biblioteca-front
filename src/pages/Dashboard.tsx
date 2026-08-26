import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Resumo {
  totalLivros: number;
  totalAutores: number;
  emprestimosAtivos: number;
}

function Dashboard() {
  const [resumo, setResumo] = useState<Resumo | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/livros").then((r) => r.json()),
      fetch("http://localhost:3000/autores").then((r) => r.json()),
      fetch("http://localhost:3000/emprestimos/ativos").then((r) => r.json()),
    ]).then(([livros, autores, emprestimosAtivos]) => {
      setResumo({
        totalLivros: livros.length,
        totalAutores: autores.length,
        emprestimosAtivos: emprestimosAtivos.length,
      });
    });
  }, []);

  return (
    <>
      <h1>Painel do Sistema de Biblioteca</h1>
      <p className="subtitulo">Visão geral e ações rápidas</p>

      <div className="cards-resumo">
        <div className="card-resumo">
          <span className="card-icone">📖</span>
          <div>
            <p className="card-label">Total de Livros</p>
            <p className="card-valor">{resumo ? resumo.totalLivros : "..."}</p>
          </div>
        </div>

        <div className="card-resumo">
          <span className="card-icone">✍️</span>
          <div>
            <p className="card-label">Autores Cadastrados</p>
            <p className="card-valor">{resumo ? resumo.totalAutores : "..."}</p>
          </div>
        </div>

        <div className="card-resumo">
          <span className="card-icone">📋</span>
          <div>
            <p className="card-label">Empréstimos Ativos</p>
            <p className="card-valor">{resumo ? resumo.emprestimosAtivos : "..."}</p>
          </div>
        </div>
      </div>

      <div className="acoes-rapidas">
        <NavLink to="/livros" className="acao-rapida">Novo Livro</NavLink>
        <NavLink to="/autores" className="acao-rapida">Novo Autor</NavLink>
        <NavLink to="/emprestimos" className="acao-rapida">Registrar Empréstimo</NavLink>
        <NavLink to="/usuarios" className="acao-rapida">Adicionar Usuário</NavLink>
      </div>
    </>
  );
}

export default Dashboard;