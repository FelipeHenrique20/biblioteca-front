import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import iconeLivro from "../assets/iconeLivro.png";
import iconeAutor from "../assets/iconeAutor.png";
import iconeEmprestimo from "../assets/iconeEmprestimo.png";

interface Resumo {
  totalLivros: number;
  totalAutores: number;
  emprestimosAtivos: number;
}

interface Livro {
  id: number;
  titulo: string;
}

interface Usuario {
  id: number;
  nome: string;
}

interface Emprestimo {
  id: number;
  livroId: number;
  usuarioId: number;
  dataEmprestimo: string;
  dataDevolucao: string | null;
}

interface Atividade {
  chave: string;
  data: string;
  tipo: "Empréstimo" | "Devolução";
  livro: string;
  usuario: string;
}

function formatarData(dataIso: string) {
  // dataIso vem como "YYYY-MM-DD HH:MM:SS" (formato do SQLite)
  const [dataParte] = dataIso.split(" ");
  const [ano, mes, dia] = dataParte.split("-");
  return `${dia}/${mes}/${ano}`;
}

function Dashboard() {
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/livros").then((r) => r.json()),
      fetch("http://localhost:3000/autores").then((r) => r.json()),
      fetch("http://localhost:3000/emprestimos/ativos").then((r) => r.json()),
      fetch("http://localhost:3000/emprestimos").then((r) => r.json()),
      fetch("http://localhost:3000/usuarios").then((r) => r.json()),
    ]).then(([livros, autores, emprestimosAtivos, emprestimos, usuarios]: [
      Livro[],
      unknown[],
      unknown[],
      Emprestimo[],
      Usuario[]
    ]) => {
      setResumo({
        totalLivros: livros.length,
        totalAutores: autores.length,
        emprestimosAtivos: emprestimosAtivos.length,
      });

      setAtividades(montarAtividades(emprestimos, livros, usuarios));
    });
  }, []);

  function montarAtividades(
    emprestimos: Emprestimo[],
    livros: Livro[],
    usuarios: Usuario[]
  ): Atividade[] {
    const eventos: Atividade[] = [];

    for (const emprestimo of emprestimos) {
      const livro = livros.find((l) => l.id === emprestimo.livroId);
      const usuario = usuarios.find((u) => u.id === emprestimo.usuarioId);

      eventos.push({
        chave: `${emprestimo.id}-emprestimo`,
        data: emprestimo.dataEmprestimo,
        tipo: "Empréstimo",
        livro: livro ? livro.titulo : "Livro desconhecido",
        usuario: usuario ? usuario.nome : "Usuário desconhecido",
      });

      if (emprestimo.dataDevolucao) {
        eventos.push({
          chave: `${emprestimo.id}-devolucao`,
          data: emprestimo.dataDevolucao,
          tipo: "Devolução",
          livro: livro ? livro.titulo : "Livro desconhecido",
          usuario: usuario ? usuario.nome : "Usuário desconhecido",
        });
      }
    }

    // Mais recentes primeiro, limitando aos 5 últimos eventos
    return eventos
      .sort((a, b) => (a.data < b.data ? 1 : -1))
      .slice(0, 5);
  }

  return (
    <>
      <h1>Painel do Sistema de Biblioteca</h1>
      <p className="subtitulo">Visão geral e ações rápidas</p>

      <div className="cards-resumo">
        <div className="card-resumo">
          <img src={iconeLivro} alt="Ícone de livro" className="card-icone" />
          <div>
            <p className="card-label">Total de Livros</p>
            <p className="card-valor">{resumo ? resumo.totalLivros : "..."}</p>
          </div>
        </div>

        <div className="card-resumo">
          <img src={iconeAutor} alt="Ícone de Autor" className="card-icone" />
          <div>
            <p className="card-label">Autores Cadastrados</p>
            <p className="card-valor">{resumo ? resumo.totalAutores : "..."}</p>
          </div>
        </div>

        <div className="card-resumo">
          <img src={iconeEmprestimo} alt="Ícone de Emprestimo" className="card-icone" />
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

      <section>
        <h2>Atividades Recentes</h2>

        {atividades.length === 0 ? (
          <p className="item-secundario">Nenhuma atividade registrada ainda.</p>
        ) : (
          <table className="tabela-atividades">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Livro</th>
                <th>Usuário</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((atividade) => (
                <tr key={atividade.chave}>
                  <td>{formatarData(atividade.data)}</td>
                  <td>{atividade.tipo}</td>
                  <td>{atividade.livro}</td>
                  <td>{atividade.usuario}</td>
                  <td>
                    <span
                      className={`badge ${
                        atividade.tipo === "Devolução" ? "badge-sucesso" : "badge-alerta"
                      }`}
                    >
                      {atividade.tipo === "Devolução" ? "Entregue" : "No Prazo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default Dashboard;