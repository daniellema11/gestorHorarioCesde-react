# Gestor Horario CESDE - React

Sistema de gestión de horarios para CESDE, migrado a React.

## Tecnologías

- React 18
- React Router DOM 6
- Vite
- SweetAlert2

## Estructura del Proyecto

```
src/
├── assets/           # Imágenes, iconos y recursos estáticos
│   └── images/
├── components/       # Componentes reutilizables
│   └── common/       # Header, Footer, Modal, Calendar, etc.
├── helpers/          # Funciones de utilidad (validaciones, formateo)
├── pages/            # Páginas de la aplicación
│   ├── Home/
│   ├── Login/
│   ├── AdminDashboard/
│   ├── ProfesorDashboard/
│   ├── Soporte/
│   ├── RecuperarContrasena/
│   ├── Notificaciones/
│   └── Chatbot/
├── router/           # Configuración de rutas
├── services/         # Servicios (localStorage, API)
└── styles/           # Estilos globales y variables CSS
```

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Credenciales de Prueba

- **Administrador:** usuario: `admin`, contraseña: `1234`
- **Profesor:** usuario: `profesor`, contraseña: `1234`

## Características

- ✅ Gestión de horarios para administradores
- ✅ Vista de calendario para profesores
- ✅ Sistema de notificaciones
- ✅ Chatbot de soporte
- ✅ Recuperación de contraseña
- ✅ Diseño responsive
- ✅ Validación de formularios

## Colores del Tema

- **Primario:** #E91E75 (Rosa CESDE)
- **Secundario:** #433F3F (Gris oscuro)
- **Fondo:** #EBEBEB (Gris claro)
