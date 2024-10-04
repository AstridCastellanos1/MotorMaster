import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import "../CSS/HeaderApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faHome,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Importa Link

const HeaderApp: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    return <div>Error: Contexto no encontrado</div>;
  }

  const { valor, imagen } = globalContext;

  return (
    <div className="header-container">
      <div className="header-contain">
        <div className="navbar-brand d-flex align-items-center">
          <img
            src="/public/Images/LogoMotorMaster.png"
            alt="header-icon"
            className="header-img"
            id="icon"
          />
          <p className="name mb-0 ms-2">MotorMaster</p>
        </div>

        <div className="d-flex" id="img-container">
          {/* Mostrar la imagen obtenida desde el contexto */}
          <img
              className="rounded-circle"
              id="img-profile"
              src={imagen ? `data:image/png;base64,${imagen}` : "/default-profile.png"}
              alt="Profile Image"
          />
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
        <Link to="/faq" className="bar-menu-item">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span className="bar-menu-text">Preguntas Frecuentes</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderApp;
