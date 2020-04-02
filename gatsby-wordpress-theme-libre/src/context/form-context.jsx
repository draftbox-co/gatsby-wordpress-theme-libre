import React, { createContext } from "react";

export const ArmadaFormsContext = createContext({
  client: undefined
});

ArmadaFormsContext.displayName = "Armada Forms";

export const ArmadaFormsProvider = ({ client, children }) => {
  return (
    <ArmadaFormsContext.Provider value={{ client }}>
      {children}
    </ArmadaFormsContext.Provider>
  );
};
