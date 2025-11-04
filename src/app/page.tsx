'use client'

import Link from 'next/link'
import { Calendar, Home, MapPin, Phone, Mail, Star } from 'lucide-react'
import { useState } from 'react'
import DatePicker from '@/components/DatePicker'
import GuestSelector from '@/components/GuestSelector'

export default function HomePage() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirigir a página de búsqueda con parámetros
    window.location.href = `/buscar?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Estancia del Carmen</h1>
                <p className="text-sm text-gray-600">San Carlos de Bariloche</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
                Inicio
              </Link>
              <Link href="/cabanas" className="text-gray-700 hover:text-primary-600 transition">
                Cabañas
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-primary-600 transition">
                Contacto
              </Link>
              <Link href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                Acceso Personal
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section con fondo de estancia */}
      <section className="relative h-[600px] overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Fondo de imagen panorámica de Bariloche */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&h=1440&q=80&fm=jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Overlay suave para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
        
        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            Bienvenido a Estancia del Carmen
          </h2>
          <p className="text-2xl mb-8 max-w-3xl text-white/95 drop-shadow-lg leading-relaxed">
            Disfruta de la belleza natural de Bariloche en nuestras cómodas cabañas con desayuno incluido
          </p>
          <div className="flex items-center space-x-2 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-7 w-7 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              ))}
            </div>
            <span className="text-xl text-white/95 font-semibold ml-3 drop-shadow-lg">Excelencia en servicio</span>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById('busqueda')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Calendar className="inline h-6 w-6 mr-2" />
              Reservar Ahora
            </button>
            <button
              onClick={() => window.location.href = '/cabanas'}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Home className="inline h-6 w-6 mr-2" />
              Ver Cabañas
            </button>
          </div>
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="busqueda" className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Encuentra tu cabaña perfecta
          </h3>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DatePicker
              label="Check-in"
              value={checkIn}
              onChange={setCheckIn}
              minDate={new Date().toISOString().split('T')[0]}
              placeholder="Fecha de llegada"
            />
            
            <DatePicker
              label="Check-out"
              value={checkOut}
              onChange={setCheckOut}
              minDate={checkIn || new Date().toISOString().split('T')[0]}
              placeholder="Fecha de salida"
            />
            
            <GuestSelector
              value={guests}
              onChange={setGuests}
              label="Huéspedes"
            />
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Buscar Disponibilidad
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          ¿Por qué elegirnos?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Cabañas Equipadas</h4>
            <p className="text-gray-600">
              Todas nuestras cabañas cuentan con equipamiento completo para tu comodidad y la de tu familia.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Ubicación Privilegiada</h4>
            <p className="text-gray-600">
              En el corazón de San Carlos de Bariloche, cerca de todos los atractivos turísticos.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Desayuno Incluido</h4>
            <p className="text-gray-600">
              Comienza tu día con un delicioso desayuno incluido en tu estadía.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Dirección</h4>
              <p>San Carlos de Bariloche, Río Negro, Argentina</p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Teléfono</h4>
              <p>+54 294 4XX-XXXX</p>
            </div>
            <div>
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Email</h4>
              <p>info@estanciadelcarmen.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Estancia del Carmen. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

