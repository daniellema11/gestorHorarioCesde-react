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
  
  const [formData, setFormData] = useState({
    profesor: '',
    materia: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    sede: '',
    aula: '',
    inicioPeriodo: '',
    finPeriodo: ''
  })

  const [materiaForm, setMateriaForm] = useState({ nombre: '' })
  const [aulaForm, setAulaForm] = useState({ aula: '', capacidad: '' })
  const [profesorForm, setProfesorForm] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    contrasena: ''
  })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const horario = {
      ...formData,
      recurrencia: selectedDays
    }
    
    addHorarioAdmin(horario)
    
    // Recargar lista de horarios
    setHorarios(getHorariosAdmin())
    
    Swal.fire({
      title: 'Éxito',
      text: 'Horario agregado correctamente',
      icon: 'success'
    })
    
    // Reset form
    setFormData({
      profesor: '',
      materia: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      sede: '',
      aula: '',
      inicioPeriodo: '',
      finPeriodo: ''
    })
    setSelectedDays([])
  }

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
    
    if (!profesorForm.nombre || !profesorForm.cedula || !profesorForm.correo || !profesorForm.contrasena) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
      return
    }
    
    addPersona({ ...profesorForm, rol: 'profesor' })
    setProfesorForm({ nombre: '', cedula: '', correo: '', contrasena: '' })
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
                <select name="profesor" value={formData.profesor} onChange={handleChange}>
                  <option value="" disabled>Seleccione un profesor</option>
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
                <select name="materia" value={formData.materia} onChange={handleChange}>
                  <option value="" disabled>Seleccione una materia</option>
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
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            </label>

            <label>
              Hora Inicio:
              <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} />
            </label>

            <label>
              Hora Fin:
              <input type="time" name="horaFin" value={formData.horaFin} onChange={handleChange} />
            </label>

            <label>
              Sede:
              <select name="sede" value={formData.sede} onChange={handleChange}>
                <option value="" disabled>Seleccione una sede</option>
                <option value="Medellín">Medellín</option>
                <option value="Bello">Bello</option>
                <option value="Rionegro">Rionegro</option>
              </select>
            </label>

            <label>
              Aula:
              <div className="input-with-icon">
                <select name="aula" value={formData.aula} onChange={handleChange}>
                  <option value="" disabled>Seleccione un aula</option>
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
              <input type="date" name="inicioPeriodo" value={formData.inicioPeriodo} onChange={handleChange} />
            </label>

            <label>
              Fin del Periodo:
              <input type="date" name="finPeriodo" value={formData.finPeriodo} onChange={handleChange} />
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
              value={profesorForm.nombre}
              onChange={(e) => setProfesorForm(prev => ({ ...prev, nombre: e.target.value }))}
            />
          </label>
          <label>
            Cédula:
            <input 
              type="text" 
              value={profesorForm.cedula}
              onChange={(e) => setProfesorForm(prev => ({ ...prev, cedula: e.target.value }))}
            />
          </label>
          <label>
            Correo:
            <input 
              type="email" 
              value={profesorForm.correo}
              onChange={(e) => setProfesorForm(prev => ({ ...prev, correo: e.target.value }))}
            />
          </label>
          <label>
            Contraseña:
            <input 
              type="password" 
              value={profesorForm.contrasena}
              onChange={(e) => setProfesorForm(prev => ({ ...prev, contrasena: e.target.value }))}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </Modal>
    </div>
  )
}

export default AdminDashboard
