import { HomePage, AvisoPrivacidadPage } from '../pages'; 

var routes = [
  {
    path: '/home/',
    component: HomePage,
  },
  {
    path: '/avisoprivacidad/',
    component: AvisoPrivacidadPage, // 👈 Usas el componente importado
  },
  // ... otras rutas
];

export default routes;