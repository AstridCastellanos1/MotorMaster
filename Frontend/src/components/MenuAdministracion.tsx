import HeaderApp from "./HeaderApp";
import { useNavigate } from "react-router-dom";
import "../CSS/MenuAdministracion.css";
import React, { useState, useEffect } from "react";

// Define la interfaz para el tipo de dato de las órdenes de trabajo
interface WorkOrder {
  caseNumber: string;
  creationDate: string;
  status: string;
  clientName: string;
  responsibleName: string;
}

function MenuAdministracion() {
  const [caseCode, setCaseCode] = useState("");
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]); 
  const navigate = useNavigate();

  // Función para obtener todas las órdenes de trabajo
  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/workOrder/all"); 
        const result = await response.json();

        if (result.success) {
          setWorkOrders(result.data); // Guardar los datos obtenidos en el estado
        } else {
          console.error("Error al obtener las órdenes de trabajo:", result.message);
        }
      } catch (error) {
        console.error("Error en la solicitud al backend:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (caseCode.trim()) {
      navigate(`/Login/Menu/MenuAdministracion/WorkOrder/${caseCode}`);
    } else {
      alert("Por favor, ingrese un código de caso.");
    }
  };

  return (
    <div className="menu-Admin-container">
      <HeaderApp />
      <div className="menu-Admin-content">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex flex-row align-items-center w-100" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 input-administration"
                type="search"
                placeholder="Ingrese el No. de orden"
                aria-label="Search"
                value={caseCode}
                onChange={(e) => setCaseCode(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </nav>
      </div>
      <table className="table table-sm" id="table-case">
        <thead>
          <tr>
            <th scope="col" className="text-center table-headers">No. Caso</th>
            <th scope="col" className="text-center table-headers">Fecha de Registro</th>
            <th scope="col" className="text-center table-headers">Estado</th>
            <th scope="col" className="text-center table-headers">Cliente</th>
            <th scope="col" className="text-center table-headers">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((order) => (
            <tr key={order.caseNumber}>
              <th scope="row" className="text-center">
                <a href="#" onClick={() => navigate(`/Login/Menu/MenuAdministracion/WorkOrder/${order.caseNumber}`)}>
                  {order.caseNumber}
                </a>
              </th>
              <td className="text-center">{order.creationDate}</td>

              {/* Aplicación condicional de clase según el estado */}
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
