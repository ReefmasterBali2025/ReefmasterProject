import { createContext, useContext, useState } from "react";

// 🔹 Buat Context
const SearchContext = createContext();

// 🔹 Provider untuk membungkus komponen
export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Function untuk filter berdasarkan latinName
    const filterByLatinName = (products) => {
        return products.filter(product =>
            product.latinName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const value = { searchQuery, setSearchQuery, filterByLatinName }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

// 🔹 Custom Hook agar lebih mudah dipakai
export const useSearch = () => useContext(SearchContext);
