import React from "react";
import { useLocation } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import Cards from "./Card";
import "../CSS/Menu.css";

const Menu: React.FC = () => {
  const location = useLocation();
  const { usuario } = location.state || { usuario: "Invitado" }; // Valor por defecto
  const userInitial = usuario.charAt(0).toUpperCase();

  return (
    <div className="menu-container">
      <HeaderApp userInitial={userInitial} />
      <div className="menu-content">
        <div className="grid-container">
          <div className="grid-item">
            <Cards
              imageSrc="/Images/Informes.jpg"
              title="Informes"
              link="/informes"
              userInitial={userInitial} // Pasa la inicial aquí
            />
          </div>
          <div className="grid-item">
            <Cards
              imageSrc="/Images/Top.jpeg"
              title="Tops"
              link="/tops"
              userInitial={userInitial} // Pasa la inicial aquí
            />
          </div>
          <div className="grid-item">
            <Cards
              imageSrc="/Images/PanelAdministracion.jpg"
              title="Panel de Administración"
              link="/Login/Menu/MenuAdministracion"
              userInitial={userInitial} // Pasa la inicial aquí
            />
          </div>
          <div className="grid-item">
            <Cards
              imageSrc="/Images/tickets.jpeg"
              title="Ordenes de Trabajo"
              link="/ordenes"
              userInitial={userInitial} // Pasa la inicial aquí
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
