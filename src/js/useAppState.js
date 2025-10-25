// src/js/useAppState.js

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'appState'; // Usamos una constante para evitar errores de tipeo

// 1. ESTADO POR DEFECTO COMPLETO
const DEFAULT_STATE = {
    isLogged: false,
    privacyAccepted: false,
    activeRequestId: null,
    // Claves de tu lógica antigua que deben estar presentes
    idUser: null, 
    correo: null, 
    tel: null,     
};


function useAppState() {
    
    // 2. FUNCIÓN DE CARGA INICIAL (Lazy State)
    const [state, setState] = useState(() => {
        try {
            const storedState = localStorage.getItem(STORAGE_KEY);
            if (storedState) {
                const loadedState = JSON.parse(storedState);
                // 💡 Fusión: Mantiene valores guardados, pero añade claves nuevas si faltan
                return { ...DEFAULT_STATE, ...loadedState };
            }
        } catch (e) {
            console.error("Error al cargar estado de LocalStorage:", e);
        }
        // Retorna el estado por defecto si falla o no existe
        return DEFAULT_STATE; 
    });

    // 3. EFECTO DE PERSISTENCIA
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Error al guardar estado en LocalStorage:", e);
        }
    }, [state]);

    // 4. FUNCIONES DE ACTUALIZACIÓN
    
    // Función general para actualizar cualquier parte del estado
    const updateState = (newStatePart) => {
        setState(prev => ({ 
            ...prev, 
            ...newStatePart 
        }));
    };
    
    // Funciones de acción que usan la función general
    const login = (userData) => { 
        updateState({ 
            isLogged: true, 
            idUser: userData.idUser, // Asume que le pasas los datos del usuario al loguearse
            correo: userData.correo 
        });
    };
    
    const logout = () => { 
        updateState({ 
            isLogged: false, 
            activeRequestId: null,
            idUser: null,
            correo: null,
            tel: null,
        });
    };
    
    const acceptPrivacy = () => { 
        updateState({ privacyAccepted: true }); 
    };

    const startRequest = (id) => { 
        updateState({ activeRequestId: id }); 
    };
    
    const finishRequest = () => { 
        updateState({ activeRequestId: null }); 
    };


    return {
        state,
        updateState, // Útil para cambios genéricos
        login,
        logout,
        acceptPrivacy,
        startRequest,
        finishRequest,
    };
}

export default useAppState;