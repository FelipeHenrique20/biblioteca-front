import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span>📚</span>
                <h1>Biblioteca</h1>
            </div>

            <nav className="sidebar-menu">

                <NavLink to="/" className="sidebar-item">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/livros" className="sidebar-item">
                    📚 Livros
                </NavLink>

                <NavLink to="/autores" className="sidebar-item">
                    ✍️ Autores
                </NavLink>

                <NavLink to="/usuarios" className="sidebar-item">
                    👥 Usuários
                </NavLink>

                <NavLink to="/emprestimos" className="sidebar-item">
                    📋 Empréstimos
                </NavLink>

            </nav>
        </aside>
    );
}

export default Sidebar;