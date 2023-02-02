import { Route, Routes } from "react-router";
import { Menu } from "./components/paginas/Menu";
import { NuevoPlatillo } from "./components/paginas/NuevoPlatillo";
import { Ordenes } from "./components/paginas/Ordenes";
import { Sidebar } from "./components/ui/Sidebar";
import firebase, { FirebaseContext } from "./firebase";


function App() {
  return (
    <FirebaseContext.Provider
    // para poder acceder a ellos
    value={{
      // esta clase inicia todo la app y tiene accedo a todo de firebase
      firebase
    }}
    >
      <div className="md:flex min-h-screen">
        {/* para que se mire en todos lso componentes */}
        <Sidebar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            {/* para la pagina principal */}
            <Route path="/" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}





export default App;
