'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, ChevronDown, Plus, Minus } from 'lucide-react'

interface GuestSelectorProps {
  value: number
  onChange: (value: number) => void
  label?: string
  className?: string
}

export default function GuestSelector({ 
  value, 
  onChange, 
  label = "Huéspedes",
  className = ""
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [guestBreakdown, setGuestBreakdown] = useState({
    adultos: value || 1,
    ninos: 0,
    bebes: 0,
    mascotas: 0
  })

  // Sincronizar con el valor inicial solo una vez
  useEffect(() => {
    if (value > 0 && value !== totalGuests) {
      setGuestBreakdown(prev => ({
        ...prev,
        adultos: Math.max(1, value)
      }))
    }
  }, [value])

  // Calcular total de huéspedes (adultos + niños + bebés)
  const totalGuests = guestBreakdown.adultos + guestBreakdown.ninos + guestBreakdown.bebes

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const updateGuestCount = (type: keyof typeof guestBreakdown, delta: number) => {
    setGuestBreakdown(prev => {
      const newValue = prev[type] + delta
      
      // Validaciones específicas para cada tipo
      if (type === 'adultos' && newValue < 1) return prev // Mínimo 1 adulto
      if (type === 'adultos' && newValue > 16) return prev // Máximo 16 adultos
      if (type === 'ninos' && newValue < 0) return prev // Mínimo 0 niños
      if (type === 'ninos' && newValue > 10) return prev // Máximo 10 niños
      if (type === 'bebes' && newValue < 0) return prev // Mínimo 0 bebés
      if (type === 'bebes' && newValue > 5) return prev // Máximo 5 bebés
      if (type === 'mascotas' && newValue < 0) return prev // Mínimo 0 mascotas
      if (type === 'mascotas' && newValue > 3) return prev // Máximo 3 mascotas

      const newBreakdown = {
        ...prev,
        [type]: newValue
      }
      
      // Calcular nuevo total y actualizar
      const newTotal = newBreakdown.adultos + newBreakdown.ninos + newBreakdown.bebes
      onChange(newTotal)
      
      return newBreakdown
    })
  }

  const getDisplayText = () => {
    if (totalGuests === 0) return '¿Cuántos?'
    if (totalGuests === 1) return '1 huésped'
    return `${totalGuests} huéspedes`
  }

  const getDetailedText = () => {
    const parts = []
    if (guestBreakdown.adultos > 0) {
      parts.push(`${guestBreakdown.adultos} ${guestBreakdown.adultos === 1 ? 'adulto' : 'adultos'}`)
    }
    if (guestBreakdown.ninos > 0) {
      parts.push(`${guestBreakdown.ninos} ${guestBreakdown.ninos === 1 ? 'niño' : 'niños'}`)
    }
    if (guestBreakdown.bebes > 0) {
      parts.push(`${guestBreakdown.bebes} ${guestBreakdown.bebes === 1 ? 'bebé' : 'bebés'}`)
    }
    if (guestBreakdown.mascotas > 0) {
      parts.push(`${guestBreakdown.mascotas} ${guestBreakdown.mascotas === 1 ? 'mascota' : 'mascotas'}`)
    }
    return parts.length > 0 ? parts.join(', ') : ''
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-400 transition text-left flex items-center justify-between h-12"
      >
        <div className="flex items-center gap-3 flex-1">
          <Users className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{getDisplayText()}</div>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-6">
          <div className="space-y-6">
            {/* Adultos */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Adultos</div>
                <div className="text-sm text-gray-500">De 13 años o más</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount('adultos', -1)}
                  disabled={guestBreakdown.adultos <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900">
                  {guestBreakdown.adultos}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('adultos', 1)}
                  disabled={guestBreakdown.adultos >= 16}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Niños */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Niños</div>
                <div className="text-sm text-gray-500">De 2 a 12 años</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount('ninos', -1)}
                  disabled={guestBreakdown.ninos <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900">
                  {guestBreakdown.ninos}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('ninos', 1)}
                  disabled={guestBreakdown.ninos >= 10}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Bebés */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Bebés</div>
                <div className="text-sm text-gray-500">Menores de 2 años</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount('bebes', -1)}
                  disabled={guestBreakdown.bebes <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900">
                  {guestBreakdown.bebes}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('bebes', 1)}
                  disabled={guestBreakdown.bebes >= 5}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mascotas */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                <div className="font-medium text-gray-900">Mascotas</div>
                <div className="text-sm text-gray-500">¿Traes mascotas?</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount('mascotas', -1)}
                  disabled={guestBreakdown.mascotas <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900">
                  {guestBreakdown.mascotas}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('mascotas', 1)}
                  disabled={guestBreakdown.mascotas >= 3}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Botón de cerrar */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
