import React from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import { f7, f7ready, App, View } from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import store from '../js/store';

// 🚨 IMPORTAMOS EL CONTEXTO Y EL PROVIDER
// Asegúrate de que esta ruta sea correcta: './js/AppStateContext'
import { AppStateProvider, useApp } from '../js/AppStateContext'; 


// ------------------------------------------------------------------
// 1. Componente que maneja el Enrutamiento Dinámico (NECESITA el Context)
// ------------------------------------------------------------------
const RootView = () => {
  
  // ¡Aquí el Hook useApp() funciona porque estamos dentro del Provider!
  const { state } = useApp(); 
  
  // Lógica para determinar la URL inicial
  const getInitialUrl = () => {
    // Tu lógica original (correcta)
    if (!state.privacyAccepted) {
      return '/avisoprivacidad/';
    } else if (state.isLogged && state.idUser !== null) {
      return '/home/';
    } else {
      return '/login/';
    }
  };
  
  const initialUrl = getInitialUrl(); 

  // La URL inicial es dinámica, y animate={false} previene el parpadeo
  return (
      <View 
        main 
        className="safe-areas" 
        url={initialUrl} 
        animate={false} // Deshabilita la animación para la carga inicial
      />
  );
};


// ------------------------------------------------------------------
// 2. Componente de Configuración de Framework7 (NO NECESITA el Context)
// ------------------------------------------------------------------
const MyAppContent = () => {
    const device = getDevice();
    
    // Configuración de Framework7
    const f7params = {
      name: 'React teste',
      theme: 'auto',
      store: store,
      routes: routes,
      input: {
        scrollIntoViewOnFocus: device.cordova,
        scrollIntoViewCentered: device.cordova,
      },
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    };

    f7ready(() => {
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
    });

    return (
      <App { ...f7params }>
          {/* 🚨 Usamos RootView aquí para renderizar la View principal */}
          <RootView /> 
      </App>
    );
};


// ------------------------------------------------------------------
// 3. Componente Exportado (Envuelve todo en el Provider)
// ------------------------------------------------------------------
const AppRoot = () => (
    // 🚨 EL PROVIDER DEBE ENVOLVER TODO PARA QUE useApp() FUNCIONE
    <AppStateProvider>
        <MyAppContent />
    </AppStateProvider>
);

export default AppRoot;