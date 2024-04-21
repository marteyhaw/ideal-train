"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CargoItem {
  quantity: number;
  unit: string;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  declaredValue: number;
}

interface CargoContextValue {
  cargoList: CargoItem[];
  setCargoList: Dispatch<SetStateAction<CargoItem[]>>;
  handleCargoSubmit: (newCargo: CargoItem) => void; // Adjusted to accept a single CargoItem
}

const CargoContext = createContext<CargoContextValue | null>(null);

export const useCargo = () => {
  const context = useContext(CargoContext);
  if (context === null)
    throw new Error("useCargo must be used within a CargoProvider");
  return context;
};

interface CargoProviderProps {
  children: ReactNode;
}

export const CargoProvider: React.FC<CargoProviderProps> = ({ children }) => {
  const [cargoList, setCargoList] = useState<CargoItem[]>(() => {
    // Load cargo list from localStorage or default to an empty array
    // Checking if localstorage is available by checking if the code is running in browser env
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("cargoList");
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    // Update localStorage whenever the cargo list changes
    if (typeof window !== "undefined") {
      localStorage.setItem("cargoList", JSON.stringify(cargoList));
    }
  }, [cargoList]);

  const handleCargoSubmit = (newCargo: CargoItem) => {
    setCargoList((currentCargoList) => [...currentCargoList, newCargo]);
  };

  return (
    <CargoContext.Provider
      value={{ cargoList, setCargoList, handleCargoSubmit }}
    >
      {children}
    </CargoContext.Provider>
  );
};
