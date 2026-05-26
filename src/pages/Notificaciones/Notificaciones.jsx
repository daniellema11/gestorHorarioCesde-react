import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeaderProfesor } from '../../components'
import { getNotificacionesProfesor } from '../../services'
import './Notificaciones.css'

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    setNotificaciones(getNotificacionesProfesor())
  }, [])

  return (
    <div className="notificaciones-page">
      <HeaderProfesor notificationCount={notificaciones.length} />
      
      <main className="notificaciones-page__main">
        <div className="notificaciones-page__header">
          <h2 className="notificaciones-page__title">Historial de Notificaciones</h2>
          <Link to="/profesor" className="btn-volver">Volver a Calendario</Link>
        </div>
        
        <div className="notificaciones-list">
          {notificaciones.length > 0 ? (
            notificaciones.map((noti) => (
              <div key={noti.id} className="notificacion-item">
                <span className="notificacion-mensaje">{noti.titulo || noti.mensaje}</span>
                <span className="notificacion-detalle">{noti.mensaje || noti.detalle}</span>
              </div>
            ))
          ) : (
            <div className="notificacion-item">
              <span className="notificacion-mensaje">No hay notificaciones</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Notificaciones
