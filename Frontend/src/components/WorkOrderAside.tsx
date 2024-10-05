import React, { useEffect, useState } from 'react';
import "../CSS/WorkOrderAside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faEnvelope, 
  faSignOutAlt, 
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface WorkOrderAsideProps {
  creatorName: string;
  creationDate: string;
  expectedCost: number;
  currentCost: number;
}

const WorkOrderAside: React.FC<WorkOrderAsideProps> = ({ creatorName, creationDate, expectedCost, currentCost }) => {
  const navigate = useNavigate();
  const [unsavedChanges, setUnsavedChanges] = useState(true); // Simula si hay cambios no guardados

  // Función que maneja el clic en el botón de salir
  const handleExitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Evita la acción por defecto del enlace

    if (unsavedChanges) {
      // Muestra el mensaje de confirmación si hay cambios no guardados
      const confirmExit = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?");
      if (confirmExit) {
        // Redirige a la ruta si el usuario confirma
        navigate("/Login/Menu/MenuAdministracion");
      }
    } else {
      // Redirige directamente si no hay cambios sin guardar
      navigate("/Login/Menu/MenuAdministracion");
    }
  };

  return (
    <div className='main-workOrder'>
      <div className='' id='main-information'>
        <div className='row main-information-item' id='order-buttons'>
          <a href="#save" className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
            <FontAwesomeIcon icon={faSave} />
            <span className="order-menu-text">Guardar</span>
          </a>
          <a href="mailto:astridcorado88@gmail.com?subject=Asunto del correo&body=Cuerpo del correo" className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="order-menu-text">Enviar Correo</span>
          </a>
          <a href="#exit" onClick={handleExitClick} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="order-menu-text">Salir</span>
          </a>
        </div>

        {/* Información del creador */}
        <div className='main-information-item' id='order-creator'>
          <p className='creation-details-p'>Detalles de Creación</p>
          <hr className='creation-details-hr' />
          <p className='creation-details-p'>Creador</p>
          <p className='creation-details-p information-p' id='creator-p'>{creatorName}</p>
          <p className='creation-details-p'>Fecha de Creación</p>
          <p className='creation-details-p information-p' id='creation-date-p'>{creationDate}</p>
        </div>

        {/* Información de costos */}
        <div className='main-information-item' id='order-cost'>
          <p className='creation-details-p'>Detalles de Costos</p>
          <hr className='cost-details-hr' />
          <p className='cost-details-p'>Costo esperado</p>
          <p className='cost-details-p information-p' id='expected-cost-p'>Q. {expectedCost}</p> 
          <p className='cost-details-p'>Costo actual</p>
          <p className='cost-details-p information-p' id='current-cost-p'>Q. {currentCost}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderAside;
