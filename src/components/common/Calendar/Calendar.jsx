import { useState, useEffect } from 'react'
import './Calendar.css'
import { getMonthName } from '../../../helpers'

const Calendar = ({ onDateClick, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])

  useEffect(() => {
    generateCalendar()
  }, [currentDate])

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
    const daysInMonth = lastDay.getDate()
    
    const days = []
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      })
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      })
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      })
    }
    
    setCalendarDays(days)
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="calendar">
      <div className="calendar__nav">
        <div className="calendar__nav-buttons">
          <button onClick={goToPrevMonth}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={goToNextMonth}>
            <i className="bi bi-chevron-right"></i>
          </button>
          <button onClick={goToToday}>Hoy</button>
        </div>
        <span className="calendar__month">
          {getMonthName(currentDate.getMonth())} de {currentDate.getFullYear()}
        </span>
        <div className="calendar__view-buttons">
          <button className="active">Mes</button>
          <button>Semana</button>
          <button>Día</button>
        </div>
      </div>
      
      <div className="calendar__grid">
        <div className="calendar__day-header">Lun</div>
        <div className="calendar__day-header">Mar</div>
        <div className="calendar__day-header">Mié</div>
        <div className="calendar__day-header">Jue</div>
        <div className="calendar__day-header">Vie</div>
        <div className="calendar__day-header">Sab</div>
        <div className="calendar__day-header">Dom</div>
        
        {calendarDays.map((dayObj, index) => (
          <div
            key={index}
            className={`calendar__cell ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${isToday(dayObj.date) ? 'today' : ''}`}
            onClick={() => onDateClick && onDateClick(dayObj.date)}
          >
            {dayObj.day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
