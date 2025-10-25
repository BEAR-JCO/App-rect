// src/pages/AvisoPrivacidadPage.jsx

import React from 'react';
import { 
    Page, 
    Navbar, 
    BlockTitle, 
    Block, 
    Button, 
    Row, // Reemplaza a grid grid-cols-2
    Col, // Reemplaza a col
    f7 // Para la navegación
} from 'framework7-react';

// 🚨 Importamos el Hook para acceder a las funciones de estado
import { useApp } from '../js/AppStateContext'; 

const AvisoPrivacidadPage = () => {
    
    // Obtenemos la función para actualizar el estado global
    const { acceptPrivacy } = useApp(); 
    
    // --------------------------------------------------------
    // LÓGICA DE ACEPTACIÓN
    // --------------------------------------------------------
    const handleAceptar = () => {
        // 1. Actualiza el estado global (y LocalStorage)
        acceptPrivacy(); 
        
        // 2. Navega a la ruta inicial, que el componente RootView 
        //    (MyApp.jsx) resolverá a /login/ o /home/.
        // Usamos reloadAll: true para resetear la navegación.
        f7.views.main.router.navigate('/', { reloadAll: true });
    };

    // --------------------------------------------------------
    // LÓGICA DE RECHAZO
    // --------------------------------------------------------
    const handleRechazar = () => {
        // 1. Opcional: Podrías forzar el logout si ya estaba logueado
        // logout(); 
        
        // 2. Mostrar un mensaje y salir o cerrar la app (depende de la plataforma)
        f7.dialog.alert('No podrá usar la aplicación hasta que acepte los términos.', () => {
             // 💡 En Cordova, podrías usar navigator.app.exitApp() aquí
             // Por ahora, solo cerramos la aplicación de forma forzada si es necesario, 
             // o lo dejamos en esta pantalla.
        });
        
        // En una app web, lo dejaríamos en la página sin poder navegar.
    };

    return (
        // El atributo data-name del div se convierte en el prop name en React
        <Page name="aviso_privacidad"> 

            {/* 1. Navbar */}
            <Navbar title="Aviso de Privacidad" />

            {/* 2. Contenido de la Página */}
            <div className="page-content">

                {/* Block Title */}
                <BlockTitle large>Términos y Condiciones de Uso</BlockTitle>

                {/* Bloque de Contenido */}
                {/* block-strong-ios y block-outline-ios se pasan como props */}
                <Block strong outline> 
                    <p><strong>Última actualización: 12 de Octubre de 2025</strong></p>

                    <p>Al utilizar nuestra aplicación, usted acepta los siguientes términos y condiciones en su totalidad. Por
                        favor, lea atentamente este documento.</p>

                    <h3>1. Recolección y Uso de Información Personal</h3>
                    <p>Nos comprometemos a proteger su privacidad. Recolectamos información que usted nos proporciona
                        directamente (nombre, correo electrónico) y datos de uso de la aplicación (dispositivo, hora de acceso).
                        Esta información se utiliza exclusivamente para mejorar la experiencia de usuario y optimizar el
                        rendimiento de la aplicación. No compartimos su información personal con terceros sin su consentimiento
                        explícito, excepto cuando sea requerido por ley.</p>

                    <h3>2. Consentimiento</h3>
                    <p>Al hacer clic en "Aceptar y Continuar", usted otorga su consentimiento libre, específico, informado e
                        inequívoco para que procesemos su información personal conforme a este Aviso de Privacidad. Si no está
                        de acuerdo, por favor haga clic en "Rechazar y Salir".</p>

                    <h3>3. Derechos del Usuario (ARCO)</h3>
                    <p>Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales.
                        Para ejercer cualquiera de estos derechos, por favor contacte a nuestro equipo de soporte en la
                        dirección proporcionada al final de este aviso.</p>

                    <p>El uso continuado de la aplicación después de cualquier modificación a este aviso implica la aceptación
                        de dichos cambios.</p>

                    <p>Atentamente, El equipo de Mi App F7.</p>
                </Block>

                <BlockTitle>¿Acepta los términos?</BlockTitle>

                {/* Bloque de Botones */}
                <Block strong outline>
                    {/* Reemplazamos 'div class="grid grid-cols-2 grid-gap"' con el componente Row */}
                    <Row tag="div" noGap> 
                        
                        {/* 1. Botón Aceptar */}
                        {/* Reemplazamos 'a href="#"' con el componente Button y 'col' con Col */}
                        <Col tag="div">
                            <Button 
                                id="btn-aceptar-privacidad" 
                                fill 
                                onClick={handleAceptar} // 🚨 Evento de React
                            >
                                Aceptar y Continuar
                            </Button>
                        </Col>

                        {/* 2. Botón Rechazar */}
                        <Col tag="div">
                            <Button 
                                id="btn-rechazar-privacidad" 
                                fill 
                                color="red"
                                onClick={handleRechazar} // 🚨 Evento de React
                            >
                                Rechazar y Salir
                            </Button>
                        </Col>
                    </Row>
                </Block>

            </div>
        </Page>
    );
};

export default AvisoPrivacidadPage;