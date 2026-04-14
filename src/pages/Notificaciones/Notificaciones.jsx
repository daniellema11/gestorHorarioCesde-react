import { HeaderProfesor } from '../../components'
import './Notificaciones.css'

const notificacionesData = [
  {
    id: 1,
    mensaje: 'Clase hoy: Lógica de programación.',
    detalle: 'Hora: 10:30 am - Aula: 503'
  },
  {
    id: 2,
    mensaje: 'Nueva clase asignada.',
    detalle: 'Programación web - Aula: 501'
  },
  {
    id: 3,
    mensaje: 'Modificación de horario.',
    detalle: 'Clase Metodología ahora a las 02:00 pm.'
  }
]

const Notificaciones = () => {
  return (
    <div className="notificaciones-page">
      <HeaderProfesor />
      
      <main className="notificaciones-page__main">
        <h2 className="notificaciones-page__title">Historial de Notificaciones</h2>
        
        <div className="notificaciones-list">
          {notificacionesData.map((noti) => (
            <div key={noti.id} className="notificacion-item">
              <span className="notificacion-mensaje">{noti.mensaje}</span>
              <span className="notificacion-detalle">{noti.detalle}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Notificaciones
