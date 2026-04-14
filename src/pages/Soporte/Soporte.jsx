import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components'
import './Soporte.css'

const Soporte = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cedula: '',
    correo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
