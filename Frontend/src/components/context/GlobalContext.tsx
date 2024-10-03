import React, { createContext, useState, ReactNode } from "react";

interface GlobalContextProps {
  valor: string;
  setValor: (valor: string) => void;
  imagen: string; // Agregado para la imagen
  setImagen: (imagen: string) => void; // Agregado para el setter de la imagen
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [valor, setValor] = useState<string>("Valor inicial");
  const [imagen, setImagen] = useState<string>(""); // Estado para almacenar la imagen

  return (
    <GlobalContext.Provider value={{ valor, setValor, imagen, setImagen }}>
      {children}
    </GlobalContext.Provider>
  );
};
