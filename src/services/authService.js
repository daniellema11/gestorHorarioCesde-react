/**
 * HU10 - Persistencia de Sesión y Preferencias
 * Servicio de autenticación con localStorage
 */

const AUTH_TOKEN_KEY = 'authToken'
const USER_DATA_KEY = 'userData'
const USER_PREFERENCES_KEY = 'userPreferences'

/**
 * Guarda el token de autenticación en localStorage
 * @param {string} token - Token JWT
 */
export const guardarToken = (token) => {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  } catch (error) {
    console.error('Error al guardar token:', error)
  }
}

/**
 * Obtiene el token de autenticación del localStorage
 * @returns {string|null} Token almacenado
 */
export const obtenerToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch (error) {
    console.error('Error al obtener token:', error)
    return null
  }
}

/**
 * Elimina el token de autenticación
 */
export const eliminarToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  } catch (error) {
    console.error('Error al eliminar token:', error)
  }
}

/**
 * Verifica si hay una sesión activa
 * @returns {boolean} true si hay sesión activa
 */
export const estaAutenticado = () => {
  const token = obtenerToken()
  return token !== null && token !== ''
}

/**
 * Guarda los datos del usuario en localStorage
 * @param {object} userData - Datos del usuario
 */
export const guardarUsuario = (userData) => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
  } catch (error) {
    console.error('Error al guardar usuario:', error)
  }
}

/**
 * Obtiene los datos del usuario del localStorage
 * @returns {object|null} Datos del usuario
 */
export const obtenerUsuario = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    return null
  }
}

/**
 * Elimina los datos del usuario
 */
export const eliminarUsuario = () => {
  try {
    localStorage.removeItem(USER_DATA_KEY)
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
  }
}

/**
 * Inicia sesión y guarda la información
 * @param {object} userData - Datos del usuario
 * @param {string} token - Token de autenticación
 */
export const iniciarSesion = (userData, token) => {
  guardarToken(token)
  guardarUsuario(userData)
}

/**
 * Cierra sesión y limpia localStorage
 */
export const cerrarSesion = () => {
  eliminarToken()
  eliminarUsuario()
}

/**
 * Guarda las preferencias del usuario (tema, idioma, etc.)
 * @param {object} preferences - Preferencias del usuario
 */
export const guardarPreferencias = (preferences) => {
  try {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error('Error al guardar preferencias:', error)
  }
}

/**
 * Obtiene las preferencias del usuario
 * @returns {object} Preferencias del usuario
 */
export const obtenerPreferencias = () => {
  try {
    const preferences = localStorage.getItem(USER_PREFERENCES_KEY)
    return preferences ? JSON.parse(preferences) : {
      tema: 'claro',
      idioma: 'es'
    }
  } catch (error) {
    console.error('Error al obtener preferencias:', error)
    return { tema: 'claro', idioma: 'es' }
  }
}
