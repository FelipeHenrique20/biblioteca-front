import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RotaProtegida from "./components/RotaProtegida";
import RotaPublica from "./components/RotaPublica";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Autores from "./pages/Autores";
import Livros from "./pages/Livros";
import Usuarios from "./pages/Usuarios";
import Emprestimos from "./pages/Emprestimos";

function App() {
  return (
    <Routes>
      <Route element={<RotaPublica />}>
        <Route path="/login" element={<Login />} />
      </Route>

    <Route element={<RotaProtegida />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="autores" element={<Autores />} />
        <Route path="livros" element={<Livros />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="emprestimos" element={<Emprestimos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;