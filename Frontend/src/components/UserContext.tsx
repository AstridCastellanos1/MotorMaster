import React, { createContext, useState, useContext } from "react";

interface UserContextType {
  userInitial: string;
  setUserInitial: (initial: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInitial, setUserInitial] = useState<string>("");

  return (
    <UserContext.Provider value={{ userInitial, setUserInitial }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
