import React, { useState, useEffect } from 'react';
import "../CSS/WorkOrderMain.css";
import './AdjustWidth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import useAutoResizeInput from './UseAutoResizeInput'; // Importa el hook personalizado

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

const WorkOrderMain: React.FC<WorkOrderMainProps> = ({
  status,
  clientName,
  clientCode,
  responsibleName,
  responsibleCode,
  service,
  plate,
  brand
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const validStatuses = ['Registrado', 'Proceso', 'Cerrado'];
    
    if (validStatuses.includes(status)) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus(''); 
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
          <AutoResizeInput 
            value={clientName} 
            placeholder="Ingrese el nombre del cliente" 
            className="input-field" 
            readOnly 
          />
          <div className="icon-container">
            <FontAwesomeIcon icon={faEye} className="icon icon-buscar" />
            <FontAwesomeIcon icon={faSearch} className="icon icon-buscar" />
          </div>
        </div>

        <p className='main-details-p'>Responsable</p>
        <div className="input-with-icons">
          <AutoResizeInput 
            value={responsibleName} 
            placeholder="Ingrese el nombre del responsable" 
            className="input-field" 
            readOnly 
          />
          <div className="icon-container">
            <FontAwesomeIcon icon={faSearch} className="icon icon-buscar" />
          </div>
        </div>

        <p className='main-details-p'>Servicio</p>
        <AutoResizeInput 
          value={service} 
          placeholder="Ingrese el servicio" 
          className="status-select input-service" 
          readOnly 
        />

      </div>

      <div className='basic-information-div vehicle-information'>
        <p className='main-details-p basic-details-p'>Información del vehículo</p>

        <p className='main-details-p'>Placa</p>
        <AutoResizeInput 
          value={plate} 
          placeholder="Ingrese la placa" 
          className="status-select input-service" 
          readOnly 
        />

        <p className='main-details-p'>Marca</p>
        <AutoResizeInput 
          value={brand} 
          placeholder="Ingrese la marca" 
          className="status-select input-service" 
          readOnly 
        />
      </div>
    </div>
  );
};

// Componente AutoResizeInput para ajustar el tamaño del input
const AutoResizeInput: React.FC<{ value: string; placeholder?: string; className?: string; readOnly?: boolean }> = ({ value, placeholder, className, readOnly }) => {
  const { inputWidth, spanRef } = useAutoResizeInput(value);

  return (
    <div className="auto-resize-input-wrapper">
      <span ref={spanRef} className="hidden-span">{value}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        style={{ width: `${inputWidth + 20}px` }}
        className={className}
        readOnly={readOnly}
      />
    </div>
  );
};

export default WorkOrderMain;
