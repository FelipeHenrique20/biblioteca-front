import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Feather, Users, ClipboardList, Library } from "lucide-react";

function Sidebar() {
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
        </aside>
    );
}

export default Sidebar;