import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

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
    handleCargoSubmit: (newCargo: CargoItem[]) => void;
}

const CargoContext = createContext<CargoContextValue | null>(null);

export const useCargo = () => {
    const context = useContext(CargoContext);
    if (context === null) throw new Error('useCargo must be used within a CargoProvider');
    return context;
};

interface CargoProviderProps {
    children: ReactNode;
}

export const CargoProvider: React.FC<CargoProviderProps> = ({ children }) => {
    const [cargoList, setCargoList] = useState<CargoItem[]>([]);

    const handleCargoSubmit = (newCargo: CargoItem[]) => {
        setCargoList((currentCargoList) => [...currentCargoList, ...newCargo]);
    };

    return (
        <CargoContext.Provider value={{ cargoList, setCargoList, handleCargoSubmit }}>
            {children}
        </CargoContext.Provider>
    );
};
