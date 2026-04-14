import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeaderProfesor } from '../../components'
import './Chatbot.css'

const preguntasFrecuentes = [
  {
    id: 1,
    pregunta: '¿Cómo consulto mi horario?',
    respuesta: 'Para consultar tu horario, ve al panel principal y haz clic en el calendario. Allí podrás ver todos tus horarios programados.'
  },
  {
    id: 2,
    pregunta: '¿Cómo agrego una clase?',
    respuesta: 'Para agregar una clase, haz clic en cualquier día del calendario y se abrirá un formulario donde podrás ingresar los detalles de la clase.'
  },
  {
    id: 3,
    pregunta: '¿Cómo modifico un horario?',
    respuesta: 'Para modificar un horario, haz clic en el evento existente en el calendario y presiona el botón "Modificar" en el formulario que aparece.'
  }
]

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showAnswer, setShowAnswer] = useState(null)

  const handleQuestionClick = (pregunta) => {
    setShowAnswer(pregunta.id)
    setMessages(prev => [
      ...prev,
      { type: 'user', text: pregunta.pregunta },
      { type: 'bot', text: pregunta.respuesta }
    ])
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: inputValue },
        { type: 'bot', text: 'Gracias por tu mensaje. Un agente te responderá pronto.' }
      ])
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="chatbot-page">
      <HeaderProfesor />
      
      <main className="chatbot-page__main">
        <div className="chatbox">
          <div className="chatbox__header">
            Chatbot Gestor Horario
          </div>
          
          <div className="chatbox__body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="chatbox__options">
            {preguntasFrecuentes.map((pregunta) => (
              <button
                key={pregunta.id}
                onClick={() => handleQuestionClick(pregunta)}
                className={showAnswer === pregunta.id ? 'active' : ''}
              >
                {pregunta.pregunta}
              </button>
            ))}
          </div>
          
          <div className="chatbox__input">
            <input
              type="text"
              placeholder="Escribe tu mensaje.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Chatbot
