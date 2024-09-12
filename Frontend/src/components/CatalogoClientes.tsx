import React from "react";
import HeaderApp from "./HeaderApp";

import "../CSS/CatalogoClientes.css";
import { BiFontColor } from "react-icons/bi";

const CatalogoClientes: React.FC = () => {
  return (
    <div className="menu-container">
      <HeaderApp />
      <div className="menu-Div">
        <h1>Clientes</h1>
      </div>
      <div className="menu-content">
        <div className="grid-container">
          <div className="grid-items">
            <h3>NOMBRES</h3>
            <input type="text" placeholder="NOMBRES " />
          </div>

          <div className="grid-items">
            <h3>APELLIDOS</h3>
            <input type="text" placeholder="APELLIDOS " />
          </div>

          <div className="grid-items">
            <h3>NIT</h3>
            <input type="text" placeholder="NIT " />
          </div>

          <div className="grid-items">
            <h3>TELEFONO</h3>
            <input type="text" placeholder="TELEFONO " />
          </div>

          <div className="grid-items">
            <h3>DPI</h3>
            <input type="text" placeholder="DPI " />
          </div>

          <div className="grid-items">
            <h3>CORREO ELECTRONICO</h3>
            <input type="text" placeholder="CORREO ELECTRONICO " />
          </div>
        </div>

        <div />
      </div>

      <div className="Tabla-cli">
        <table>
          <thead>
            <tr>
              <th>
                <h3>ID</h3>
              </th>
              <th>
                <h3>Nombre Completo</h3>
              </th>
              <th>
                <h3>DPI</h3>
              </th>
              <th>
                <h3>Teléfono</h3>
              </th>
              <th>
                <h3>Correo Electronico</h3>
              </th>
            </tr>

            <tr>
              <th>
                <h3>230290392039</h3>
              </th>
              <th>
                <h3>OSMAR ALBERTO VALENCIA GARCIA</h3>
              </th>
              <th>
                <h3>3006389430101</h3>
              </th>
              <th>
                <h3>46875122</h3>
              </th>
              <th>
                <h3>osmartv@gmail.com</h3>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default CatalogoClientes;
