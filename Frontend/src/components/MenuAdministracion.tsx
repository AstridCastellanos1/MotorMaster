import HeaderApp from "./HeaderApp";
import { useNavigate } from "react-router-dom";
import "../CSS/MenuAdministracion.css";
import React, { useState } from "react";

function MenuAdministracion() {
  const [caseCode, setCaseCode] = useState(""); // Estado para almacenar el código de caso
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Verifica si el código de caso tiene contenido
    if (caseCode.trim()) {
      navigate(`/Login/Menu/MenuAdministracion/WorkOrder/${caseCode}`); // Redirige a la vista de WorkOrder con el código de caso
    } else {
      alert("Por favor, ingrese un código de caso.");
    }
  };

  return (
    <div className="menu-Admin-container">
      <HeaderApp />
      <div className="menu-Admin-content">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex flex-row align-items-center w-100" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 input-administration"
                type="search"
                placeholder="Ingrese el No. de orden"
                aria-label="Search"
                value={caseCode} // Asocia el input al estado
                onChange={(e) => setCaseCode(e.target.value)} // Actualiza el estado con el valor del input
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MenuAdministracion;
