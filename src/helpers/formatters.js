/**
 * Formatea una fecha para mostrar
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formatea una hora para mostrar
 * @param {string} time - Hora en formato HH:mm
 * @returns {string} - Hora formateada
 */
export const formatTime = (time) => {
  if (!time) return ''
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Obtiene el nombre del mes
 * @param {number} month - Número del mes (0-11)
 * @returns {string} - Nombre del mes
 */
export const getMonthName = (month) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  return months[month]
}

/**
 * Obtiene el nombre del día de la semana
 * @param {number} day - Número del día (0-6)
 * @returns {string} - Nombre del día
 */
export const getDayName = (day) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab']
  return days[day]
}
