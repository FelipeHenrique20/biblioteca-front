import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Autores from "./pages/Autores";
import Livros from "./pages/Livros";
import Usuarios from "./pages/Usuarios";
import Emprestimos from "./pages/Emprestimos";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        <main className="main-content">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;