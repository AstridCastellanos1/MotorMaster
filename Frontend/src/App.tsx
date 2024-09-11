import React from "react";
import { GlobalProvider } from "./components/context/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import MenuAdministracion from "./components/MenuAdministracion";
import Users from "./components/Users";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Login/Menu" element={<Menu />} />
          <Route
            path="/Login/Menu/MenuAdministracion"
            element={<MenuAdministracion />}
          />
          <Route
            path="/Login/Menu/MenuAdministracion/Users"
            element={<Users />}
          />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
