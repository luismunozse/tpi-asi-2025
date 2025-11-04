'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Calendar, Users, CreditCard, Shield, Star, ChevronDown } from 'lucide-react'

interface BookingCardProps {
  cabana: {
    id: number
    nombre: string
    precio: number
    precioBooking?: number
    imagen: string
    calificacion: number
    reseñas: number
  }
  checkIn: string
  checkOut: string
  guests: number
  onCheckInChange: (date: string) => void
  onCheckOutChange: (date: string) => void
  onGuestsChange: (guests: number) => void
  onReservar: () => void
}

export default function BookingCard({
  cabana,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onReservar
}: BookingCardProps) {
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const guestSelectorRef = useRef<HTMLDivElement>(null)
  const [guestBreakdown, setGuestBreakdown] = useState({
    adultos: guests,
    ninos: 0,
    bebes: 0,
    mascotas: 0
  })

  // Sincronizar guestBreakdown con guests
  useEffect(() => {
    setGuestBreakdown(prev => ({
      ...prev,
      adultos: guests
    }))
  }, [guests])

  // Calcular total de huéspedes
  const totalGuests = guestBreakdown.adultos + guestBreakdown.ninos + guestBreakdown.bebes

  // Actualizar guests cuando cambie el breakdown
  useEffect(() => {
    onGuestsChange(totalGuests)
  }, [guestBreakdown, onGuestsChange])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setShowGuestSelector(false)
      }
    }

    if (showGuestSelector) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showGuestSelector])

  // Calcular noches - usar useMemo para que sea reactivo
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    try {
      // Asegurar que las fechas estén en formato correcto
      const inicio = new Date(checkIn + 'T00:00:00')
      const fin = new Date(checkOut + 'T00:00:00')
      
      // Verificar que las fechas sean válidas
      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) return 0
      
      const diff = fin.getTime() - inicio.getTime()
      const noches = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return noches > 0 ? noches : 0
    } catch (error) {
      console.error('Error calculando noches:', error)
      return 0
    }
  }, [checkIn, checkOut])

  const tieneFechasValidas = checkIn && checkOut && nights > 0

  // Calcular precios - usar useMemo para que sea reactivo
  const precioPorNoche = cabana.precio
  
  const { subtotal, descuento, descuentoMonto, subtotalConDescuento, comisionServicio, impuestos, total } = useMemo(() => {
    const subtotalCalc = precioPorNoche * nights

    // Detectar temporada para aplicar descuentos
    const getSeasonDiscount = () => {
      if (!checkIn) return 0
      try {
        const fecha = new Date(checkIn + 'T00:00:00')
        const month = fecha.getMonth() + 1
        if (month >= 4 && month <= 5) return 0.15 // Otoño - 15% descuento
        if (month >= 9 && month <= 11) return 0.10 // Primavera - 10% descuento
        return 0
      } catch {
        return 0
      }
    }

    const descuentoCalc = getSeasonDiscount()
    const descuentoMontoCalc = Math.round(subtotalCalc * descuentoCalc)
    const subtotalConDescuentoCalc = subtotalCalc - descuentoMontoCalc
    
    // Calcular cargos adicionales sobre el subtotal con descuento
    const comisionServicioCalc = Math.round(subtotalConDescuentoCalc * 0.12) // 12% de comisión
    const impuestosCalc = Math.round(subtotalConDescuentoCalc * 0.21) // 21% IVA
    const totalCalc = subtotalConDescuentoCalc + comisionServicioCalc + impuestosCalc

    return {
      subtotal: subtotalCalc,
      descuento: descuentoCalc,
      descuentoMonto: descuentoMontoCalc,
      subtotalConDescuento: subtotalConDescuentoCalc,
      comisionServicio: comisionServicioCalc,
      impuestos: impuestosCalc,
      total: totalCalc
    }
  }, [precioPorNoche, nights, checkIn])

  const handleReservar = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    onReservar()
    setIsLoading(false)
  }


  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-6">
      {/* Header con precio */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">
                ${precioPorNoche.toLocaleString('es-AR')}
              </span>
              <span className="text-gray-600">por noche</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-gray-900">{cabana.calificacion}</span>
              </div>
              <span className="text-gray-500">·</span>
              <span className="text-gray-600 underline cursor-pointer hover:text-gray-900">
                {cabana.reseñas} reseñas
              </span>
            </div>
          </div>
        </div>

        {/* Selector de fechas y huéspedes */}
        <div className="border border-gray-300 rounded-xl">
          {/* Fechas */}
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-300 p-4">
              <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">
                Llegada
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none"
              />
            </div>
            <div className="p-4">
              <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">
                Salida
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          {/* Huéspedes */}
          <div className="border-t border-gray-300 p-4 relative" ref={guestSelectorRef}>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">
              Huéspedes
            </label>
            <div className="relative">
              <button
                onClick={() => setShowGuestSelector(!showGuestSelector)}
                className="w-full flex items-center justify-between text-sm font-medium text-gray-900"
              >
                <span>
                  {totalGuests === 0 
                    ? '¿Cuántos?' 
                    : `${totalGuests} ${totalGuests === 1 ? 'viajero' : 'viajeros'}`
                  }
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showGuestSelector ? 'rotate-180' : ''}`} />
              </button>
              
              {showGuestSelector && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] p-6 max-h-[400px] overflow-y-auto">
                  <div className="space-y-6">
                    {/* Adultos */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Adultos</div>
                        <div className="text-sm text-gray-500">De 13 años o más</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            adultos: Math.max(1, prev.adultos - 1)
                          }))}
                          disabled={guestBreakdown.adultos <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestBreakdown.adultos}</span>
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            adultos: Math.min(16, prev.adultos + 1)
                          }))}
                          disabled={guestBreakdown.adultos >= 16}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">+</span>
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
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            ninos: Math.max(0, prev.ninos - 1)
                          }))}
                          disabled={guestBreakdown.ninos <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestBreakdown.ninos}</span>
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            ninos: Math.min(16, prev.ninos + 1)
                          }))}
                          disabled={guestBreakdown.ninos >= 16}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Bebés */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Bebés</div>
                        <div className="text-sm text-gray-500">Menos de 2 años</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            bebes: Math.max(0, prev.bebes - 1)
                          }))}
                          disabled={guestBreakdown.bebes <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestBreakdown.bebes}</span>
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            bebes: Math.min(5, prev.bebes + 1)
                          }))}
                          disabled={guestBreakdown.bebes >= 5}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Mascotas */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Mascotas</div>
                        <div className="text-sm text-gray-500">¿Vas a llevar un animal de servicio?</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            mascotas: Math.max(0, prev.mascotas - 1)
                          }))}
                          disabled={guestBreakdown.mascotas <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestBreakdown.mascotas}</span>
                        <button
                          onClick={() => setGuestBreakdown(prev => ({
                            ...prev,
                            mascotas: Math.min(2, prev.mascotas + 1)
                          }))}
                          disabled={guestBreakdown.mascotas >= 2}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de reserva */}
      <div className="p-6">
        <button
          onClick={handleReservar}
          disabled={!checkIn || !checkOut || isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            !checkIn || !checkOut || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Procesando...</span>
            </div>
          ) : (
            'Reservar'
          )}
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
          No se cobrará ningún cargo por el momento
        </p>
      </div>

      {/* Desglose de precios */}
      {tieneFechasValidas && (
        <div className="border-t border-gray-100 p-6 space-y-3">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${precioPorNoche.toLocaleString('es-AR')} × {nights} {nights === 1 ? 'noche' : 'noches'}
              </span>
              <span className="font-medium text-gray-900">${subtotal.toLocaleString('es-AR')}</span>
            </div>

            {descuento > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">
                  Descuento temporada baja ({Math.round(descuento * 100)}%)
                </span>
                <span className="text-green-600 font-medium">
                  -${descuentoMonto.toLocaleString('es-AR')}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Comisión de servicio (12%)</span>
              <span className="font-medium text-gray-900">${comisionServicio.toLocaleString('es-AR')}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impuestos (21%)</span>
              <span className="font-medium text-gray-900">${impuestos.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  ${total.toLocaleString('es-AR')}
                </div>
                {nights > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Por {nights} {nights === 1 ? 'noche' : 'noches'}
                  </div>
                )}
              </div>
            </div>
            {descuentoMonto > 0 && (
              <p className="text-xs text-green-600 mt-2 font-medium">
                ✓ Ahorro total: ${descuentoMonto.toLocaleString('es-AR')}
              </p>
            )}
          </div>
        </div>
      )}
      
      {!tieneFechasValidas && checkIn && checkOut && (
        <div className="border-t border-gray-100 p-6">
          <p className="text-sm text-gray-600 text-center">
            Selecciona fechas válidas para ver el precio total
          </p>
        </div>
      )}

      {/* Footer con garantías */}
      <div className="border-t border-gray-100 p-6 bg-gray-50">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Protegido</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Pago seguro</span>
          </div>
        </div>
      </div>
    </div>
  )
}
