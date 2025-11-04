'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  label: string
  value: string
  onChange: (date: string) => void
  minDate?: string
  placeholder?: string
}

export default function DatePicker({ label, value, onChange, minDate, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const min = minDate ? new Date(minDate) : null
    
    if (min && selected < min) {
      return // No permitir fechas anteriores a minDate
    }

    setSelectedDate(selected)
    const formattedDate = selected.toISOString().split('T')[0]
    onChange(formattedDate)
    setIsOpen(false)
  }

  const isDateDisabled = (day: number) => {
    if (!minDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const min = new Date(minDate)
    return date < min
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return placeholder || 'Seleccionar fecha'
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Calendar className="inline h-4 w-4 mr-1" />
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-primary-400 transition h-12"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayDate(selectedDate)}
        </span>
        <Calendar className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80">
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h3 className="font-bold text-gray-800">
                {monthNames[currentMonth.getMonth()]}
              </h3>
              <p className="text-sm text-gray-600">{currentMonth.getFullYear()}</p>
            </div>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Nombres de los días */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />
              }

              const disabled = isDateDisabled(day)
              const selected = isDateSelected(day)
              const today = isToday(day)

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !disabled && handleDateSelect(day)}
                  disabled={disabled}
                  className={`
                    h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                    ${disabled 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'hover:bg-primary-50 cursor-pointer'
                    }
                    ${selected 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : ''
                    }
                    ${today && !selected 
                      ? 'border-2 border-primary-600 text-primary-600 font-bold' 
                      : ''
                    }
                    ${!disabled && !selected && !today 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : ''
                    }
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Footer con leyenda */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-primary-600 rounded"></div>
                <span className="text-gray-600">Hoy</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary-600 rounded"></div>
                <span className="text-gray-600">Seleccionado</span>
              </div>
            </div>
            {selectedDate && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(null)
                  onChange('')
                  setIsOpen(false)
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

