/**
 * Expresiones regulares para validación de formularios
 */
export const expresionesRegulares = {
  regexTexto: /^[a-zA-Z\s]{3,30}$/,
  regexNumero: /^\d{10}$/,
  regexCorreo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
  regexContrasena: /^[a-zA-Z0-9!@#$%^&*()]{4,16}$/,
  regexNombre: /^[a-zA-Z0-9\s]{3,30}$/,
}

/**
 * Valida un campo según el tipo especificado
 * @param {string} value - Valor a validar
 * @param {string} type - Tipo de validación (texto, numero, correo, contrasena, nombre)
 * @returns {boolean} - True si es válido, false si no
 */
export const validarCampo = (value, type) => {
  switch (type) {
    case 'texto':
      return expresionesRegulares.regexTexto.test(value)
    case 'numero':
      return expresionesRegulares.regexNumero.test(value)
    case 'correo':
      return expresionesRegulares.regexCorreo.test(value)
    case 'contrasena':
      return expresionesRegulares.regexContrasena.test(value)
    case 'nombre':
      return expresionesRegulares.regexNombre.test(value)
    default:
      return false
  }
}

/**
 * Obtiene los estilos de validación para un input
 * @param {boolean} isValid - Si el campo es válido
 * @returns {object} - Objeto con estilos CSS
 */
export const getValidationStyles = (isValid) => {
  if (isValid === null) return {}
  
  return {
    outline: 'none',
    borderColor: isValid ? 'green' : 'red',
    borderWidth: '2px',
    color: isValid ? 'black' : 'red',
  }
}
