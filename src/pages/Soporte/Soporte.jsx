import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components'
import { validarCampo } from '../../helpers'
import Swal from 'sweetalert2'
import './Soporte.css'

const Soporte = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cedula: '',
    correo: ''
  })

  const [errors, setErrors] = useState({
    cedula: null,
    correo: null
  })

  const validateField = (name, value) => {
    const trimmedValue = value.trim()

    if (name === 'cedula') {
      return /^\d{10}$/.test(trimmedValue)
    }

    if (name === 'correo') {
      return validarCampo(trimmedValue, 'correo')
    }

    return false
  }

  const getErrorMessage = (name) => {
    switch (name) {
      case 'cedula':
        return 'Cédula inválida. Debe contener exactamente 10 dígitos.'
      case 'correo':
        return 'Correo inválido. Usa un formato de email válido.'
      default:
        return 'Campo inválido'
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (value.trim() !== '') {
      const isValid = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: isValid ? null : getErrorMessage(name) }))
    } else {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar que todos los campos sean válidos
    const cedulaValid = validateField('cedula', formData.cedula)
    const correoValid = validateField('correo', formData.correo)

    if (!cedulaValid || !correoValid) {
      setErrors({
        cedula: !cedulaValid ? getErrorMessage('cedula') : null,
        correo: !correoValid ? getErrorMessage('correo') : null
      })
      Swal.fire({
        title: 'Campos inválidos',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error'
      })
      return
    }

    navigate('/chatbot')
  }

  return (
    <div className="soporte-page">
      <Header />
      
      <main className="soporte-page__main">
        <div className="soporte-form-container">
          <h2>Accede al Soporte</h2>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="cedula">Cédula</label>
            <div className="input-group">
              <input
                type="text"
                id="cedula"
                name="cedula"
                placeholder="Ingresa tu cédula"
                value={formData.cedula}
                onChange={handleChange}
                style={{
                  borderColor: errors.cedula ? 'red' : formData.cedula && !errors.cedula ? 'green' : '#ccc',
                  borderWidth: errors.cedula || (formData.cedula && !errors.cedula) ? '2px' : '1px'
                }}
              />
            </div>

            <label htmlFor="correo">Correo electrónico</label>
            <div className="input-group">
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingresa tu correo"
                value={formData.correo}
                onChange={handleChange}
                style={{
                  borderColor: errors.correo ? 'red' : formData.correo && !errors.correo ? 'green' : '#ccc',
                  borderWidth: errors.correo || (formData.correo && !errors.correo) ? '2px' : '1px'
                }}
              />
            </div>

            <button type="submit">Ingresar al Chatbot</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Soporte
