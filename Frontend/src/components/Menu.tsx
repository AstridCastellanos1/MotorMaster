import HeaderApp from "./HeaderApp";
import Cards from "./Card";
import "../CSS/Menu.css";

function Menu() {
  return (
    <div className="menu-container">
      <HeaderApp />
      <div className="menu-content">
        <div className="grid-container">
          <div className="grid-item">
            <Cards
              imageSrc="/Images/Informes.jpg"
              title="Informes"
              link="/informes"
            />
          </div>
          <div className="grid-item">
            <Cards imageSrc="/Images/Top.jpeg" title="Tops" link="/tops" />
          </div>
          <div className="grid-item">
            <Cards
              imageSrc="/Images/PanelAdministracion.jpg"
              title="Panel de Administración"
              link="/Login/Menu/MenuAdministracion"
            />
          </div>
          <div className="grid-item">
            <Cards
              imageSrc="/Images/Servicios.jpg"
              title="Ordenes de Trabajo"
              link="/Login/Menu/MenuAdministracion"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
