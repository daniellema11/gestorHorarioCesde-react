import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../../../services'
import Swal from 'sweetalert2'
import './HeaderProfesor.css'
import logo from '../../../assets/images/logo.png'

const HeaderProfesor = ({ title = 'BIENVENIDO PROFESOR', notificationCount = 3 }) => {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  // HU10: Función para cerrar sesión limpiando localStorage
  const handleCerrarSesion = () => {
    setMenuAbierto(false)
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas salir?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E91E75',
      cancelButtonColor: '#433F3F',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        cerrarSesion()
        navigate('/')
      }
    })
  }

  return (
    <header className="header-profesor">
      <Link to="/">
        <img src={logo} alt="Logo CESDE" className="header-profesor__logo" />
      </Link>
      <h2 className="header-profesor__title">{title}</h2>
      <div className="header-profesor__right">
        <Link to="/profesor/chatbot" className="header-profesor__icon">
          <i className="bi bi-robot"></i>
        </Link>
        <Link to="/profesor/notificaciones" className="notification-icon">
          <i className="bi bi-bell"></i>
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
        </Link>
        <i className="bi bi-gear"></i>
        <div className="perfil-menu">
          <button className="perfil-button" onClick={() => setMenuAbierto(!menuAbierto)}>
            <i className="bi bi-person-circle"></i>
          </button>
          <div className={`dropdown ${menuAbierto ? 'active' : ''}`}>
            <Link to="#" onClick={() => setMenuAbierto(false)}>Ver perfil</Link>
            <Link to="#" onClick={() => setMenuAbierto(false)}>Cambiar contraseña</Link>
            <button onClick={handleCerrarSesion} className="cerrar">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderProfesor
