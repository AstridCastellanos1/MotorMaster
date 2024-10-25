import HeaderApp from "./HeaderApp";
import { useNavigate } from "react-router-dom";
import "../CSS/MenuAdministracion.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye,faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Define la interfaz para el tipo de dato de las órdenes de trabajo
interface WorkOrder {
  caseNumber: string;
  creationDate: string;
  status: string;
  clientName: string;
  responsibleName: string;
}

function MenuAdministracion() {
  const [caseCode, setCaseCode] = useState(""); // Código de caso ingresado por el usuario
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]); // Todas las órdenes de trabajo
  const [filteredWorkOrders, setFilteredWorkOrders] = useState<WorkOrder[]>([]); // Órdenes filtradas
  const navigate = useNavigate();

  // Función para obtener todas las órdenes de trabajo
  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/workOrder/all"); 
        const result = await response.json();

        if (result.success) {
          setWorkOrders(result.data); // Guardar todas las órdenes en el estado
          setFilteredWorkOrders(result.data); // Inicialmente, mostrar todas las órdenes
        } else {
          console.error("Error al obtener las órdenes de trabajo:", result.message);
        }
      } catch (error) {
        console.error("Error en la solicitud al backend:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  // Función para manejar el filtrado al presionar "Buscar"
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Filtrar las órdenes que coincidan con el código de caso ingresado
    if (caseCode.trim()) {
      const filteredOrders = workOrders.filter((order) =>
        String(order.caseNumber).toLowerCase().includes(caseCode.toLowerCase()) // Convertimos caseNumber a string
      );
  
      if (filteredOrders.length > 0) {
        setFilteredWorkOrders(filteredOrders); // Mostrar solo las órdenes filtradas
      } else {
        alert("No se encontraron órdenes con ese código de caso.");
        setFilteredWorkOrders([]); // Si no se encuentran coincidencias, se vacía la tabla
      }
    } else {
      // Si no hay un código de caso, mostrar todas las órdenes nuevamente
      setFilteredWorkOrders(workOrders);
    }
  };
  


const exportToExcel = () => {
  // Datos que quieres exportar
  const data = filteredWorkOrders.map(order => ({
    "No. Orden": order.caseNumber,
    "Fecha de Registro": order.creationDate,
    "Estado": order.status,
    "Cliente": order.clientName,
    "Responsable": order.responsibleName
  }));

  // Crear un arreglo con el encabezado y los datos
  const header = [["MotorMaster - Órdenes de Trabajo", "", "", "", ""]]; // Cabecera combinada
  
  const emptyRow = [["","", "", "", ""]]; // Fila vacía
  const columnHeaders = ["No. Orden", "Fecha de Registro", "Estado", "Cliente", "Responsable"];
  
  // Asegúrate de que la fila de encabezados esté bien formada
  const rows = data.map(order => [
    order["No. Orden"],
    order["Fecha de Registro"],
    order["Estado"],
    order["Cliente"],
    order["Responsable"]
  ]);

  const allData = header.concat(emptyRow,[columnHeaders], rows);
  // Crea la hoja
  const ws = XLSX.utils.aoa_to_sheet(allData);

  // Combinar celdas 
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, 
    { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } }  
  ];

  // Crear el libro y agregar la hoja
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Órdenes de Trabajo");

  // Generar el archivo Excel y descargar
  XLSX.writeFile(wb, 'Ordenes_Trabajo.xlsx');
  
};

  return (
    <div className="menu-Admin-container">
      <HeaderApp />
      <div className="menu-Admin-content">
        <nav className="navbar-submit" id="navbar-search">
          <div className="input-container">
            <button className="button-icon" type="submit" onClick={handleSubmit}>
              <FontAwesomeIcon
                icon={faSearch}
                className="icon icon-buscar"
              />
            </button>
            <input
              className="input-administration"
              id="input-serch"
              type="text"
              placeholder="No. de orden"
              aria-label="Search"
              value={caseCode}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                // Solo permitir números
                if (/^\d*$/.test(value)) {
                  setCaseCode(value); // Solo actualizar si es un número
                }
              }}
            />
          </div>
          <a href="" className="navbar-buttons-item">
            <FontAwesomeIcon icon={faPlus} />
            <span className="order-menu-text">Nuevo</span>
          </a>
          <a href="#" className="navbar-buttons-item" onClick={exportToExcel}>
            <FontAwesomeIcon icon={faFileExport} />
            <span className="order-menu-text">Exportar</span>
          </a>
        </nav>
      </div>
      <table className="table table-sm" id="table-case">
        <thead>
          <tr>
            <th scope="col" className="text-center table-headers">No. Orden</th>
            <th scope="col" className="text-center table-headers">Fecha de Registro</th>
            <th scope="col" className="text-center table-headers">Estado</th>
            <th scope="col" className="text-center table-headers">Cliente</th>
            <th scope="col" className="text-center table-headers">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkOrders.map((order) => (
            <tr key={order.caseNumber}>
              <th scope="row" className="text-center">
                <a href="#" onClick={() => navigate(`/Login/Menu/MenuAdministracion/WorkOrder/${order.caseNumber}`)}>
                  {order.caseNumber}
                </a>
              </th>
              <td className="text-center">{order.creationDate}</td>
              <td className={`text-center tr-status ${order.status === "Cerrado" ? "status-cerrado" : order.status === "Proceso" ? "status-en-proceso" : ""}`}>
                {order.status}
              </td>
              <td className="text-center">{order.clientName}</td>
              <td className="text-center">{order.responsibleName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuAdministracion;
