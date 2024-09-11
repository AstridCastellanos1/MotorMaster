import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import "../CSS/HeaderApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faHome,
  faCog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Importa Link

const HeaderApp: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    return <div>Error: Contexto no encontrado</div>;
  }

  const { valor } = globalContext;
  const primeraLetra = valor.charAt(0).toUpperCase();

  return (
    <div className="header-container">
      <div className="header-contain">
        <div className="icon" id="icon">
          <img
            src="/public/Images/LogoMotorMaster.png"
            alt="header-icon"
            className="header-img"
          />
        </div>
        <div className="profile" id="profile">
          <div className="profile-name">
            <label id="user-p">{primeraLetra}</label>
          </div>
        </div>
      </div>
      <div className="bar-menu">
        <Link to="/Login/Menu" className="bar-menu-item">
          <FontAwesomeIcon icon={faHome} />
          <span className="bar-menu-text">Home</span>
        </Link>
        <Link to="/Login/Menu/MenuAdministracion" className="bar-menu-item">
          <FontAwesomeIcon icon={faCog} />
          <span className="bar-menu-text">Administración</span>
        </Link>
        <Link to="/profile" className="bar-menu-item">
          <FontAwesomeIcon icon={faFileLines} />
          <span className="bar-menu-text">Informes</span>
        </Link>
        <Link to="/messages" className="bar-menu-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="bar-menu-text">Mensajes</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderApp;
