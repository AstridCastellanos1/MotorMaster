import React, { useState } from 'react';
import "../CSS/WorkOrderAside.css";

interface WorkOrderAsideProps {
  creatorName: string;
  creationDate: string;
  expectedCost: number;
  currentCost: number;
}

const WorkOrderAside: React.FC<WorkOrderAsideProps> = ({
  creatorName, creationDate, expectedCost, currentCost
}) => {
  
  return (
    <div className='main-workOrder'>
      <div className='' id='main-information'>
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
