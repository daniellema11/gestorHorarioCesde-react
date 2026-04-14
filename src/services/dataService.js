import { guardarLocalStorage, consultarLocalStorage } from './localStorage'
import { generateId } from '../helpers'

const PERSONAS_KEY = 'personas'
const HORARIOS_ADMIN_KEY = 'horariosAdmin'
const HORARIOS_PROFESOR_KEY = 'horariosProfesor'
const MATERIAS_KEY = 'materias'
const AULAS_KEY = 'aulas'

// ============ PERSONAS ============
export const getPersonas = () => {
  return consultarLocalStorage(PERSONAS_KEY) || []
}

export const addPersona = (persona) => {
  const personas = getPersonas()
  const nuevaPersona = { ...persona, id: generateId() }
  personas.push(nuevaPersona)
  guardarLocalStorage(PERSONAS_KEY, personas)
  return nuevaPersona
}

export const updatePersona = (id, persona) => {
  const personas = getPersonas()
  const index = personas.findIndex(p => p.id === id)
  if (index !== -1) {
    personas[index] = { ...personas[index], ...persona }
    guardarLocalStorage(PERSONAS_KEY, personas)
    return personas[index]
  }
  return null
}

export const deletePersona = (id) => {
  const personas = getPersonas()
  const filtered = personas.filter(p => p.id !== id)
  guardarLocalStorage(PERSONAS_KEY, filtered)
}

// ============ HORARIOS ADMIN ============
export const getHorariosAdmin = () => {
  return consultarLocalStorage(HORARIOS_ADMIN_KEY) || []
}

export const addHorarioAdmin = (horario) => {
  const horarios = getHorariosAdmin()
  const nuevoHorario = { ...horario, id: generateId() }
  horarios.push(nuevoHorario)
  guardarLocalStorage(HORARIOS_ADMIN_KEY, horarios)
  return nuevoHorario
}

export const updateHorarioAdmin = (id, horario) => {
  const horarios = getHorariosAdmin()
  const index = horarios.findIndex(h => h.id === id)
  if (index !== -1) {
    horarios[index] = { ...horarios[index], ...horario }
    guardarLocalStorage(HORARIOS_ADMIN_KEY, horarios)
    return horarios[index]
  }
  return null
}

export const deleteHorarioAdmin = (id) => {
  const horarios = getHorariosAdmin()
  const filtered = horarios.filter(h => h.id !== id)
  guardarLocalStorage(HORARIOS_ADMIN_KEY, filtered)
}

// ============ HORARIOS PROFESOR ============
export const getHorariosProfesor = () => {
  return consultarLocalStorage(HORARIOS_PROFESOR_KEY) || []
}

export const addHorarioProfesor = (horario) => {
  const horarios = getHorariosProfesor()
  const nuevoHorario = { ...horario, id: generateId() }
  horarios.push(nuevoHorario)
  guardarLocalStorage(HORARIOS_PROFESOR_KEY, horarios)
  return nuevoHorario
}

export const updateHorarioProfesor = (id, horario) => {
  const horarios = getHorariosProfesor()
  const index = horarios.findIndex(h => h.id === id)
  if (index !== -1) {
    horarios[index] = { ...horarios[index], ...horario }
    guardarLocalStorage(HORARIOS_PROFESOR_KEY, horarios)
    return horarios[index]
  }
  return null
}

export const deleteHorarioProfesor = (id) => {
  const horarios = getHorariosProfesor()
  const filtered = horarios.filter(h => h.id !== id)
  guardarLocalStorage(HORARIOS_PROFESOR_KEY, filtered)
}

// ============ MATERIAS ============
export const getMaterias = () => {
  return consultarLocalStorage(MATERIAS_KEY) || []
}

export const addMateria = (materia) => {
  const materias = getMaterias()
  const nuevaMateria = { ...materia, id: generateId() }
  materias.push(nuevaMateria)
  guardarLocalStorage(MATERIAS_KEY, materias)
  return nuevaMateria
}

export const deleteMateria = (id) => {
  const materias = getMaterias()
  const filtered = materias.filter(m => m.id !== id)
  guardarLocalStorage(MATERIAS_KEY, filtered)
}

// ============ AULAS ============
export const getAulas = () => {
  return consultarLocalStorage(AULAS_KEY) || []
}

export const addAula = (aula) => {
  const aulas = getAulas()
  const nuevaAula = { ...aula, id: generateId() }
  aulas.push(nuevaAula)
  guardarLocalStorage(AULAS_KEY, aulas)
  return nuevaAula
}

export const deleteAula = (id) => {
  const aulas = getAulas()
  const filtered = aulas.filter(a => a.id !== id)
  guardarLocalStorage(AULAS_KEY, filtered)
}
