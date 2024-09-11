import React, { createContext, useState, ReactNode } from "react";

interface GlobalContextProps {
  valor: string;
  setValor: (valor: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [valor, setValor] = useState<string>("Valor inicial");

  return (
    <GlobalContext.Provider value={{ valor, setValor }}>
      {children}
    </GlobalContext.Provider>
  );
};
