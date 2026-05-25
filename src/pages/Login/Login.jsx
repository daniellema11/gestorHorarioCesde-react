import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Header, Footer } from '../../components'
import { iniciarSesion } from '../../services'
import './Login.css'
import logo from '../../assets/images/logo.png'

const Login = () => {
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  const signIn = () => {
    if (correo === 'admin@cesde.com' && contrasena === 'Admin1234') {
      iniciarSesion({ nombre: 'Administrador', rol: 'admin', correo }, 'token-simulado')
      Swal.fire({
        title: 'Bienvenido',
        text: 'Sesión iniciada correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => navigate('/admin'))
      return
    }

    if (correo === 'profesor@cesde.com' && contrasena === 'Prof1234!') {
      iniciarSesion({ nombre: 'Profesor', rol: 'profesor', correo }, 'token-simulado')
      Swal.fire({
        title: 'Bienvenido',
        text: 'Sesión iniciada correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => navigate('/profesor'))
      return
    }

    Swal.fire({
      title: 'ERROR',
      text: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
      icon: 'error'
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn()
  }

  return (
    <div className="login-page">
      <Header />
      
      <main className="login-page__main">
        <div className="login-container">
          <div className="login-card">
            <h1>Gestor de Horarios</h1>
            <p className="login-card__subtitle">
              Ingresa a tu cuenta llenando los campos solicitados
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  name="correo"
                  placeholder="Correo Electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  name="contrasena"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
              
              <div className="login-options">
                <label>
                  <input type="checkbox" defaultChecked /> Recuérdarme
                </label>
                <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
              </div>
              
              <button type="submit" className="btn-submit">
                Iniciar Sesión
              </button>
            </form>
          </div>
          
          <div className="login-side-panel">
            <img src={logo} alt="Logo CESDE" className="login-side-panel__logo" />
            <p className="login-side-panel__text">
              Línea de Transparencia: 018000517740
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Login
