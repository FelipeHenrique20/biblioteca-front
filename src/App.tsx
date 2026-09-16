import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Autores from "./pages/Autores";
import Livros from "./pages/Livros";
import Usuarios from "./pages/Usuarios";
import Emprestimos from "./pages/Emprestimos";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="autores" element={<Autores />} />
        <Route path="livros" element={<Livros />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="emprestimos" element={<Emprestimos />} />
      </Route>
    </Routes>
  );
}

export default App;