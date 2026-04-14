/**
 * Guarda datos en localStorage
 * @param {string} key - Clave para almacenar
 * @param {any} value - Valor a almacenar
 */
export const guardarLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error al guardar en localStorage:', error)
  }
}

/**
 * Consulta datos del localStorage
 * @param {string} key - Clave a consultar
 * @returns {any} - Valor almacenado o null
 */
export const consultarLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error al consultar localStorage:', error)
    return null
  }
}

/**
 * Elimina un item del localStorage
 * @param {string} key - Clave a eliminar
 */
export const eliminarLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error al eliminar del localStorage:', error)
  }
}

/**
 * Limpia todo el localStorage
 */
export const limpiarLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error al limpiar localStorage:', error)
  }
}
