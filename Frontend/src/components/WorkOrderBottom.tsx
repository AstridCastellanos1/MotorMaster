import React, { useState } from 'react';
import "../CSS/WorkOrderBottom.css";

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
                        defaultValue={solution} // Asigna el valor de solución
                    ></textarea>
                )}
            </div>
        </div>
    );
}

export default WorkOrderBottom;
