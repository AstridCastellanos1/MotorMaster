import React, { useEffect, useState } from 'react';
import "../CSS/WorkOrder.css";
import HeaderApp from "./HeaderApp";
import WorkOrderAside from "./WorkOrderAside";

const WorkOrder = () => {
  const [orderData, setOrderData] = useState({
    creatorName: '',
    creationDate: '',
    expectedCost: 0,
    currentCost: 0
  });

  useEffect(() => {
    // Función para obtener los detalles de la orden de trabajo
    const fetchWorkOrderDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/workOrder/1101");
        const result = await response.json();

        // Verifica que 'result.data' contenga los datos que necesitas
        if (result.success) {
          // Aquí puedes asegurarte de que la estructura coincide con lo que esperas
          const { creatorName, creationDate, expectedCost, currentCost } = result.data;

          setOrderData({
            creatorName: creatorName || 'Desconocido',
            creationDate: creationDate || 'Desconocida',
            expectedCost: expectedCost || 0,
            currentCost: currentCost || 0
          });
        } else {
          console.error("Error al obtener la orden de trabajo:", result.message);
        }
      } catch (error) {
        console.error("Error en la solicitud al backend:", error);
      }
    };

    fetchWorkOrderDetails();
  }, []);

  return (
    <div>
      <HeaderApp />
      <div className='main-workOrder row'>
        <div className='col-lg-8' id='workOrder-information'>
          {/* Información adicional de la orden */}
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
}

export default WorkOrder;
