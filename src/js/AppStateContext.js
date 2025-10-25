// src/js/AppStateContext.js
import React, { createContext, useContext } from 'react';
import useAppState from './useAppState'; // Importamos tu custom Hook

// 1. Creamos el Contexto
const AppStateContext = createContext(null);

// 2. Definimos el Hook personalizado para acceder al estado
export const useApp = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useApp debe ser usado dentro de un AppStateProvider');
    }
    return context;
};

// 3. Definimos el Componente Provider
export const AppStateProvider = ({ children }) => {
    // Usamos tu custom Hook para obtener el estado y las acciones
    const appStateData = useAppState();

    return (
        <AppStateContext.Provider value={appStateData}>
            {children}
        </AppStateContext.Provider>
    );
};