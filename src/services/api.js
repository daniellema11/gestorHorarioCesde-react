/**
 * HU07 - Abstracción de Red y Peticiones al Servidor
 * Módulo centralizado para la configuración de peticiones de red
 */

// URL base del servidor (evita "magic strings")
const API_BASE_URL = 'http://localhost:3000'

// Endpoints de la API (rutas específicas centralizadas)
export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  // Recursos de la aplicación
  PERSONAS: '/api/personas',
  HORARIOS: '/api/horarios',
  MATERIAS: '/api/materias',
  AULAS: '/api/aulas',
  NOTIFICACIONES: '/api/notificaciones'
}

/**
 * Construye la URL completa a partir de un endpoint
 * @param {string} endpoint - Endpoint de la API
 * @returns {string} URL completa
 */
export const buildUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`
}

/**
 * Configuración base para las peticiones fetch
 */
const getDefaultHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

/**
 * Realiza una petición GET
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise} Respuesta de la API
 */
export const get = async (endpoint) => {
  try {
    const response = await fetch(buildUrl(endpoint), {
      method: 'GET',
      headers: getDefaultHeaders()
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error en petición GET:', error)
    throw error
  }
}

/**
 * Realiza una petición POST
 * @param {string} endpoint - Endpoint de la API
 * @param {object} data - Datos a enviar
 * @returns {Promise} Respuesta de la API
 */
export const post = async (endpoint, data) => {
  try {
    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error en petición POST:', error)
    throw error
  }
}

/**
 * Realiza una petición PUT
 * @param {string} endpoint - Endpoint de la API
 * @param {object} data - Datos a enviar
 * @returns {Promise} Respuesta de la API
 */
export const put = async (endpoint, data) => {
  try {
    const response = await fetch(buildUrl(endpoint), {
      method: 'PUT',
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error en petición PUT:', error)
    throw error
  }
}

/**
 * Realiza una petición DELETE
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise} Respuesta de la API
 */
export const del = async (endpoint) => {
  try {
    const response = await fetch(buildUrl(endpoint), {
      method: 'DELETE',
      headers: getDefaultHeaders()
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error en petición DELETE:', error)
    throw error
  }
}

/**
 * Función de login que usa la configuración centralizada
 * @param {object} credentials - Credenciales del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const loginAPI = async (credentials) => {
  return await post(ENDPOINTS.AUTH.LOGIN, credentials)
}

/**
 * Función de registro que usa la configuración centralizada
 * @param {object} userData - Datos del nuevo usuario
 * @returns {Promise} Respuesta del servidor
 */
export const registerAPI = async (userData) => {
  return await post(ENDPOINTS.AUTH.REGISTER, userData)
}

/**
 * Obtiene la lista de horarios
 * @returns {Promise} Lista de horarios
 */
export const getHorariosAPI = async () => {
  return await get(ENDPOINTS.HORARIOS)
}

/**
 * Obtiene la lista de personas/profesores
 * @returns {Promise} Lista de personas
 */
export const getPersonasAPI = async () => {
  return await get(ENDPOINTS.PERSONAS)
}
