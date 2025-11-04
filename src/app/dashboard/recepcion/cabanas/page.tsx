'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import AlertModal from '@/components/AlertModal'
import { useAlert } from '@/hooks/useAlert'
import { Home, Users, Bed, Bath, Wifi, Tv, Coffee, CheckCircle, Clock, AlertCircle, Key } from 'lucide-react'

interface Cabana {
  id: number
  nombre: string
  numero: string
  capacidad: number
  habitaciones: number
  banos: number
  estado: 'Disponible' | 'Ocupada' | 'En Limpieza' | 'Mantenimiento'
  precio: number
  servicios: string[]
  reservaActual?: {
    cliente: string
    checkin: string
    checkout: string
    pasajeros: number
  }
  proximaReserva?: {
    cliente: string
    checkin: string
    pasajeros: number
  }
  ultimaLimpieza?: string
  proximaLimpieza?: string
}

export default function CabanasRecepcion() {
  const router = useRouter()
  const { alert, hideAlert, showInfo } = useAlert()
  const [loading, setLoading] = useState(true)
  const [cabanas, setCabanas] = useState<Cabana[]>([])
  const [filtroEstado, setFiltroEstado] = useState('todas')
  const [filtroCapacidad, setFiltroCapacidad] = useState('todas')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(user)
    if (userData.role !== 'recepcionista') {
      router.push('/login')
      return
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    // Simular carga de cabañas
    const cabanasData: Cabana[] = [
      {
        id: 1,
        nombre: 'Cabaña Familiar',
        numero: '1',
        capacidad: 6,
        habitaciones: 3,
        banos: 2,
        estado: 'Ocupada',
        precio: 25000,
        servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento'],
        reservaActual: {
          cliente: 'Juan Pérez',
          checkin: '2025-10-15',
          checkout: '2025-10-18',
          pasajeros: 4
        },
        proximaReserva: {
          cliente: 'María González',
          checkin: '2025-10-20',
          pasajeros: 2
        },
        ultimaLimpieza: '2025-10-15',
        proximaLimpieza: '2025-10-18'
      },
      {
        id: 2,
        nombre: 'Cabaña Familiar',
        numero: '2',
        capacidad: 6,
        habitaciones: 3,
        banos: 2,
        estado: 'Disponible',
        precio: 25000,
        servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción', 'Estacionamiento'],
        proximaReserva: {
          cliente: 'Carlos López',
          checkin: '2025-10-22',
          pasajeros: 3
        },
        ultimaLimpieza: '2025-10-16',
        proximaLimpieza: '2025-10-22'
      },
      {
        id: 3,
        nombre: 'Cabaña Romántica',
        numero: '3',
        capacidad: 2,
        habitaciones: 1,
        banos: 1,
        estado: 'En Limpieza',
        precio: 18000,
        servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea', 'Calefacción'],
        ultimaLimpieza: '2025-10-17',
        proximaLimpieza: '2025-10-17'
      },
      {
        id: 4,
        nombre: 'Cabaña Grande',
        numero: '4',
        capacidad: 8,
        habitaciones: 4,
        banos: 3,
        estado: 'Ocupada',
        precio: 35000,
        servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla', 'Calefacción', 'Estacionamiento'],
        reservaActual: {
          cliente: 'Ana Martínez',
          checkin: '2025-10-20',
          checkout: '2025-10-25',
          pasajeros: 6
        },
        ultimaLimpieza: '2025-10-20',
        proximaLimpieza: '2025-10-25'
      },
      {
        id: 5,
        nombre: 'Cabaña Standard',
        numero: '5',
        capacidad: 4,
        habitaciones: 2,
        banos: 1,
        estado: 'Mantenimiento',
        precio: 20000,
        servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción'],
        ultimaLimpieza: '2025-10-14',
        proximaLimpieza: '2025-10-19'
      }
    ]

    setCabanas(cabanasData)
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-100 text-green-700'
      case 'Ocupada':
        return 'bg-red-100 text-red-700'
      case 'En Limpieza':
        return 'bg-yellow-100 text-yellow-700'
      case 'Mantenimiento':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'Ocupada':
        return <Users className="h-5 w-5 text-red-600" />
      case 'En Limpieza':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'Mantenimiento':
        return <AlertCircle className="h-5 w-5 text-orange-600" />
      default:
        return <Home className="h-5 w-5 text-gray-600" />
    }
  }

  const filtrarCabanas = () => {
    let filtradas = cabanas

    // Filtro por estado
    if (filtroEstado !== 'todas') {
      filtradas = filtradas.filter(c => c.estado === filtroEstado)
    }

    // Filtro por capacidad
    if (filtroCapacidad !== 'todas') {
      const capacidad = Number(filtroCapacidad)
      filtradas = filtradas.filter(c => c.capacidad >= capacidad)
    }

    return filtradas
  }

  const cabanasFiltradas = filtrarCabanas()

  const estadisticas = {
    total: cabanas.length,
    disponibles: cabanas.filter(c => c.estado === 'Disponible').length,
    ocupadas: cabanas.filter(c => c.estado === 'Ocupada').length,
    limpieza: cabanas.filter(c => c.estado === 'En Limpieza').length,
    mantenimiento: cabanas.filter(c => c.estado === 'Mantenimiento').length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <DashboardLayout role="recepcionista">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Estado de Cabañas</h1>
          <p className="text-gray-600 mt-1">Monitorea el estado y disponibilidad de todas las cabañas</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{estadisticas.total}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Home className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{estadisticas.disponibles}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ocupadas</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{estadisticas.ocupadas}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Limpieza</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{estadisticas.limpieza}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mantenimiento</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{estadisticas.mantenimiento}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              >
                <option value="todas">Todos los estados</option>
                <option value="Disponible">Disponibles</option>
                <option value="Ocupada">Ocupadas</option>
                <option value="En Limpieza">En Limpieza</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad Mínima
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

            <button
              onClick={() => {
                setFiltroEstado('todas')
                setFiltroCapacidad('todas')
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Lista de Cabañas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cabanasFiltradas.map(cabana => (
            <div key={cabana.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Header de la cabaña */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cabana.nombre} #{cabana.numero}</h3>
                    <p className="text-2xl font-bold text-primary-600 mt-1">
                      ${cabana.precio.toLocaleString('es-AR')}/noche
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getEstadoIcon(cabana.estado)}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(cabana.estado)}`}>
                      {cabana.estado}
                    </span>
                  </div>
                </div>

                {/* Información básica */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
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
              </div>

              {/* Contenido principal */}
              <div className="p-6">
                {/* Servicios */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Servicios:</p>
                  <div className="flex flex-wrap gap-2">
                    {cabana.servicios.map((servicio, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Información de reserva actual */}
                {cabana.reservaActual && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-primary-900 mb-2">Reserva Actual:</h4>
                    <div className="text-sm text-primary-800 space-y-1">
                      <p><strong>Cliente:</strong> {cabana.reservaActual.cliente}</p>
                      <p><strong>Check-in:</strong> {new Date(cabana.reservaActual.checkin).toLocaleDateString('es-AR')}</p>
                      <p><strong>Check-out:</strong> {new Date(cabana.reservaActual.checkout).toLocaleDateString('es-AR')}</p>
                      <p><strong>Pasajeros:</strong> {cabana.reservaActual.pasajeros}</p>
                    </div>
                  </div>
                )}

                {/* Próxima reserva */}
                {cabana.proximaReserva && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-900 mb-2">Próxima Reserva:</h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <p><strong>Cliente:</strong> {cabana.proximaReserva.cliente}</p>
                      <p><strong>Check-in:</strong> {new Date(cabana.proximaReserva.checkin).toLocaleDateString('es-AR')}</p>
                      <p><strong>Pasajeros:</strong> {cabana.proximaReserva.pasajeros}</p>
                    </div>
                  </div>
                )}

                {/* Información de limpieza */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Limpieza:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {cabana.ultimaLimpieza && (
                      <p><strong>Última:</strong> {new Date(cabana.ultimaLimpieza).toLocaleDateString('es-AR')}</p>
                    )}
                    {cabana.proximaLimpieza && (
                      <p><strong>Próxima:</strong> {new Date(cabana.proximaLimpieza).toLocaleDateString('es-AR')}</p>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  {cabana.estado === 'Disponible' && (
                    <button
                      onClick={() => router.push(`/dashboard/recepcion/checkin?cabana=${cabana.id}`)}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm font-semibold flex items-center justify-center"
                    >
                      <Key className="h-4 w-4 mr-1" />
                      Asignar
                    </button>
                  )}
                  {cabana.estado === 'Ocupada' && (
                    <button
                      onClick={() => showInfo('Cabaña Ocupada', `La cabaña ${cabana.nombre} #${cabana.numero} está ocupada por ${cabana.reservaActual?.cliente}.`)}
                      className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition text-sm font-semibold"
                    >
                      Ver Detalles
                    </button>
                  )}
                  {cabana.estado === 'En Limpieza' && (
                    <button
                      onClick={() => showInfo('Cabaña en Limpieza', `La cabaña ${cabana.nombre} #${cabana.numero} está siendo limpiada y estará disponible pronto.`)}
                      className="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition text-sm font-semibold"
                    >
                      En Proceso
                    </button>
                  )}
                  {cabana.estado === 'Mantenimiento' && (
                    <button
                      onClick={() => showInfo('Cabaña en Mantenimiento', `La cabaña ${cabana.nombre} #${cabana.numero} está en mantenimiento y no está disponible para reservas.`)}
                      className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                    >
                      En Reparación
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {cabanasFiltradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No se encontraron cabañas</p>
            <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      {alert && (
        <AlertModal
          isOpen={!!alert}
          onClose={hideAlert}
          title={alert.title}
          message={alert.message}
          type={alert.type}
          showCancel={alert.showCancel}
          confirmText={alert.confirmText}
          cancelText={alert.cancelText}
          onConfirm={alert.onConfirm}
          onCancel={alert.onCancel}
        />
      )}
    </DashboardLayout>
  )
}
