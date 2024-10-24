import React from "react";
import { GlobalProvider } from "./components/context/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import MenuAdministracion from "./components/MenuAdministracion";
import Users from "./components/Users";
import CatalogoClientes from "./components/CatalogoClientes";
import WorkOrder from "./components/WorkOrder";
import useAutoResizeInput from "./components/UseAutoResizeInput";

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
          <Route
            path="/Login/Menu/MenuAdministracion/CatalogoClientes"
            element={<CatalogoClientes />}
          />
          <Route path="/Login/Menu/MenuAdministracion/WorkOrder/:caseCode" element={<WorkOrder />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
