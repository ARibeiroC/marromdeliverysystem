import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Context de Autenticação
const AuthContext = createContext(null);

// 2. Cria um Hook customizado para usar o Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Cria o Provider de Autenticação
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verifica o status de login ao carregar o Provider
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    // Função para login
    const login = (token) => {
        localStorage.setItem('access_token', token);
        setIsLoggedIn(true);
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    };

    // O valor que será fornecido para os componentes que consumirem o Context
    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
