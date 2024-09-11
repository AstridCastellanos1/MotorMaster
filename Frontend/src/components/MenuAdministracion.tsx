import HeaderApp from "./HeaderApp";
import Cards from "./Card";
import "../CSS/MenuAdministracion.css";

function MenuAdministracion() {
  return (
    <div className="menu-Admin-container">
      <HeaderApp />
      <div className="menu-Admin-content">
        <div className="grid-Admin-container">
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/clientes.jpg"
              title="Clientes"
              link="/informes"
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/proveedores.jpg"
              title="Proveedores"
              link="/tops"
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/usuarios.jpg"
              title="Usuarios"
              link="/Login/Menu/MenuAdministracion/Users"
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/productos.jpg"
              title="Productos"
              link="/ordenes"
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/vehiculos.jpg"
              title="Vehículos"
              link="/Login/Menu/MenuAdministracion"
            />
          </div>
          <div className="grid-Admin-item">
            <Cards
              imageSrc="/Images/servicios2.jpg"
              title="Servicios"
              link="/ordenes"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAdministracion;
