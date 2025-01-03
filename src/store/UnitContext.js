import { createContext, useContext, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "weather-app-unit";

const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "metric";
  });

  function toggleUnit() {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, unit);
  }, [unit]);

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}
