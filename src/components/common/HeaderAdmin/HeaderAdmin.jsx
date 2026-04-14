import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../../../services'
import Swal from 'sweetalert2'
import './HeaderAdmin.css'
import logo from '../../../assets/images/logo.png'

const HeaderAdmin = ({ title = 'BIENVENIDO ADMINISTRADOR' }) => {
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
        // HU05: Navegación con useNavigate
        navigate('/')
      }
    })
  }

  return (
    <header className="header-admin">
      <div className="header-admin__logo">
        <Link to="/">
          <img src={logo} alt="Logo CESDE" />
        </Link>
      </div>
      <div className="header-admin__title">{title}</div>
      <div className="header-admin__icons">
        <i className="bi bi-gear-fill"></i>
        <div className="perfil-menu-container">
          <button className="perfil-button" onClick={() => setMenuAbierto(!menuAbierto)}>
            <i className="bi bi-person-circle"></i>
          </button>
          <div className={`perfil-dropdown ${menuAbierto ? 'active' : ''}`}>
            <Link to="#" onClick={() => setMenuAbierto(false)}>Ver perfil</Link>
            <Link to="#" onClick={() => setMenuAbierto(false)}>Cambiar contraseña</Link>
            <button onClick={handleCerrarSesion} className="cerrar">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin
