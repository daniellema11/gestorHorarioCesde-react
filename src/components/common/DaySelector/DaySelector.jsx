import { useState } from 'react'
import './DaySelector.css'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado']

const DaySelector = ({ selectedDays = [], onChange }) => {
  const toggleDay = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day]
    
    onChange && onChange(newSelectedDays)
  }

  return (
    <div className="day-selector">
      {DAYS.map((day) => (
        <button
          key={day}
          type="button"
          className={`day-selector__btn ${selectedDays.includes(day) ? 'selected' : ''}`}
          onClick={() => toggleDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  )
}

export default DaySelector
