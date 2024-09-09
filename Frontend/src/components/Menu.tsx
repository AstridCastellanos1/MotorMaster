import React from "react";
import { useLocation } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import "../CSS/Menu.css";

type Props = {};

const Menu: React.FC<Props> = () => {
  const location = useLocation();
  const { usuario } = location.state || { usuario: "Invitado" };
  const userInitial = usuario.charAt(0).toUpperCase(); // Extraer la inicial y asegurar que sea mayúscula

  return (
    <div className="menu-container">
      <HeaderApp userInitial={userInitial} /> {/* Pasar la inicial como prop */}
      <div className="menu-content">Más contenido</div>
    </div>
  );
};

export default Menu;
