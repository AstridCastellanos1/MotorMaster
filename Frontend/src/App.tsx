import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import MenuAdministracion from "./components/MenuAdministracion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login/Menu" element={<Menu />} />
        <Route
          path="/Login/Menu/MenuAdministracion"
          element={<MenuAdministracion />}
        />
      </Routes>
    </Router>
  );
}

export default App;
