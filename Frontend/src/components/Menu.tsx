import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const Menu = (props: Props) => {
  const location = useLocation();
  const { usuario } = location.state || { usuario: "Invitado" };

  return <div>Bienvenido {usuario}</div>;
};

export default Menu;
