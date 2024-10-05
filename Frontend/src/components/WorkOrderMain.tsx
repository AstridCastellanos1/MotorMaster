import React, { useState } from 'react';
import "../CSS/WorkOrderMain.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

interface WorkOrderMainProps {
  status: string;
  clientName: string;
  service: string;
  plate: string;
  brand: string;
}

const WorkOrderMain: React.FC<WorkOrderMainProps> = ({ status, clientName, service, plate, brand }) => {

  const [selectedStatus, setSelectedStatus] = useState(status);

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
          <option value="registrado">Registrado</option>
          <option value="en_proceso">En Proceso</option>
          <option value="cerrado">Cerrado</option>
        </select>

        <p className='main-details-p'>Cliente</p>
        <div className="input-with-icons">
          <input type="text" value={clientName} placeholder="Ingrese el nombre del cliente" className="input-field" readOnly />
          <div className="icon-container">
            <FontAwesomeIcon icon={faEye} className="icon" />
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
