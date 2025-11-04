'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, Bed, Bath, Wifi, Tv, Coffee, Star, MapPin, Phone, Mail, ArrowLeft, Calendar, CheckCircle, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  caracteristicas: string[]
  galeria: string[]
}

export default function CabanaDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [cabana, setCabana] = useState<Cabana | null>(null)
  const [loading, setLoading] = useState(true)
  const [imagenActual, setImagenActual] = useState(0)
  const [modalAbierto, setModalAbierto] = useState(false)

  useEffect(() => {
    // Simular carga de cabaña
    setTimeout(() => {
      const cabanasData: Cabana[] = [
        {
          id: 1,
          nombre: 'Cabaña Familiar',
          capacidad: 6,
          habitaciones: 3,
          banos: 2,
          descripcion: 'Cabaña espaciosa ideal para familias, con vista al lago y todas las comodidades. Perfecta para grupos grandes que buscan comodidad y espacio. Disfruta de una experiencia única en Bariloche con esta hermosa cabaña que combina elegancia y funcionalidad. Cuenta con amplios espacios comunes, una cocina completamente equipada, y una terraza con vista panorámica al lago Nahuel Huapi.',
          precio: 25000,
          precioBooking: 27000,
          imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento'],
          caracteristicas: ['Vista al lago', 'Parrilla', 'Jardín privado', 'Cochera'],
          galeria: [
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
            'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200'
          ]
        },
        {
          id: 2,
          nombre: 'Cabaña Romántica',
          capacidad: 2,
          habitaciones: 1,
          banos: 1,
          descripcion: 'Cabaña íntima perfecta para parejas, con jacuzzi privado y chimenea. Ideal para una escapada romántica en la montaña. Disfruta de momentos inolvidables en un ambiente acogedor y romántico, con detalles cuidadosamente pensados para crear una experiencia única.',
          precio: 18000,
          precioBooking: 19500,
          imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea', 'Calefacción'],
          caracteristicas: ['Jacuzzi privado', 'Chimenea', 'Terraza privada', 'Vista panorámica'],
          galeria: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200'
          ]
        },
        {
          id: 3,
          nombre: 'Cabaña Grande',
          capacidad: 8,
          habitaciones: 4,
          banos: 3,
          descripcion: 'La cabaña más grande del complejo, ideal para grupos grandes o reuniones familiares. Con amplios espacios y todas las comodidades. Perfecta para celebraciones especiales, esta cabaña ofrece múltiples espacios de convivencia, una cocina gourmet, y áreas de entretenimiento para toda la familia.',
          precio: 35000,
          precioBooking: 38000,
          imagen: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla', 'Calefacción', 'Estacionamiento'],
          caracteristicas: ['Amplios espacios', 'Parrilla exterior', 'Sala de juegos', 'Múltiples terrazas'],
          galeria: [
            'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200'
          ]
        },
        {
          id: 4,
          nombre: 'Cabaña Standard',
          capacidad: 4,
          habitaciones: 2,
          banos: 1,
          descripcion: 'Cabaña cómoda con excelente relación precio-calidad. Perfecta para familias pequeñas o grupos de amigos. Combina funcionalidad y comodidad en un espacio acogedor que te hará sentir como en casa.',
          precio: 20000,
          precioBooking: 21500,
          imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
          disponible: true,
          servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción'],
          caracteristicas: ['Cocina equipada', 'Terraza', 'Jardín', 'Estacionamiento'],
          galeria: [
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200'
          ]
        }
      ]

      const cabanaEncontrada = cabanasData.find(c => c.id === Number(params.id))
      if (cabanaEncontrada) {
        setCabana(cabanaEncontrada)
        setImagenActual(0)
      }
      setLoading(false)
    }, 500)
  }, [params.id])

  const siguienteImagen = () => {
    if (cabana) {
      setImagenActual((prev) => (prev + 1) % cabana.galeria.length)
    }
  }

  const anteriorImagen = () => {
    if (cabana) {
      setImagenActual((prev) => (prev - 1 + cabana.galeria.length) % cabana.galeria.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cabaña...</p>
        </div>
      </div>
    )
  }

  if (!cabana) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cabaña no encontrada</h2>
          <p className="text-gray-600 mb-6">La cabaña que buscas no existe o ha sido eliminada.</p>
          <Link
            href="/cabanas"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a Cabañas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Estancia del Carmen</h1>
                <p className="text-sm text-gray-600">San Carlos de Bariloche</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4 items-center">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
                Inicio
              </Link>
              <Link href="/cabanas" className="text-primary-600 font-semibold">
                Cabañas
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-primary-600 transition">
                Contacto
              </Link>
              <UserAvatar />
            </nav>
          </div>
        </div>
      </header>

      {/* Botón Volver */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/cabanas"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 transition font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Cabañas
        </Link>
      </div>

      {/* Galería de Imágenes */}
      <section className="container mx-auto px-4 mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src={cabana.galeria[imagenActual]}
              alt={cabana.nombre}
              className="w-full h-full object-cover"
            />
            {cabana.galeria.length > 1 && (
              <>
                <button
                  onClick={anteriorImagen}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={siguienteImagen}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setModalAbierto(true)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-all font-semibold text-sm"
                >
                  Ver todas las fotos ({cabana.galeria.length})
                </button>
              </>
            )}
          </div>
          {/* Indicadores */}
          {cabana.galeria.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {cabana.galeria.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setImagenActual(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === imagenActual ? 'bg-white w-8' : 'bg-white/50 w-2'
                  }`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2">
            {/* Título y Precio */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{cabana.nombre}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-sm ml-1">(127 reseñas)</span>
                    </div>
                    <span>•</span>
                    <span>San Carlos de Bariloche</span>
                  </div>
                </div>
              </div>

              {/* Información básica */}
              <div className="grid grid-cols-3 gap-6 py-6 border-t border-b">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-gray-800">{cabana.capacidad}</p>
                  <p className="text-sm text-gray-600">Huéspedes</p>
                </div>
                <div className="text-center">
                  <Bed className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-gray-800">{cabana.habitaciones}</p>
                  <p className="text-sm text-gray-600">Habitaciones</p>
                </div>
                <div className="text-center">
                  <Bath className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-gray-800">{cabana.banos}</p>
                  <p className="text-sm text-gray-600">Baños</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{cabana.descripcion}</p>
            </div>

            {/* Servicios */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios incluidos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cabana.servicios.map((servicio, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      {servicio === 'WiFi' && <Wifi className="h-5 w-5 text-primary-600" />}
                      {servicio === 'TV' && <Tv className="h-5 w-5 text-primary-600" />}
                      {servicio === 'Cocina' && <Coffee className="h-5 w-5 text-primary-600" />}
                      {servicio === 'Cocina completa' && <Coffee className="h-5 w-5 text-primary-600" />}
                      {!['WiFi', 'TV', 'Cocina', 'Cocina completa'].includes(servicio) && (
                        <CheckCircle className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{servicio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Características */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Características especiales</h2>
              <div className="flex flex-wrap gap-3">
                {cabana.caracteristicas.map((caracteristica, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {caracteristica}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card de Reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-bold text-primary-600">
                    ${cabana.precio.toLocaleString('es-AR')}
                  </p>
                  <span className="text-gray-500">/ noche</span>
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  4.8 (127 reseñas)
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        className="w-full text-sm text-gray-900 border-0 focus:ring-0 p-0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        className="w-full text-sm text-gray-900 border-0 focus:ring-0 p-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Huéspedes</label>
                  <select className="w-full text-sm text-gray-900 border-0 focus:ring-0 p-0">
                    <option>1 huésped</option>
                    <option>2 huéspedes</option>
                    <option>3 huéspedes</option>
                    <option>4 huéspedes</option>
                    <option>5+ huéspedes</option>
                  </select>
                </div>
              </div>

              <Link
                href={`/reservar?cabana=${cabana.id}`}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Calendar className="inline h-5 w-5 mr-2" />
                Reservar Ahora
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                No se te cobrará nada todavía
              </p>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Desayuno incluido para todos los huéspedes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Cancelación gratuita hasta 48h antes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Check-in flexible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Galería */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setModalAbierto(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition p-2"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={anteriorImagen}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition p-3"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={siguienteImagen}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition p-3"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <img
            src={cabana.galeria[imagenActual]}
            alt={cabana.nombre}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
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
              <div className="space-y-2 mb-4">
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
              <div className="pt-4 border-t border-gray-800">
                <Link 
                  href="/login" 
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm font-semibold"
                >
                  Acceso Personal
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

