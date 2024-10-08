import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa el hook useParams
import "../CSS/WorkOrder.css";
import HeaderApp from "./HeaderApp";
import WorkOrderAside from "./WorkOrderAside";
import WorkOrderBottom from "./WorkOrderBottom";
import WorkOrderMain from "./WorkOrderMain";

const WorkOrder = () => {
  const { caseCode } = useParams<{ caseCode: string }>(); // Extrae el código de la URL
  const [orderData, setOrderData] = useState({
    creatorName: '',
    creationDate: '',
    expectedCost: 0,
    currentCost: 0,
    description: '',
    solution: '',
    status: '',
    clientName: '',
    service: '',
    plate: '',
    brand: ''
  });

  useEffect(() => {
    const fetchWorkOrderDetails = async () => {
      try {
        // Usa el caseCode extraído de la URL para hacer la petición
        const response = await fetch(`http://localhost:3000/api/workOrder/${caseCode}`);
        const result = await response.json();

        if (result.success) {
          const { creatorName, creationDate, expectedCost, currentCost, description, solution, status, clientName, service, plate, brand } = result.data;

          setOrderData({
            creatorName: creatorName || 'Desconocido',
            creationDate: creationDate || 'Desconocida',
            expectedCost: expectedCost || 0,
            currentCost: currentCost || 0,
            description: description || '',
            solution: solution || '',
            status: status || '',
            clientName: clientName || '',
            service: service || '',
            plate: plate || '',
            brand: brand || ''
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

  return (
    <div>
      <HeaderApp />
      <div className='workOrder-information row'>
        <div className='col-lg-8' id='main-workOrder'>
          <div className='information-div nav-div'>
            <p className='nav-information'>Caso No. {caseCode}</p>
          </div>
          <WorkOrderMain
            status={orderData.status}
            clientName={orderData.clientName}
            service={orderData.service}
            plate={orderData.plate}
            brand={orderData.brand}
          />
          <WorkOrderBottom description={orderData.description} solution={orderData.solution} />
        </div>
        <div className='col-lg-4' id='aside-information'>
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
