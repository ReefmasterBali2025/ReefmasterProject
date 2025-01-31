// import React, { createContext, useState } from 'react';

// // Buat AuthContext
// export const AuthContext = createContext();

// // Provider untuk AuthContext
// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: belum login

//     // Login function (contoh)
//     const login = () => setIsAuthenticated(true);

//     // Logout function (contoh)
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
