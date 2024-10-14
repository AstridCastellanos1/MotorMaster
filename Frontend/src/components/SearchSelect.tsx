import React, { useState } from 'react';

interface Option {
  id: number; // Puedes usar cualquier tipo de identificador
  name: string; // El texto que se mostrará en la lista
}

interface SearchSelectProps {
  options: Option[]; // Lista de opciones que se pueden seleccionar
  initialValue: string; // Valor inicial que se mostrará en el input
  onChange: (selectedOption: Option | null) => void; // Función que se llamará al seleccionar una opción
}

const SearchSelect: React.FC<SearchSelectProps> = ({ options, initialValue, onChange }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filtrar las opciones basadas en el texto ingresado
    const newFilteredOptions = options.filter(option => 
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
    setIsOptionsVisible(value.length > 0); // Mostrar opciones si hay texto
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.name);
    setFilteredOptions([]); // Limpiar opciones al seleccionar
    setIsOptionsVisible(false); // Ocultar opciones
    onChange(option); // Llamar la función onChange con la opción seleccionada
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOptionsVisible(false); // Ocultar opciones al salir del input
    }, 200);
  };

  return (
    <div className="search-select" onBlur={handleBlur}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Buscar..."
        onFocus={() => setIsOptionsVisible(true)} // Mostrar opciones al enfocar el input
      />
      {isOptionsVisible && filteredOptions.length > 0 && (
        <ul className="options-list">
          {filteredOptions.map(option => (
            <li key={option.id} onClick={() => handleOptionClick(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
