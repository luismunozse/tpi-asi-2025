'use client'

import { useState, useEffect } from 'react'
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

  // Calcular noches
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // Calcular precios
  const precioPorNoche = cabana.precio
  const subtotal = precioPorNoche * nights

  // Detectar temporada para aplicar descuentos
  const getSeasonDiscount = () => {
    if (!checkIn) return 0
    const month = new Date(checkIn).getMonth() + 1
    if (month >= 4 && month <= 5) return 0.15 // Otoño - 15% descuento
    if (month >= 9 && month <= 11) return 0.10 // Primavera - 10% descuento
    return 0
  }

  const descuento = getSeasonDiscount()
  const descuentoMonto = Math.round(subtotal * descuento)
  const subtotalConDescuento = subtotal - descuentoMonto
  
  // Calcular cargos adicionales sobre el subtotal con descuento
  const comisionServicio = Math.round(subtotalConDescuento * 0.12) // 12% de comisión
  const impuestos = Math.round(subtotalConDescuento * 0.21) // 21% IVA
  const total = subtotalConDescuento + comisionServicio + impuestos

  const handleReservar = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    onReservar()
    setIsLoading(false)
  }


  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-6 overflow-hidden">
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
        <div className="border border-gray-300 rounded-xl overflow-hidden">
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
          <div className="border-t border-gray-300 p-4">
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
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showGuestSelector && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-6">
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
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 hover:shadow-lg transform hover:-translate-y-0.5'
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
      {nights > 0 && (
        <div className="border-t border-gray-100 p-6 space-y-3">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${precioPorNoche.toLocaleString('es-AR')} × {nights} {nights === 1 ? 'noche' : 'noches'}
              </span>
              <span className="font-medium">${subtotal.toLocaleString('es-AR')}</span>
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
              <span className="font-medium">${comisionServicio.toLocaleString('es-AR')}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impuestos (21%)</span>
              <span className="font-medium">${impuestos.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ahorro total: ${descuentoMonto.toLocaleString('es-AR')}
            </p>
          </div>
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
