'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Users, Bed, Bath, Wifi, Tv, Coffee, Star, Calendar, MapPin, Phone, Mail, Search } from 'lucide-react'

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
  caracteristicas: string[]
  galeria: string[]
}

export default function CabanasPage() {
  const [cabanas, setCabanas] = useState<Cabana[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroCapacidad, setFiltroCapacidad] = useState('todas')
  const [filtroPrecio, setFiltroPrecio] = useState('todas')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    // Simular carga de cabañas
    setTimeout(() => {
      const cabanasData: Cabana[] = [
        {
          id: 1,
          nombre: 'Cabaña Familiar',
          capacidad: 6,
          habitaciones: 3,
          banos: 2,
          descripcion: 'Cabaña espaciosa ideal para familias, con vista al lago y todas las comodidades. Perfecta para grupos grandes que buscan comodidad y espacio.',
          precio: 25000,
          precioBooking: 27000,
          imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento'],
          caracteristicas: ['Vista al lago', 'Parrilla', 'Jardín privado', 'Cochera'],
          galeria: [
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800'
          ]
        },
        {
          id: 2,
          nombre: 'Cabaña Romántica',
          capacidad: 2,
          habitaciones: 1,
          banos: 1,
          descripcion: 'Cabaña íntima perfecta para parejas, con jacuzzi privado y chimenea. Ideal para una escapada romántica en la montaña.',
          precio: 18000,
          precioBooking: 19500,
          imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea', 'Calefacción'],
          caracteristicas: ['Jacuzzi privado', 'Chimenea', 'Terraza privada', 'Vista panorámica'],
          galeria: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800'
          ]
        },
        {
          id: 3,
          nombre: 'Cabaña Grande',
          capacidad: 8,
          habitaciones: 4,
          banos: 3,
          descripcion: 'La cabaña más grande del complejo, ideal para grupos grandes o reuniones familiares. Con amplios espacios y todas las comodidades.',
          precio: 35000,
          precioBooking: 38000,
          imagen: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla', 'Calefacción', 'Estacionamiento'],
          caracteristicas: ['Amplios espacios', 'Parrilla exterior', 'Sala de juegos', 'Múltiples terrazas'],
          galeria: [
            'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
          ]
        },
        {
          id: 4,
          nombre: 'Cabaña Standard',
          capacidad: 4,
          habitaciones: 2,
          banos: 1,
          descripcion: 'Cabaña cómoda con excelente relación precio-calidad. Perfecta para familias pequeñas o grupos de amigos.',
          precio: 20000,
          precioBooking: 21500,
          imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción'],
          caracteristicas: ['Cocina equipada', 'Terraza', 'Jardín', 'Estacionamiento'],
          galeria: [
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
          ]
        }
      ]
      
      setCabanas(cabanasData)
      setLoading(false)
    }, 800)
  }, [])

  const filtrarCabanas = () => {
    let filtradas = cabanas

    // Filtro por capacidad
    if (filtroCapacidad !== 'todas') {
      const capacidad = Number(filtroCapacidad)
      filtradas = filtradas.filter(c => c.capacidad >= capacidad)
    }

    // Filtro por precio
    if (filtroPrecio !== 'todas') {
      switch (filtroPrecio) {
        case 'economico':
          filtradas = filtradas.filter(c => c.precio < 20000)
          break
        case 'medio':
          filtradas = filtradas.filter(c => c.precio >= 20000 && c.precio < 30000)
          break
        case 'premium':
          filtradas = filtradas.filter(c => c.precio >= 30000)
          break
      }
    }

    // Filtro por búsqueda
    if (busqueda) {
      filtradas = filtradas.filter(c => 
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.servicios.some(s => s.toLowerCase().includes(busqueda.toLowerCase()))
      )
    }

    return filtradas
  }

  const cabanasFiltradas = filtrarCabanas()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cabañas...</p>
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
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
                Inicio
              </Link>
              <Link href="/cabanas" className="text-primary-600 font-semibold">
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Nuestras Cabañas</h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Descubre la comodidad y el encanto de nuestras cabañas en el corazón de Bariloche
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline h-4 w-4 mr-1" />
                Buscar Cabaña
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre, descripción o servicios..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad
              </label>
              <select
                value={filtroCapacidad}
                onChange={(e) => setFiltroCapacidad(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              >
                <option value="todas">Cualquier capacidad</option>
                <option value="2">2+ personas</option>
                <option value="4">4+ personas</option>
                <option value="6">6+ personas</option>
                <option value="8">8+ personas</option>
              </select>
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Precio
              </label>
              <select
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              >
                <option value="todas">Cualquier precio</option>
                <option value="economico">Económico (&lt; $20K)</option>
                <option value="medio">Medio ($20K - $30K)</option>
                <option value="premium">Premium (&gt; $30K)</option>
              </select>
            </div>

            <button
              onClick={() => {
                setBusqueda('')
                setFiltroCapacidad('todas')
                setFiltroPrecio('todas')
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Limpiar
            </button>
          </div>
        </div>
      </section>

      {/* Lista de Cabañas */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            {cabanasFiltradas.length} {cabanasFiltradas.length === 1 ? 'Cabaña Encontrada' : 'Cabañas Encontradas'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>Todas incluyen desayuno</span>
          </div>
        </div>

        {cabanasFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No se encontraron cabañas</p>
            <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cabanasFiltradas.map(cabana => (
              <div key={cabana.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Imagen principal */}
                <div className="relative h-64 overflow-hidden group">
                  <div 
                    className="h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cabana.imagen})` }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-semibold text-primary-600">Disponible</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-2xl font-bold">{cabana.nombre}</h4>
                    <p className="text-primary-100">Hasta {cabana.capacidad} personas</p>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Información básica */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-b mb-4">
                    <div className="text-center">
                      <Users className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Hasta {cabana.capacidad}</p>
                      <p className="text-xs text-gray-500">personas</p>
                    </div>
                    <div className="text-center">
                      <Bed className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">{cabana.habitaciones}</p>
                      <p className="text-xs text-gray-500">habitaciones</p>
                    </div>
                    <div className="text-center">
                      <Bath className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">{cabana.banos}</p>
                      <p className="text-xs text-gray-500">baños</p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {cabana.descripcion}
                  </p>

                  {/* Servicios */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Servicios incluidos:</p>
                    <div className="flex flex-wrap gap-2">
                      {cabana.servicios.map((servicio, idx) => (
                        <span key={idx} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {servicio}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Características especiales */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Características especiales:</p>
                    <div className="flex flex-wrap gap-2">
                      {cabana.caracteristicas.map((caracteristica, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Precio y botón */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Precio por noche</p>
                      <p className="text-3xl font-bold text-primary-600">
                        ${cabana.precio.toLocaleString('es-AR')}
                      </p>
                      <p className="text-xs text-gray-500">Desayuno incluido</p>
                    </div>
                    <Link
                      href={`/reservar?cabana=${cabana.id}`}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Reservar Ahora
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">¿Listo para tu próxima aventura?</h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Reserva tu cabaña ideal y disfruta de una experiencia única en Bariloche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              <Calendar className="inline h-5 w-5 mr-2" />
              Buscar Disponibilidad
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition font-semibold"
            >
              <Phone className="inline h-5 w-5 mr-2" />
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold">Estancia del Carmen</span>
              </div>
              <p className="text-gray-400">
                Tu hogar en Bariloche. Experiencias únicas en el corazón de la Patagonia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>San Carlos de Bariloche, Río Negro</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+54 294 4XX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@estanciadelcarmen.com</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
                <Link href="/cabanas" className="block text-gray-400 hover:text-white transition">
                  Cabañas
                </Link>
                <Link href="/contacto" className="block text-gray-400 hover:text-white transition">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Estancia del Carmen. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}