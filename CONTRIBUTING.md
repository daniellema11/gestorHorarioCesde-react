# Guía de Flujo de Trabajo Colaborativo (HU11)

## Convención de Conventional Commits

Todos los mensajes de commit deben seguir el formato de **Conventional Commits**:

```
<tipo>: <descripción corta>
```

### Tipos de Commits Permitidos

| Tipo     | Descripción                                          | Ejemplo                                           |
|----------|------------------------------------------------------|---------------------------------------------------|
| `feat`   | Nueva funcionalidad                                  | `feat: agregar vista de registro`                 |
| `fix`    | Corrección de errores                                | `fix: corregir validación en formulario de login` |
| `docs`   | Cambios en documentación                             | `docs: actualizar README con instrucciones`       |
| `style`  | Cambios de formato (sin afectar funcionalidad)       | `style: formatear código con prettier`            |
| `refactor`| Reestructuración de código sin cambiar funcionalidad| `refactor: simplificar lógica de autenticación`   |
| `test`   | Agregar o modificar tests                            | `test: agregar tests para servicio de login`      |
| `chore`  | Tareas de mantenimiento                              | `chore: instalar sweetalert2`                     |

### Ejemplos de Commits para este Proyecto

```bash
# Nueva funcionalidad
git commit -m "feat: implementar página de registro de usuarios"
git commit -m "feat: agregar carga automática de datos con useEffect"

# Correcciones
git commit -m "fix: corregir validación de contraseñas en registro"
git commit -m "fix: resolver error de navegación en cerrar sesión"

# Mantenimiento
git commit -m "chore: instalar sweetalert2"
git commit -m "chore: configurar variables de entorno"

# Documentación
git commit -m "docs: agregar guía de convenciones de commits"
```

---

## Estrategia de Feature Branching

### Flujo de Trabajo

1. **Rama principal (`main`):** Código estable y listo para producción
2. **Ramas de funcionalidad (`feature/`):** Desarrollo aislado de cada historia de usuario

### Nomenclatura de Ramas

```
feature/HU<número>-<descripción-corta>
```

### Ejemplos de Ramas

| Historia de Usuario | Nombre de Rama                          |
|---------------------|-----------------------------------------|
| HU05                | `feature/HU05-navegacion-router`        |
| HU06                | `feature/HU06-formularios-useState`     |
| HU07                | `feature/HU07-modulo-api`               |
| HU08                | `feature/HU08-carga-datos-useEffect`    |
| HU09                | `feature/HU09-sweetalert-notificaciones`|
| HU10                | `feature/HU10-persistencia-sesion`      |

### Proceso de Trabajo

1. **Crear rama desde main:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/HU05-navegacion-router
   ```

2. **Desarrollar y hacer commits:**
   ```bash
   git add .
   git commit -m "feat: implementar createBrowserRouter"
   git commit -m "feat: agregar página de registro"
   ```

3. **Subir rama al repositorio:**
   ```bash
   git push origin feature/HU05-navegacion-router
   ```

4. **Crear Pull Request:**
   - Ir a GitHub/GitLab
   - Crear Pull Request desde `feature/HU05-navegacion-router` hacia `main`
   - Agregar descripción de los cambios
   - Solicitar revisión de código

5. **Fusionar después de aprobación:**
   - Merge a `main` después de la aprobación del PR
   - Eliminar rama de funcionalidad

### Comandos Útiles

```bash
# Ver todas las ramas
git branch -a

# Cambiar de rama
git checkout feature/HU07-modulo-api

# Ver estado de cambios
git status

# Ver historial de commits
git log --oneline

# Actualizar rama con cambios de main
git checkout feature/mi-rama
git merge main
```

---

## Flujo Visual

```
main ─────●─────────────────●─────────────────●─────> (estable)
           \               /                 /
feature/HU05 \─────●─────●/                 /
               \                           /
feature/HU06    \─────●─────●─────●───────/
```

Cada rama `feature/` se desarrolla de forma independiente y se fusiona con `main` mediante Pull Requests.
