"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IUsuario } from "../types/IUsuario.types";

const GlobalContext = createContext<any>({});


export const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [array_usuario, set_array_usuario] = useState<IUsuario[]>([]);

  return (
    <GlobalContext.Provider value={{

      array_usuario,
      set_array_usuario,

    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);