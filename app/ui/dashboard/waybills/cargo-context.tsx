// import React, { createContext, useContext, useState } from 'react';

// const CargoContext = createContext(null);

// export const useCargo = () => useContext(CargoContext);

// export const CargoProvider = ({ children }) => {
//     const [cargoList, setCargoList] = useState([]);

//     const handleCargoSubmit = (newCargo) => {
//         setCargoList([...cargoList, ...newCargo]);
//     };

//     return (
//         <CargoContext.Provider value={{ cargoList, handleCargoSubmit }}>
//             {children}
//         </CargoContext.Provider>
//     );
// };
