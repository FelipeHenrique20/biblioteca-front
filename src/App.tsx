import AutorSection from "./components/AutorSection";
import LivroSection from "./components/LivroSection";
import UsuarioSection from "./components/UsuarioSection";
import EmprestimoSection from "./components/EmprestimoSection";

function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <AutorSection />
      <LivroSection />
      <UsuarioSection />
      <EmprestimoSection />
    </div>
  );
}

export default App;