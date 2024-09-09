import React from "react";
import { useLocation } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import Cards from "./Card";
import "../CSS/MenuAdministracion.css";

const MenuAdministracion: React.FC = () => {
  const location = useLocation();
  const { usuario } = location.state || { usuario: "T" }; // Valor por defecto
  const userInitial = usuario.charAt(0).toUpperCase();

  return (
    <div className="menu-Admin-container">
      <HeaderApp userInitial={userInitial} />
      <div className="menu-Admin-content">
        <div className="grid-Admin-container">
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/clientes.png"
              title="Clientes"
              link="/informes"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/Proveedores.png"
              title="Proveedores"
              link="/tops"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/usuarios.png"
              title="Usuarios"
              link="/ordenes"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/tickets.jpeg"
              title="Productos"
              link="/ordenes"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/PanelAdministracion.jpg"
              title="Marcas de Vehículos"
              link="/Login/Menu/MenuAdministracion"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/tickets.jpeg"
              title="Marcas de Productos"
              link="/ordenes"
              userInitial={userInitial} // Pasamos la inicial al card
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAdministracion;
