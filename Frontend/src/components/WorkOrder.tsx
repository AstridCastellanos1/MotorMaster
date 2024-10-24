import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../CSS/WorkOrder.css";
import "../CSS/WorkOrderMain.css";
import "../CSS/WorkOrderBottom.css";
import HeaderApp from "./HeaderApp";
import WorkOrderAside from "./WorkOrderAside";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import { faSave, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAutoResizeInput from './useAutoResizeInput';
import { useNavigate } from "react-router-dom";

const WorkOrder = () => {
  const { caseCode } = useParams<{ caseCode: string }>();
  const [orderData, setOrderData] = useState({
    creatorName: '',
    creationDate: '',
    expectedCost: 0,
    currentCost: 0,
    description: '',
    solution: '',
    status: '',
    clientName: '',
    clientCode: '',
    clientEmail: '',
    serviceCode: '',
    plate: '',
    brand: '',
    responsibleName: '',
    responsibleCode: '',
    users: [],
    services: []
  });

  useEffect(() => {
    const fetchWorkOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/workOrder/${caseCode}`);
        const result = await response.json();

        if (result.success) {
          const { 
            creatorName, 
            creationDate, 
            expectedCost, 
            currentCost, 
            description, 
            solution, 
            status, 
            clientName, 
            clientEmail, 
            serviceCode, 
            plate, 
            brand, 
            responsibleName, 
            clientCode, 
            responsibleCode,
            users,
            services
          } = result.data;
          
          setOrderData({
            creatorName: creatorName || 'Desconocido',
            creationDate: creationDate || 'Desconocida',
            expectedCost: expectedCost,
            currentCost: currentCost,
            description: description || '',
            solution: solution || '',
            status: status || '',
            clientName: clientName || '',
            clientCode: clientCode || '',
            clientEmail: clientEmail || '',
            serviceCode: serviceCode || '',
            plate: plate || '',
            brand: brand || '',
            responsibleName: responsibleName || '',
            responsibleCode: responsibleCode || '',
            users: users || [],
            services: services || []
          });
        } else {
          console.error("Error al obtener la orden de trabajo:", result.message);
        }
      } catch (error) {
        console.error("Error en la solicitud al backend:", error);
      }
    };

    fetchWorkOrderDetails();
  }, [caseCode]);

  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const validStatuses = ['Registrado', 'Proceso', 'Cerrado'];
    
    if (validStatuses.includes(orderData.status)) {
      setSelectedStatus(orderData.status);
    } else {
      setSelectedStatus(''); 
    }
  }, [orderData.status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    console.log(`Estado seleccionado: ${event.target.value}`);
  };

  

  // Función que maneja la salida

    const navigate = useNavigate();
    const [unsavedChanges, setUnsavedChanges] = useState(true);

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


  // Componente AutoResizeInput para ajustar el tamaño del input
  const AutoResizeInput = React.forwardRef<
  HTMLInputElement, // Tipo de ref
  { value: string; placeholder?: string; className?: string; readOnly?: boolean } // Props del componente
  >(({ value, placeholder, className, readOnly }, ref) => {
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
          ref={ref} // Ahora ref se maneja correctamente aquí
        />
      </div>
    );
  });

  // Componente WorkOrderBottom integrado
  const WorkOrderBottom = ({ description, solution }) => {
    const [activeTextArea, setActiveTextArea] = useState('description');
    return (
      <div className='information-div solution-div'>
        <div className='information-div nav-div'>
          <p
            className={`nav-information p-information description-p ${activeTextArea === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTextArea('description')}
          >
            Descripción
          </p>
          <p
            className={`nav-information p-information solution-p ${activeTextArea === 'solution' ? 'active' : ''}`}
            onClick={() => setActiveTextArea('solution')}
          >
            Solución
          </p>
        </div>
        <div className='description-solution'>
          {activeTextArea === 'description' && (
            <textarea
              className="description-solution-textarea"
              id="description-textarea"
              name="descripcion"
              placeholder="Escribe tu texto aquí..."
              defaultValue={description} // Asigna el valor de descripción
              readOnly
            ></textarea>
          )}
          {activeTextArea === 'solution' && (
            <textarea
              className="description-solution-textarea"
              id="solution-textarea"
              name="solucion"
              placeholder="Escribe la solución aquí..."
              defaultValue={solution} 
              ref={solutionRef}
            ></textarea>
          )}
        </div>
      </div>
    );
  };

   // Función para manejar el clic en el botón "Guardar"
   const solutionRef = React.useRef<HTMLTextAreaElement | null>(null);
  const statusRef = React.useRef<HTMLSelectElement | null>(null);
  const responsibleCodeRef = React.useRef<HTMLSelectElement | null>(null);
  const serviceCodeRef = React.useRef<HTMLSelectElement | null>(null);

  const handleSaveClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const confirmSave = window.confirm("¿Estás seguro de que quieres guardar los cambios?");

    if (confirmSave) {
      // Obtener los valores de los campos utilizando refs
      const solution = solutionRef.current?.value || ''; 
      const status = statusRef.current?.value || ''; 
      const responsibleCode = responsibleCodeRef.current?.value || ''; 
      const service = serviceCodeRef.current?.value || '';
      console.log(responsibleCode);
      // Crear un objeto con los datos a enviar al backend
      const dataToSend = {
        solution,
        status,
        responsibleCode,
        service,
        caseCode,
      };

      try {
        // Enviar los datos al backend con fetch
        const response = await fetch('http://localhost:3000/api/workOrder/update', {
          method: 'PUT', // Cambia a PUT para indicar que estás actualizando un recurso
          headers: {
            'Content-Type': 'application/json', // Indicamos que enviamos JSON
          },
          body: JSON.stringify(dataToSend), // Convertimos los datos a JSON
        });

        // Manejar la respuesta del backend
        if (response.ok) {
          const result = await response.json(); // Si el backend retorna algo
          console.log('Guardado correctamente:', result);
        } else {
          console.error('Error al guardar, estado del HTTP:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud al backend:', error);
      }
    }
  };

  return (
    <div>
      <HeaderApp />
      <div className='workOrder-information row'>
        <div className='col-lg-8' id='main-workOrder'>
          <div className='information-div nav-div'>
            <p className='nav-information'>Orden No. {caseCode}</p>
          </div>

          <div className='information-div basic-div'>
            <div className='basic-information-div costumer-information'>
              <p className='main-details-p basic-details-p'>Información básica</p>

              <p className='main-details-p'>Estado</p>
              <select id="status" className='status-select' value={selectedStatus} onChange={handleStatusChange} ref={statusRef}>
                <option value="">Seleccione un estado</option>
                <option value="Registrado">Registrado</option>
                <option value="Proceso">En Proceso</option>
                <option value="Cerrado">Cerrado</option>
              </select>

              <p className='main-details-p'>Cliente</p>
              <div className="input-with-icons">
                <AutoResizeInput 
                  value={orderData.clientName} 
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
              <select
                className='responsible-input-select'
                value={orderData.responsibleCode || ''}  // Mostrar el código del responsable seleccionado
                onChange={(e) => {
                  const selectedUserCode = parseInt(e.target.value, 10);
                  
                  const selectedUser = orderData.users.find(user => user.usu_codigo === selectedUserCode);

                  if (selectedUser) {
                    setOrderData((prev) => ({
                      ...prev,
                      responsibleCode: selectedUser.usu_codigo,
                      responsibleName: selectedUser.usu_nombre
                    }));
                    console.log('Usuario seleccionado:', selectedUser);
                  }
                }}

                ref={responsibleCodeRef}
              >
                <option value="">Seleccione un responsable</option>
                {orderData.users.map((user) => (
                  <option key={user.usu_codigo} value={user.usu_codigo}>
                    {user.usu_nombre}
                  </option>
                ))}
              </select>

              <p className='main-details-p'>Servicio</p>
              <select
                className='responsible-input-select'
                value={orderData.serviceCode || ''}  // Mostrar el código del responsable seleccionado
                onChange={(e) => {
                  const selectedServiceCode = parseInt(e.target.value, 10);
                  console.log('Service seleccionado:', selectedServiceCode);
                  const selectedService = orderData.services.find(service => service.ser_codigo === selectedServiceCode);
                  console.log('responsable', responsibleCodeRef)
                  if (selectedService) {
                    setOrderData((prev) => ({
                      ...prev,
                      serviceCode: selectedService.ser_codigo,
                      serviceName: selectedService.ser_nombre
                    }));
                    console.log('Servicio seleccionado:', selectedService);
                  } else {
                    console.log('Servicio no encontrado');
                  }
                }}
                ref={serviceCodeRef}
              >
                <option value="">Seleccione un servicio</option>
                {orderData.services.map((service) => (
                  <option key={service.ser_codigo} value={service.ser_codigo}>
                    {service.ser_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='basic-information-div vehicle-information'>
              <p className='main-details-p basic-details-p'>Información del vehículo</p>

              <p className='main-details-p'>Placa</p>
              <AutoResizeInput 
                value={orderData.plate} 
                placeholder="Ingrese la placa" 
                className="status-select input-service" 
                readOnly 
              />

              <p className='main-details-p'>Marca</p>
              <AutoResizeInput 
                value={orderData.brand} 
                placeholder="Ingrese la marca" 
                className="status-select input-service" 
                readOnly 
              />
            </div>
          </div>

          <WorkOrderBottom description={orderData.description} solution={orderData.solution} />
        </div>
        <div className='col-lg-4' id='aside-information'>
          <div className='row main-information-item' id='order-buttons'>
            <a href="#save" onClick={handleSaveClick} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
              <FontAwesomeIcon icon={faSave} />
              <span className="order-menu-text">Guardar</span>
            </a>
            <a href={`mailto:${orderData.clientEmail}?subject=Caso No. ${caseCode}&body=`} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="order-menu-text">Enviar Correo</span>
            </a>
            <a href="#exit" onClick={handleExitClick} className="order-buttons-item col-lg-4 col-md-4 col-sm-12">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="order-menu-text">Salir</span>
            </a>
          </div>
          <WorkOrderAside
            creatorName={orderData.creatorName}
            creationDate={orderData.creationDate}
            expectedCost={orderData.expectedCost}
            currentCost={orderData.currentCost}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkOrder;
