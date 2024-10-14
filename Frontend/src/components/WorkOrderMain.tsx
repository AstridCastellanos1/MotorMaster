import React, { useState, useEffect } from 'react';
import "../CSS/WorkOrderMain.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface WorkOrderMainProps {
  status: string;
  clientName: string;
  clientCode: string;
  responsibleName: string;
  responsibleCode: string;
  service: string;
  plate: string;
  brand: string;
}

const WorkOrderMain: React.FC<WorkOrderMainProps> = ({ status, clientName, clientCode, responsibleName, responsibleCode, service, plate, brand }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  // Validación del estado recibido y asignación inicial
  useEffect(() => {
    const validStatuses = ['Registrado', 'Proceso', 'Cerrado'];
    
    // Si el status recibido es válido, se asigna como valor inicial al select
    if (validStatuses.includes(status)) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus(''); // Deja la opción por defecto si no es válido
    }
  }, [status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    console.log(`Estado seleccionado: ${event.target.value}`);
  };

  return (
    <div className='information-div basic-div'>
      <div className='basic-information-div costumer-information'>
        <p className='main-details-p basic-details-p'>Información básica</p>

        <p className='main-details-p'>Estado</p>
        <select id="status" className='status-select' value={selectedStatus} onChange={handleStatusChange}>
          <option value="">Seleccione un estado</option>
          <option value="Registrado">Registrado</option>
          <option value="Proceso">En Proceso</option>
          <option value="Cerrado">Cerrado</option>
        </select>

        <p className='main-details-p'>Cliente</p>
        <div className="input-with-icons">
          <input type="text" value={clientName} placeholder="Ingrese el nombre del cliente" className="input-field input-fild-custom" readOnly />
        </div>
        <p className='main-details-p'>Responsable</p>
        <div className="input-with-icons">
          <input type="text" value={responsibleName} placeholder="Ingrese el nombre del responsable" className="input-field input-fild-responsible" />
          <div className="icon-container">
            <FontAwesomeIcon icon={faSearch} className="icon icon-buscar" />
            <FontAwesomeIcon icon={faTimes} className="icon icon-buscar" />
          </div>
        </div>
        <p className='main-details-p'>Servicio</p>
        <input type="text" value={service} placeholder="Ingrese el servicio" className="status-select input-service" readOnly />
      </div>

      <div className='basic-information-div vehicle-information'>
        <p className='main-details-p basic-details-p'>Información del vehículo</p>

        <p className='main-details-p'>Placa</p>
        <input type="text" value={plate} placeholder="Ingrese la placa" className="status-select input-service" readOnly />

        <p className='main-details-p'>Marca</p>
        <input type="text" value={brand} placeholder="Ingrese la marca" className="status-select input-service" readOnly />
      </div>
    </div>
  );
};

export default WorkOrderMain;
