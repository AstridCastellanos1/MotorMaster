import React, { useEffect, useState } from "react";
import "../CSS/HeaderApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faHome,
  faCog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

type HeaderAppProps = {
  userInitial?: string;
};

function HeaderApp({ userInitial }: HeaderAppProps) {
  const userLabel = document.getElementById("user-p")?.innerText;
  const [initial, setInitial] = useState(userInitial || userLabel);

  useEffect(() => {
    // Si no hay inicial recibida desde el login, intenta obtenerla del label
    if (!userInitial) {
      const userLabel = document.getElementById("user-p")?.innerText;
      if (userLabel) {
        setInitial(userLabel);
      }
    }
  }, [userInitial]);

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
            <label id="user-p">{initial}</label>
          </div>
        </div>
      </div>
      <div className="bar-menu">
        <a href="/Login/Menu" className="bar-menu-item">
          <FontAwesomeIcon icon={faHome} />
          <span className="bar-menu-text">Home</span>
        </a>
        <a href="/Login/Menu/MenuAdministracion" className="bar-menu-item">
          <FontAwesomeIcon icon={faCog} />
          <span className="bar-menu-text">Administración</span>
        </a>
        <a href="/profile" className="bar-menu-item">
          <FontAwesomeIcon icon={faFileLines} />
          <span className="bar-menu-text">Informes</span>
        </a>
        <a href="/messages" className="bar-menu-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="bar-menu-text">Mensajes</span>
        </a>
      </div>
    </div>
  );
}

export default HeaderApp;
