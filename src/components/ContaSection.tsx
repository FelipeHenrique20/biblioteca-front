import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { criarCabecalhos, sessaoExpirada } from "../utils/api";

interface Conta {
    id: number;
    nome: string;
    email: string;
    role: "admin" | "comum";
    createdAt: string;
}

function ContaSection() {
    const [contas, setContas] = useState<Conta[]>([]);
    const [error, setError] = useState("");
    const { token, conta: contaLogada } = useAuth();

    useEffect(() => {
        buscarContas();
    }, []);

    function buscarContas() {
        fetch("http://localhost:3000/contas", {
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (sessaoExpirada(resposta)) return;
            
            if (resposta.ok) {
                resposta.json().then((dados) => setContas(dados));
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        })
    }

    function handlePromover(id: number) {
        setError("");

        fetch(`http://localhost:3000/contas/${id}/promover`, {
            method: "PATCH",
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (resposta.ok) {
                buscarContas();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    function handleRebaixar(id: number) {
        setError("");

        fetch(`http://localhost:3000/contas/${id}/rebaixar`, {
            method: "PATCH",
            headers: criarCabecalhos(token),
        }).then((resposta) => {
            if (resposta.ok) {
                buscarContas();
            } else {
                resposta.json().then((dados) => setError(dados.error));
            }
        });
    }

    return (
        <section>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {contas.map((conta) => (
                    <li key={conta.id}>
                        <div>
                            <strong>{conta.nome}</strong>
                            <span className="item-secundario"> — {conta.email}</span>
                        </div>
                        <div className="item-acoes">
                            <span
                                className={`badge ${
                                    conta.role === "admin"
                                        ? "badge-sucesso"
                                        : "badge-alerta"
                                }`}
                            >
                                {conta.role}
                            </span>
                            {conta.id !== contaLogada?.id && (
                                conta.role === "comum" ? (
                                    <button
                                        className="btn-neutro"
                                        onClick={() => handlePromover(conta.id)}
                                    >
                                        Promover a admin
                                    </button>
                                ) : (
                                    <button
                                        className="btn-neutro"
                                        onClick={() => handleRebaixar(conta.id)}
                                    >
                                        Rebaixar a comum
                                    </button>
                                )
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ContaSection;