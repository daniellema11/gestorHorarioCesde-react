import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderAdmin, Calendar, Modal, DaySelector } from '../../components'
import { addHorarioAdmin, addMateria, addAula, addPersona, getPersonas, getMaterias, getAulas, getHorariosAdmin, estaAutenticado, obtenerUsuario } from '../../services'
import Swal from 'sweetalert2'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  
  const [showMateriaModal, setShowMateriaModal] = useState(false)
  const [showAulaModal, setShowAulaModal] = useState(false)
  const [showProfesorModal, setShowProfesorModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState([])
  
  // HU08: Estados para datos cargados automáticamente desde localStorage
  const [profesores, setProfesores] = useState([])
  const [materias, setMaterias] = useState([])
  const [aulas, setAulas] = useState([])
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Estados individuales para el formulario de horario
  const [profesor, setProfesor] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [sede, setSede] = useState('')
  const [aula, setAula] = useState('')
  const [inicioPeriodo, setInicioPeriodo] = useState('')
  const [finPeriodo, setFinPeriodo] = useState('')

  const [materiaForm, setMateriaForm] = useState({ nombre: '' })
  const [aulaForm, setAulaForm] = useState({ aula: '', capacidad: '' })
  const [profesorForm, setProfesorForm] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    contrasena: ''
  })
  const [profesorErrors, setProfesorErrors] = useState({
    nombre: null,
    cedula: null,
    correo: null,
    contrasena: null
  })

  const checkProfesorField = (name, value) => {
    const trimmedValue = value.trim()

    if (name === 'nombre') {
      return /^[a-zA-Z0-9\s]{3,30}$/.test(trimmedValue)
    }

    if (name === 'cedula') {
      return /^\d{6,12}$/.test(trimmedValue)
    }

    if (name === 'correo') {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(trimmedValue)
    }

    if (name === 'contrasena') {
      return /^[a-zA-Z0-9!@#$%^&*()]{4,16}$/.test(value)
    }

    return false
  }

  const getProfesorErrorMessage = (name) => {
    switch (name) {
      case 'nombre':
        return 'Nombre inválido. Usa entre 3 y 30 caracteres.'
      case 'cedula':
        return 'Cédula inválida. Solo dígitos, mínimo 6 y máximo 12.'
      case 'correo':
        return 'Correo inválido. Usa un email válido.'
      case 'contrasena':
        return 'Contraseña inválida. 4-16 caracteres válidos.'
      default:
        return ''
    }
  }

  const handleProfesorChange = (e) => {
    const { name, value } = e.target
    setProfesorForm(prev => ({ ...prev, [name]: value }))
    setProfesorErrors(prev => ({ ...prev, [name]: checkProfesorField(name, value) }))
  }

  const checkProfesorForm = () => {
    const errors = {
      nombre: checkProfesorField('nombre', profesorForm.nombre),
      cedula: checkProfesorField('cedula', profesorForm.cedula),
      correo: checkProfesorField('correo', profesorForm.correo),
      contrasena: checkProfesorField('contrasena', profesorForm.contrasena)
    }

    setProfesorErrors(errors)
    return Object.values(errors).every(Boolean)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!profesor || !materia || !fecha || !horaInicio || !horaFin || !sede || !aula || !inicioPeriodo || !finPeriodo) {
      Swal.fire('Error', 'Por favor completa todos los campos.', 'error')
      return
    }

    if (horaFin <= horaInicio) {
      Swal.fire('Error', 'La hora fin debe ser mayor que la hora inicio.', 'error')
      return
    }

    if (finPeriodo <= inicioPeriodo) {
      Swal.fire('Error', 'La fecha fin debe ser mayor que la fecha inicio.', 'error')
      return
    }

    const horarioDuplicado = horarios.some((h) =>
      h.profesor === profesor &&
      h.fecha === fecha &&
      h.horaInicio === horaInicio &&
      h.horaFin === horaFin &&
      h.aula === aula
    )

    if (horarioDuplicado) {
      Swal.fire('Error', 'Ya existe un horario igual para este profesor.', 'error')
      return
    }
    
    const horario = {
      profesor,
      materia,
      fecha,
      horaInicio,
      horaFin,
      sede,
      aula,
      inicioPeriodo,
      finPeriodo,
      recurrencia: selectedDays
    }
    
    addHorarioAdmin(horario)
    setHorarios(getHorariosAdmin())
    
    Swal.fire('Éxito', 'Horario agregado correctamente', 'success')
    
    // Reset form
    setProfesor('')
    setMateria('')
    setFecha('')
    setHoraInicio('')
    setHoraFin('')
    setSede('')
    setAula('')
    setInicioPeriodo('')
    setFinPeriodo('')
    setSelectedDays([])
  }

  // HU08: Carga automática de datos iniciales con useEffect
  // HU10: Verificar sesión activa al cargar la vista
  useEffect(() => {
    // Verificar autenticación
    if (!estaAutenticado()) {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para acceder',
        icon: 'warning'
      }).then(() => {
        navigate('/login')
      })
      return
    }

    // Verificar que sea administrador
    const usuario = obtenerUsuario()
    if (usuario?.rol !== 'admin') {
      Swal.fire({
        title: 'Sin Permisos',
        text: 'No tienes permisos de administrador',
        icon: 'error'
      }).then(() => {
        navigate('/login')
      })
      return
    }

    // Cargar datos iniciales automáticamente (sin presionar botón)
    const cargarDatos = () => {
      const profesoresData = getPersonas()
      const materiasData = getMaterias()
      const aulasData = getAulas()
      const horariosData = getHorariosAdmin()
      
      setProfesores(profesoresData)
      setMaterias(materiasData)
      setAulas(aulasData)
      setHorarios(horariosData)
      setLoading(false)
    }

    cargarDatos()
  }, [navigate]) // Dependencia controlada para evitar ciclos infinitos

  const handleMateriaSubmit = (e) => {
    e.preventDefault()
    addMateria(materiaForm)
    setMateriaForm({ nombre: '' })
    setShowMateriaModal(false)
    // Recargar lista de materias
    setMaterias(getMaterias())
    Swal.fire('Éxito', 'Materia creada correctamente', 'success')
  }

  const handleAulaSubmit = (e) => {
    e.preventDefault()
    addAula(aulaForm)
    setAulaForm({ aula: '', capacidad: '' })
    setShowAulaModal(false)
    // Recargar lista de aulas
    setAulas(getAulas())
    Swal.fire('Éxito', 'Aula creada correctamente', 'success')
  }

  const handleProfesorSubmit = (e) => {
    e.preventDefault()

    if (!checkProfesorForm()) {
      Swal.fire('Error', 'Por favor corrige los campos inválidos.', 'error')
      return
    }

    const existeCedula = profesores.some((prof) => prof.cedula === profesorForm.cedula)
    const existeCorreo = profesores.some((prof) => prof.correo.toLowerCase() === profesorForm.correo.toLowerCase())

    if (existeCedula || existeCorreo) {
      Swal.fire('Error', 'Ya existe un profesor con esa cédula o correo.', 'error')
      return
    }

    addPersona({ ...profesorForm, rol: 'profesor' })
    setProfesorForm({ nombre: '', cedula: '', correo: '', contrasena: '' })
    setProfesorErrors({ nombre: null, cedula: null, correo: null, contrasena: null })
    setShowProfesorModal(false)

    // Recargar lista de profesores
    setProfesores(getPersonas())

    Swal.fire('Éxito', 'Profesor creado correctamente', 'success')
  }

  return (
    <div className="admin-dashboard">
      <HeaderAdmin />
      
      <main className="admin-dashboard__main">
        {/* Formulario de horario */}
        <section className="admin-dashboard__form">
          <button className="btn-titulo">Agregar Horario Profesor</button>
          
          <form onSubmit={handleSubmit}>
            <label>
              Profesor:
              <div className="input-with-icon">
                <select value={profesor} onChange={(e) => setProfesor(e.target.value)}>
                  <option value="">Seleccione un profesor</option>
                  {profesores.map((prof) => (
                    <option key={prof.id} value={prof.nombre}>{prof.nombre}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setShowProfesorModal(true)}>
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </label>

            <label>
              Materia:
              <div className="input-with-icon">
                <select value={materia} onChange={(e) => setMateria(e.target.value)}>
                  <option value="">Seleccione una materia</option>
                  {materias.map((mat) => (
                    <option key={mat.id} value={mat.nombre}>{mat.nombre}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setShowMateriaModal(true)}>
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </label>

            <label>
              Fecha:
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </label>

            <label>
              Hora Inicio:
              <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            </label>

            <label>
              Hora Fin:
              <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
            </label>

            <label>
              Sede:
              <select value={sede} onChange={(e) => setSede(e.target.value)}>
                <option value="">Seleccione una sede</option>
                <option value="Medellín">Medellín</option>
                <option value="Bello">Bello</option>
                <option value="Rionegro">Rionegro</option>
              </select>
            </label>

            <label>
              Aula:
              <div className="input-with-icon">
                <select value={aula} onChange={(e) => setAula(e.target.value)}>
                  <option value="">Seleccione un aula</option>
                  {aulas.map((a) => (
                    <option key={a.id} value={a.aula}>
                      {a.aula} {a.capacidad ? `(Cap: ${a.capacidad})` : ''}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => setShowAulaModal(true)}>
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </label>

            <label>
              Inicio del Periodo:
              <input type="date" value={inicioPeriodo} onChange={(e) => setInicioPeriodo(e.target.value)} />
            </label>

            <label>
              Fin del Periodo:
              <input type="date" value={finPeriodo} onChange={(e) => setFinPeriodo(e.target.value)} />
            </label>

            <label>Recurrencia:</label>
            <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />

            <button type="submit" className="btn-agregar">AGREGAR HORARIO</button>
          </form>
        </section>

        {/* Calendario */}
        <section className="admin-dashboard__calendar">
          <Calendar />
        </section>

        {/* Lista de profesores */}
        <section className="admin-dashboard__professors">
          <div className="prof-header">
            <span>Profesores ({profesores.length})</span>
            <button onClick={() => setShowProfesorModal(true)}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
          <div className="prof-list">
            {loading ? (
              <p>Cargando...</p>
            ) : profesores.length > 0 ? (
              profesores.map((profesor) => (
                <div className="prof-item" key={profesor.id}>
                  <div className="prof-info">
                    <span className="prof-name">{profesor.nombre}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay profesores registrados</p>
            )}
          </div>
        </section>
      </main>

      {/* Modal Materia */}
      <Modal 
        isOpen={showMateriaModal} 
        onClose={() => setShowMateriaModal(false)}
        title="Crear Materia"
      >
        <form onSubmit={handleMateriaSubmit}>
          <label>
            Nombre:
            <input 
              type="text" 
              value={materiaForm.nombre}
              onChange={(e) => setMateriaForm({ nombre: e.target.value })}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </Modal>

      {/* Modal Aula */}
      <Modal 
        isOpen={showAulaModal} 
        onClose={() => setShowAulaModal(false)}
        title="Crear Aula"
      >
        <form onSubmit={handleAulaSubmit}>
          <label>
            # Aula:
            <input 
              type="text" 
              value={aulaForm.aula}
              onChange={(e) => setAulaForm(prev => ({ ...prev, aula: e.target.value }))}
            />
          </label>
          <label>
            Capacidad:
            <input 
              type="number" 
              value={aulaForm.capacidad}
              onChange={(e) => setAulaForm(prev => ({ ...prev, capacidad: e.target.value }))}
              placeholder="Número de estudiantes"
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </Modal>

      {/* Modal Profesor */}
      <Modal 
        isOpen={showProfesorModal} 
        onClose={() => setShowProfesorModal(false)}
        title="Crear Profesor"
      >
        <form onSubmit={handleProfesorSubmit}>
          <label>
            Nombre:
            <input 
              type="text" 
              name="nombre"
              value={profesorForm.nombre}
              onChange={handleProfesorChange}
              required
            />
            {profesorErrors.nombre === false && (
              <span className="input-error">{getProfesorErrorMessage('nombre')}</span>
            )}
          </label>
          <label>
            Cédula:
            <input 
              type="text" 
              name="cedula"
              value={profesorForm.cedula}
              onChange={handleProfesorChange}
              required
              inputMode="numeric"
            />
            {profesorErrors.cedula === false && (
              <span className="input-error">{getProfesorErrorMessage('cedula')}</span>
            )}
          </label>
          <label>
            Correo:
            <input 
              type="email" 
              name="correo"
              value={profesorForm.correo}
              onChange={handleProfesorChange}
              required
            />
            {profesorErrors.correo === false && (
              <span className="input-error">{getProfesorErrorMessage('correo')}</span>
            )}
          </label>
          <label>
            Contraseña:
            <input 
              type="password" 
              name="contrasena"
              value={profesorForm.contrasena}
              onChange={handleProfesorChange}
              required
            />
            {profesorErrors.contrasena === false && (
              <span className="input-error">{getProfesorErrorMessage('contrasena')}</span>
            )}
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </Modal>
    </div>
  )
}

export default AdminDashboard
