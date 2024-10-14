import React, { useState } from 'react';
import "../CSS/WorkOrderAside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Importa axios para hacer la solicitud HTTP

interface WorkOrderAsideProps {
  creatorName: string;
  creationDate: string;
  expectedCost: number;
  currentCost: number;
  clientEmail: string;
  caseCode: string;
  solution: string;  // Añadido solution
  description: string;  // Añadido description
  status: string;  // Añadido status
  clientName: string;  // Añadido clientName
  responsibleName: string;  // Añadido responsibleName
}

const WorkOrderAside: React.FC<WorkOrderAsideProps> = ({
  creatorName, creationDate, expectedCost, currentCost, clientEmail, caseCode,
  solution, description, status, clientName, responsibleName
}) => {
  const navigate = useNavigate();
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  // Función que maneja el envío de datos al backend
  const handleSaveClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    try {
      const workOrderData = {
        caseCode,
        creatorName,
        creationDate,
        expectedCost,
        currentCost,
        clientEmail,
        solution,
        description,
        status,
        clientName,
        responsibleName
      };

      // Envía los datos al backend usando axios
      const response = await axios.post('/api/workOrder/save', workOrderData);

      if (response.status === 200) {
        alert('Orden de trabajo guardada exitosamente');
        setUnsavedChanges(false);
      }
    } catch (error) {
      console.error("Error al guardar la orden de trabajo:", error);
      alert('Hubo un error al guardar la orden de trabajo');
    }
  };

  // Función que maneja la salida
  const handleExitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (unsavedChanges) {
      const confirmExit = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?");
      if (confirmExit) {
        navigate("/Login/Menu/MenuAdministracion");
      }
    } else {
      navigate("/Login/Menu/MenuAdministracion");
    }
  };

  return (
    <div className='main-workOrder'>
      <div className='' id='main-information'>
        <div className='row main-information-item' id='order-buttons'>
          <a href="#save" onClick={handleSaveClick} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
            <FontAwesomeIcon icon={faSave} />
            <span className="order-menu-text">Guardar</span>
          </a>
          <a href={`mailto:${clientEmail}?subject=Caso No. ${caseCode}&body=`} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
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
