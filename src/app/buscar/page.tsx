'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, Bed, Bath, ChevronLeft, Calendar } from 'lucide-react'
import BookingCard from '@/components/BookingCard'
import UserAvatar from '@/components/UserAvatar'

interface Cabana {
  id: number
  nombre: string
  capacidad: number
  habitaciones: number
  banos: number
  descripcion: string
  precio: number
  precioBooking: number
  imagen: string
  disponible: boolean
  servicios: string[]
}

function SearchContent() {
  const searchParams = useSearchParams()
  const [cabanas, setCabanas] = useState<Cabana[]>([])
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '')
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2)
  const [tipoAlojamiento, setTipoAlojamiento] = useState(searchParams.get('tipo') || '')
  const [cabanaSeleccionada, setCabanaSeleccionada] = useState<Cabana | null>(null)

  // Función para obtener el tipo de cabaña basado en el nombre
  const getTipoCabana = (nombre: string): string => {
    const nombreLower = nombre.toLowerCase()
    if (nombreLower.includes('familiar')) return 'familiar'
    if (nombreLower.includes('romántica') || nombreLower.includes('romantica')) return 'romantica'
    if (nombreLower.includes('grande')) return 'grande'
    if (nombreLower.includes('standard')) return 'standard'
    return ''
  }

  useEffect(() => {
    // Simular carga de cabañas disponibles
    setTimeout(() => {
      const cabanasData: Cabana[] = [
        {
          id: 1,
          nombre: 'Cabaña Familiar',
          capacidad: 6,
          habitaciones: 3,
          banos: 2,
          descripcion: 'Cabaña espaciosa ideal para familias, con vista al lago y todas las comodidades.',
          precio: 25000,
          precioBooking: 27000,
          imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento']
        },
        {
          id: 2,
          nombre: 'Cabaña Romántica',
          capacidad: 2,
          habitaciones: 1,
          banos: 1,
          descripcion: 'Cabaña íntima perfecta para parejas, con jacuzzi y chimenea.',
          precio: 18000,
          precioBooking: 19500,
          imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea', 'Calefacción']
        },
        {
          id: 3,
          nombre: 'Cabaña Grande',
          capacidad: 8,
          habitaciones: 4,
          banos: 3,
          descripcion: 'La cabaña más grande del complejo, ideal para grupos grandes o reuniones familiares.',
          precio: 35000,
          precioBooking: 38000,
          imagen: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla', 'Calefacción', 'Estacionamiento']
        },
        {
          id: 4,
          nombre: 'Cabaña Standard',
          capacidad: 4,
          habitaciones: 2,
          banos: 1,
          descripcion: 'Cabaña cómoda con excelente relación precio-calidad.',
          precio: 20000,
          precioBooking: 21500,
          imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción']
        }
      ]
      
      // Filtrar por capacidad y tipo de alojamiento
      let filtered = cabanasData.filter(c => c.capacidad >= guests)
      
      // Filtrar por tipo de alojamiento si está especificado
      if (tipoAlojamiento) {
        filtered = filtered.filter(c => getTipoCabana(c.nombre) === tipoAlojamiento)
      }
      
      setCabanas(filtered)
      setLoading(false)
    }, 800)
  }, [guests, tipoAlojamiento])

  const handleReserva = (cabanaId: number) => {
    window.location.href = `/reservar?cabana=${cabanaId}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
  }

  const handleSearch = () => {
    // Recargar resultados con nuevos criterios
    setLoading(true)
    setTimeout(() => {
      const cabanasData: Cabana[] = [
        {
          id: 1,
          nombre: 'Cabaña Familiar',
          capacidad: 6,
          habitaciones: 3,
          banos: 2,
          descripcion: 'Cabaña espaciosa ideal para familias, con vista al lago y todas las comodidades.',
          precio: 25000,
          precioBooking: 27000,
          imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento']
        },
        {
          id: 2,
          nombre: 'Cabaña Romántica',
          capacidad: 2,
          habitaciones: 1,
          banos: 1,
          descripcion: 'Cabaña íntima perfecta para parejas, con jacuzzi y chimenea.',
          precio: 18000,
          precioBooking: 19500,
          imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea', 'Calefacción']
        },
        {
          id: 3,
          nombre: 'Cabaña Grande',
          capacidad: 8,
          habitaciones: 4,
          banos: 3,
          descripcion: 'La cabaña más grande del complejo, ideal para grupos grandes o reuniones familiares.',
          precio: 35000,
          precioBooking: 38000,
          imagen: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla', 'Calefacción', 'Estacionamiento']
        },
        {
          id: 4,
          nombre: 'Cabaña Standard',
          capacidad: 4,
          habitaciones: 2,
          banos: 1,
          descripcion: 'Cabaña cómoda con excelente relación precio-calidad.',
          precio: 20000,
          precioBooking: 21500,
          imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción']
        }
      ]
      
      const filtered = cabanasData.filter(c => c.capacidad >= guests)
      setCabanas(filtered)
      setLoading(false)
      
      // Scroll suave al inicio de resultados
      document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Buscando cabañas disponibles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Estancia del Carmen</h1>
                <p className="text-sm text-gray-600">San Carlos de Bariloche</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <UserAvatar />
              <Link href="/" className="text-gray-700 hover:text-primary-600 flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Summary */}
      <div className="bg-primary-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Cabañas Disponibles</h2>
              <p className="text-primary-100">
                {checkIn && checkOut ? (
                  <>
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {new Date(checkIn).toLocaleDateString('es-AR')} - {new Date(checkOut).toLocaleDateString('es-AR')}
                  </>
                ) : 'Selecciona tus fechas'}
              </p>
            </div>
            <div className="bg-white text-gray-800 px-6 py-3 rounded-lg">
              <Users className="inline h-5 w-5 mr-2 text-primary-600" />
              <span className="font-semibold">{guests} {guests === 1 ? 'Pasajero' : 'Pasajeros'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con Booking Card */}
          <div className="lg:col-span-1">
            {/* Booking Card solo cuando hay una cabaña seleccionada */}
            {cabanaSeleccionada && (
              <BookingCard
                cabana={{
                  id: cabanaSeleccionada.id,
                  nombre: cabanaSeleccionada.nombre,
                  precio: cabanaSeleccionada.precio,
                  precioBooking: cabanaSeleccionada.precioBooking,
                  imagen: cabanaSeleccionada.imagen,
                  calificacion: 4.8,
                  reseñas: 127
                }}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
                onGuestsChange={setGuests}
                onReservar={() => {
                  // Redirigir a la página de reserva con los datos
                  const params = new URLSearchParams({
                    cabana: cabanaSeleccionada.id.toString(),
                    checkin: checkIn,
                    checkout: checkOut,
                    guests: guests.toString()
                  })
                  window.location.href = `/reservar?${params.toString()}`
                }}
              />
            )}
            {!cabanaSeleccionada && cabanas.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Selecciona una cabaña para ver el precio y reservar
                </p>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3" id="resultados">
            {cabanas.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-6xl mb-4">🏘️</div>
                <p className="text-xl text-gray-800 font-semibold mb-2">
                  No hay cabañas disponibles para {guests} pasajeros
                </p>
                <p className="text-gray-600 mb-4">
                  Intenta modificar tu búsqueda o seleccionar menos pasajeros
                </p>
                <Link href="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
                  Volver al inicio
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-800 font-semibold text-lg">
                    <span className="text-primary-600 text-2xl">{cabanas.length}</span> {cabanas.length === 1 ? 'cabaña encontrada' : 'cabañas encontradas'}
                  </p>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                    <option>Precio: Menor a mayor</option>
                    <option>Precio: Mayor a menor</option>
                    <option>Capacidad: Mayor a menor</option>
                    <option>Más populares</option>
                  </select>
                </div>
                <div className="space-y-6">
              {cabanas.map(cabana => (
                <div
                  key={cabana.id}
                  onClick={() => setCabanaSeleccionada(cabana)}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block group ${
                    cabanaSeleccionada?.id === cabana.id ? 'ring-2 ring-primary-500 shadow-xl' : ''
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <div 
                        className="h-64 md:h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${cabana.imagen})` }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition" />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-sm font-semibold text-primary-600">Disponible</span>
                      </div>
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition">{cabana.nombre}</h3>
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Hasta {cabana.capacidad} personas
                        </span>
                        <span className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {cabana.habitaciones} habitaciones
                        </span>
                        <span className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {cabana.banos} baños
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm">{cabana.descripcion}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cabana.servicios.map(servicio => (
                          <span key={servicio} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                            {servicio}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Precio por noche</p>
                          <p className="text-3xl font-bold text-primary-600">
                            ${cabana.precio.toLocaleString('es-AR')}
                          </p>
                          <p className="text-xs text-gray-500">Desayuno incluido</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Calificación</p>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-bold text-gray-800">4.8</span>
                            <span className="text-sm text-gray-500">(127)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botón para ver detalles */}
                  <div className="p-6 border-t border-gray-100">
                    <Link
                      href={`/cabanas/${cabana.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block text-center text-primary-600 hover:text-primary-700 font-semibold text-sm transition"
                    >
                      Ver detalles completos →
                    </Link>
                  </div>
                </div>
              ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

