import { createContext, useContext, ReactNode } from "react";

const GlobalContext = createContext<any>({});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalContext.Provider value={{}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);