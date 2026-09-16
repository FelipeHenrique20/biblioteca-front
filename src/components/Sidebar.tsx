import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Feather, Users, ClipboardList, Library, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
    const { conta, logout } = useAuth();
    const navigate = useNavigate();
    
    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <Library className="sidebar-logo-icone" />
                <h1>Biblioteca</h1>
            </div>

            <nav className="sidebar-menu">
                <NavLink to="/" className="sidebar-item" end>
                    <LayoutDashboard className="sidebar-item-icone" />
                    Dashboard
                </NavLink>

                <NavLink to="/livros" className="sidebar-item">
                    <BookOpen className="sidebar-item-icone" />
                    Livros
                </NavLink>

                <NavLink to="/autores" className="sidebar-item">
                    <Feather className="sidebar-item-icone" />
                    Autores
                </NavLink>

                <NavLink to="/usuarios" className="sidebar-item">
                    <Users className="sidebar-item-icone" />
                    Usuários
                </NavLink>

                <NavLink to="/emprestimos" className="sidebar-item">
                    <ClipboardList className="sidebar-item-icone" />
                    Empréstimos
                </NavLink>
            </nav>

            <div className="sidebar-rodape">
                {conta && (
                    <p className="sidebar-conta">
                        {conta.nome} <span className="item-secundario">({conta.role})</span>
                    </p>
                )}
                <button className="sidebar-item sidebar-sair" onClick={handleLogout}>
                    <LogOut className="sidebar-item-icone" />
                    Sair
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;