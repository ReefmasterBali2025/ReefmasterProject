import { createContext, useContext } from "react";

// Buat Currency Context
const CurrencyContext = createContext("$");

// Hook untuk akses context
export const useCurrency = () => useContext(CurrencyContext);

// Provider untuk membungkus aplikasi
export const CurrencyProvider = ({ children }) => {
    return (
        <CurrencyContext.Provider value="$">
            {children}
        </CurrencyContext.Provider>
    );
};
