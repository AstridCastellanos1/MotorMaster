// WorkOrderContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface WorkOrderData {
  status: string;
  clientName: string;
  responsibleName: string;
  service: string;
  plate: string;
  brand: string;
}

interface WorkOrderContextType {
  workOrderData: WorkOrderData;
  updateWorkOrderData: (newData: Partial<WorkOrderData>) => void;
  saveWorkOrder: () => Promise<void>;
}

const WorkOrderContext = createContext<WorkOrderContextType | undefined>(undefined);

export const WorkOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workOrderData, setWorkOrderData] = useState<WorkOrderData>({
    status: '',
    clientName: '',
    responsibleName: '',
    service: '',
    plate: '',
    brand: '',
  });

  const updateWorkOrderData = (newData: Partial<WorkOrderData>) => {
    setWorkOrderData((prevData) => ({ ...prevData, ...newData }));
  };

  const saveWorkOrder = async () => {
    try {
      const response = await fetch('/api/workorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workOrderData),
      });
      if (!response.ok) {
        throw new Error('Error al guardar la orden de trabajo');
      }
      // Manejar la respuesta del backend
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WorkOrderContext.Provider value={{ workOrderData, updateWorkOrderData, saveWorkOrder }}>
      {children}
    </WorkOrderContext.Provider>
  );
};

export const useWorkOrder = () => {
  const context = useContext(WorkOrderContext);
  if (!context) {
    throw new Error('useWorkOrder must be used within a WorkOrderProvider');
  }
  return context;
};
