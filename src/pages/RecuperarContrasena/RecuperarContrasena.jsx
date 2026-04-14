import { useState } from 'react'
import { Header } from '../../components'
import Swal from 'sweetalert2'
import './RecuperarContrasena.css'

const RecuperarContrasena = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    correo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Código Enviado',
      text: 'Te hemos enviado un código de recuperación a tu correo',
      icon: 'success'
    })
  }

  return (
    <div className="recuperar-page">
      <Header />
      
      <main className="recuperar-page__main">
        <div className="recuperar-form-container">
          <h2>Recuperar Contraseña</h2>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="usuario">Usuario o Cédula</label>
            <div className="input-group">
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Usuario o Cédula"
                value={formData.usuario}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="correo">Correo o celular registrado</label>
            <div className="input-group">
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingresa tu correo o celular"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Enviar código de recuperación</button>
          </form>
          
          <p className="recuperar-note">
            Te enviaremos un código para restablecer tu contraseña
          </p>
        </div>
      </main>
    </div>
  )
}

export default RecuperarContrasena
