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
    // REMOVIDO: useNavigate não deve ser usado aqui.
    // const navigate = useNavigate();

    // Verifica o status de login ao carregar o Provider
    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    // Função para login
    const login = (token) => {
        sessionStorage.setItem('access_token', token);
        setIsLoggedIn(true);
        // O redirecionamento após o login será tratado no componente de login (AdminLogin).
    };

    // Função para logout
    const logout = () => {
        sessionStorage.removeItem('access_token');
        setIsLoggedIn(false);
        // CORRIGIDO: O redirecionamento será tratado pelo componente que chamar 'logout' (ex: Nav.jsx).
        // navigate('/delivery/admin');
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
