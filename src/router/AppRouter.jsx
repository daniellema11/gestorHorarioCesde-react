import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Home,
  Login,
  AdminDashboard,
  ProfesorDashboard,
  Soporte,
  RecuperarContrasena,
  Notificaciones,
  Chatbot
} from '../pages'

// Configuración del router usando createBrowserRouter (HU05)
const router = createBrowserRouter([
  // Rutas públicas
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/soporte', element: <Soporte /> },
  { path: '/recuperar-contrasena', element: <RecuperarContrasena /> },
  { path: '/chatbot', element: <Chatbot /> },
  
  // Rutas del administrador
  { path: '/admin', element: <AdminDashboard /> },
  
  // Rutas del profesor
  { path: '/profesor', element: <ProfesorDashboard /> },
  { path: '/profesor/notificaciones', element: <Notificaciones /> },
  { path: '/profesor/chatbot', element: <Chatbot /> },
  
  // Ruta 404
  { path: '*', element: <Home /> }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
