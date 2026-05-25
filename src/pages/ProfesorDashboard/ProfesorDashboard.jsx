import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderProfesor, Calendar, Modal, DaySelector } from '../../components'
import { addHorarioProfesor, addNotificacionProfesor, getHorariosProfesor, estaAutenticado, obtenerUsuario } from '../../services'
import Swal from 'sweetalert2'
import './ProfesorDashboard.css'

const ProfesorDashboard = () => {
  const navigate = useNavigate()
  
  const [showModal, setShowModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState([])
  
  // HU08: Estados para datos cargados automáticamente
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  
  // HU06: Estado controlado para formulario
  const [formData, setFormData] = useState({
    materia: '',
    fechaInicio: '',
    horaInicio: '',
    horaFin: '',
    instituto: '',
    fechaFin: ''
  })

  // HU08: Carga automática de datos al montar el componente
  // HU10: Verificar sesión activa
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

    // Verificar que sea profesor
    const usuario = obtenerUsuario()
    if (usuario?.rol !== 'profesor') {
      Swal.fire({
        title: 'Sin Permisos',
        text: 'No tienes permisos de profesor',
        icon: 'error'
      }).then(() => {
        navigate('/login')
      })
      return
    }

    // Cargar horarios automáticamente (sin presionar botón)
    const cargarDatos = () => {
      const horariosData = getHorariosProfesor()
      setHorarios(horariosData)
      setLoading(false)
    }

    cargarDatos()
  }, [navigate]) // Dependencia controlada

  // HU06: Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateHorario = () => {
    const { materia, fechaInicio, horaInicio, horaFin, instituto, fechaFin } = formData

    if (!materia || !fechaInicio || !horaInicio || !horaFin || !instituto || !fechaFin || selectedDays.length === 0) {
      Swal.fire('Error', 'Por favor completa todos los campos del horario.', 'error')
      return false
    }

    if (fechaFin < fechaInicio) {
      Swal.fire('Error', 'La fecha fin debe ser igual o posterior a la fecha inicio.', 'error')
      return false
    }

    if (horaFin <= horaInicio) {
      Swal.fire('Error', 'La hora fin debe ser posterior a la hora inicio.', 'error')
      return false
    }

    const horarioDuplicado = horarios.some((h) =>
      h.materia === materia &&
      h.fechaInicio === fechaInicio &&
      h.horaInicio === horaInicio &&
      h.horaFin === horaFin &&
      h.instituto === instituto
    )

    if (horarioDuplicado) {
      Swal.fire('Error', 'Ya existe un horario igual registrado.', 'error')
      return false
    }

    return true
  }

  const handleDateClick = (date) => {
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateHorario()) {
      return
    }

    const usuario = obtenerUsuario()
    const horario = {
      ...formData,
      profesor: usuario?.nombre || 'Profesor',
      recurrencia: selectedDays
    }

    addHorarioProfesor(horario)
    addNotificacionProfesor({
      titulo: `Nuevo horario asignado: ${formData.materia}`,
      mensaje: `${formData.instituto} - ${formData.fechaInicio} de ${formData.horaInicio} a ${formData.horaFin}`
    })

    // Recargar lista de horarios
    setHorarios(getHorariosProfesor())

    Swal.fire({
      title: 'Éxito',
      text: 'Horario guardado correctamente',
      icon: 'success'
    })

    resetForm()
    setShowModal(false)
  }

  const handleModificar = () => {
    Swal.fire('Info', 'Función de modificar', 'info')
  }

  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E91E75',
      cancelButtonColor: '#433F3F',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado', 'El horario ha sido eliminado', 'success')
        setShowModal(false)
      }
    })
  }

  const resetForm = () => {
    setFormData({
      materia: '',
      fechaInicio: '',
      horaInicio: '',
      horaFin: '',
      instituto: '',
      fechaFin: ''
    })
    setSelectedDays([])
  }

  const eventosProximos = [...horarios].sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))

  return (
    <div className="profesor-dashboard">
      <HeaderProfesor />
      
      <main className="profesor-dashboard__main">
        {/* Calendario */}
        <section className="profesor-dashboard__calendar">
          <Calendar onDateClick={handleDateClick} events={horarios} />
        </section>

        {/* Barra lateral de eventos */}
        <aside className="profesor-dashboard__sidebar">
          <h3>Próximos Eventos</h3>
          {eventosProximos.length ? (
            eventosProximos.map((evento) => (
              <div className="event-card" key={evento.id}>
                <strong>{evento.materia || 'Sin materia'}</strong>
                <small>{evento.instituto} - {evento.horaInicio} a {evento.horaFin}</small>
                <span className="event-date">{new Date(evento.fechaInicio).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}</span>
              </div>
            ))
          ) : (
            <div className="event-card">
              <strong>No hay horarios programados</strong>
              <small>Agrega un horario para que aparezca aquí.</small>
            </div>
          )}
        </aside>
      </main>

      {/* Modal de horario */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Agregar o Modificar Horarios"
      >
        <form onSubmit={handleSubmit} className="profesor-form">
          <label>
            Materia:
            <input 
              type="text" 
              name="materia" 
              value={formData.materia} 
              onChange={handleChange}
            />
          </label>
          
          <label>
            Fecha Inicio:
            <input 
              type="date" 
              name="fechaInicio" 
              value={formData.fechaInicio} 
              onChange={handleChange}
            />
          </label>
          
          <label>
            Hora Inicio:
            <input 
              type="time" 
              name="horaInicio" 
              value={formData.horaInicio} 
              onChange={handleChange}
            />
          </label>
          
          <label>
            Hora Fin:
            <input 
              type="time" 
              name="horaFin" 
              value={formData.horaFin} 
              onChange={handleChange}
            />
          </label>
          
          <label>
            Instituto:
            <input 
              type="text" 
              name="instituto" 
              value={formData.instituto} 
              onChange={handleChange}
            />
          </label>
          
          <label>Recurrencia:</label>
          <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />
          
          <label>
            Fecha Fin:
            <input 
              type="date" 
              name="fechaFin" 
              value={formData.fechaFin} 
              onChange={handleChange}
            />
          </label>
          
          <button type="submit" className="btn-guardar">Guardar</button>
          <button type="button" className="btn-modificar" onClick={handleModificar}>Modificar</button>
          <button type="button" className="btn-eliminar" onClick={handleEliminar}>Eliminar</button>
        </form>
      </Modal>
    </div>
  )
}

export default ProfesorDashboard

