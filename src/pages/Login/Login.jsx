import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Header, Footer } from '../../components'
import { validarCampo, getValidationStyles } from '../../helpers'
import { iniciarSesion } from '../../services'
import './Login.css'
import logo from '../../assets/images/logo.png'

const Login = () => {
  const navigate = useNavigate()
  
  // HU06: Captura de datos con useState
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  })
  const [validation, setValidation] = useState({
    correo: null,
    contrasena: null
  })

  // HU06: Manejo de cambios en inputs controlados
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    const isValid = validarCampo(value, 'texto')
    setValidation(prev => ({ ...prev, [name]: isValid }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.correo === 'admin' && formData.contrasena === '1234') {
      // HU10: Persistencia de sesión - guardar token y datos del usuario
      iniciarSesion(
        { nombre: 'Administrador', rol: 'admin', correo: formData.correo },
        'token-admin-simulado'
      )
      
      // HU09: Retroalimentación visual con SweetAlert2
      Swal.fire({
        title: 'Bienvenido',
        text: 'Sesión iniciada correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // HU05: Navegación con useNavigate
        navigate('/admin')
      })
      return
    }
    
    if (formData.correo === 'profesor' && formData.contrasena === '1234') {
      // HU10: Persistencia de sesión
      iniciarSesion(
        { nombre: 'Profesor', rol: 'profesor', correo: formData.correo },
        'token-profesor-simulado'
      )
      
      Swal.fire({
        title: 'Bienvenido',
        text: 'Sesión iniciada correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/profesor')
      })
      return
    }
    
    // HU09: Retroalimentación visual de error con SweetAlert2
    Swal.fire({
      title: 'ERROR',
      text: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
      icon: 'error'
    })
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
                  value={formData.correo}
                  onChange={handleChange}
                  style={getValidationStyles(validation.correo)}
                />
              </div>
              
              <div className="input-group">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  name="contrasena"
                  placeholder="Contraseña"
                  value={formData.contrasena}
                  onChange={handleChange}
                  style={getValidationStyles(validation.contrasena)}
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
