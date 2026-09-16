import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setErro("");

        fetch("http://localhost:3000/contas/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((dados) => {
                    login(dados.token, dados.conta);
                    navigate("/");
                });
            } else {
                resposta.json().then((dados) => setErro(dados.error));
            }
        });
    }

    return (
        <div className="tela-login">
            <form onSubmit={handleSubmit} className="form-login">
                <h1>Biblioteca</h1>
                <p className="subtitulo">Entre com sua conta</p>

                <div className="campo-formulario">
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                    />
                </div>

                <div className="campo-formulario">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="••••••"
                    />
                </div>

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;