'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, Search, Filter, Eye, CheckCircle, Clock, AlertCircle, Users, Home } from 'lucide-react'

interface Reserva {
  id: string
  numero: string
  cliente: string
  email: string
  telefono: string
  cabana: string
  checkin: string
  checkout: string
  noches: number
  pasajeros: number
  precio: number
  estado: 'Confirmada' | 'Pendiente' | 'Check-in' | 'Check-out' | 'Cancelada'
  canal: 'Web' | 'Booking' | 'Telefono' | 'Presencial'
  fechaReserva: string
  acompanantes?: string[]
}

export default function ReservasRecepcion() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [filtro, setFiltro] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [fechaFiltro, setFechaFiltro] = useState('')

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
    // Simular carga de reservas
    const reservasData: Reserva[] = [
      {
        id: '1',
        numero: 'EDC-001234',
        cliente: 'Juan Pérez',
        email: 'juan.perez@email.com',
        telefono: '+54 9 11 1234-5678',
        cabana: 'Cabaña Familiar #1',
        checkin: '2025-10-15',
        checkout: '2025-10-18',
        noches: 3,
        pasajeros: 4,
        precio: 75000,
        estado: 'Confirmada',
        canal: 'Web',
        fechaReserva: '2025-10-10',
        acompanantes: ['María Pérez', 'Carlos Pérez', 'Ana Pérez']
      },
      {
        id: '2',
        numero: 'EDC-001235',
        cliente: 'María González',
        email: 'maria.gonzalez@email.com',
        telefono: '+54 9 11 2345-6789',
        cabana: 'Cabaña Romántica #3',
        checkin: '2025-10-16',
        checkout: '2025-10-19',
        noches: 3,
        pasajeros: 2,
        precio: 54000,
        estado: 'Pendiente',
        canal: 'Booking',
        fechaReserva: '2025-10-12'
      },
      {
        id: '3',
        numero: 'EDC-001236',
        cliente: 'Carlos López',
        email: 'carlos.lopez@email.com',
        telefono: '+54 9 11 3456-7890',
        cabana: 'Cabaña Standard #5',
        checkin: '2025-10-18',
        checkout: '2025-10-20',
        noches: 2,
        pasajeros: 3,
        precio: 40000,
        estado: 'Check-in',
        canal: 'Telefono',
        fechaReserva: '2025-10-14'
      },
      {
        id: '4',
        numero: 'EDC-001237',
        cliente: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        telefono: '+54 9 11 4567-8901',
        cabana: 'Cabaña Grande #2',
        checkin: '2025-10-20',
        checkout: '2025-10-25',
        noches: 5,
        pasajeros: 6,
        precio: 175000,
        estado: 'Confirmada',
        canal: 'Web',
        fechaReserva: '2025-10-13',
        acompanantes: ['Roberto Martínez', 'Laura Martínez', 'Pedro Martínez', 'Sofia Martínez', 'Diego Martínez']
      },
      {
        id: '5',
        numero: 'EDC-001238',
        cliente: 'Luis Rodríguez',
        email: 'luis.rodriguez@email.com',
        telefono: '+54 9 11 5678-9012',
        cabana: 'Cabaña Familiar #4',
        checkin: '2025-10-22',
        checkout: '2025-10-24',
        noches: 2,
        pasajeros: 5,
        precio: 50000,
        estado: 'Check-out',
        canal: 'Presencial',
        fechaReserva: '2025-10-11'
      }
    ]

    setReservas(reservasData)
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-green-100 text-green-700'
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700'
      case 'Check-in':
        return 'bg-blue-100 text-blue-700'
      case 'Check-out':
        return 'bg-purple-100 text-purple-700'
      case 'Cancelada':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getCanalColor = (canal: string) => {
    switch (canal) {
      case 'Web':
        return 'bg-blue-100 text-blue-700'
      case 'Booking':
        return 'bg-orange-100 text-orange-700'
      case 'Telefono':
        return 'bg-green-100 text-green-700'
      case 'Presencial':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filtrarReservas = () => {
    let filtradas = reservas

    // Filtro por estado
    if (filtro !== 'todas') {
      filtradas = filtradas.filter(r => r.estado === filtro)
    }

    // Filtro por búsqueda
    if (busqueda) {
      filtradas = filtradas.filter(r => 
        r.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.email.toLowerCase().includes(busqueda.toLowerCase())
      )
    }

    // Filtro por fecha
    if (fechaFiltro) {
      filtradas = filtradas.filter(r => r.checkin === fechaFiltro)
    }

    return filtradas
  }

  const reservasFiltradas = filtrarReservas()

  const estadisticas = {
    total: reservas.length,
    confirmadas: reservas.filter(r => r.estado === 'Confirmada').length,
    pendientes: reservas.filter(r => r.estado === 'Pendiente').length,
    checkinHoy: reservas.filter(r => r.checkin === new Date().toISOString().split('T')[0]).length
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Reservas</h1>
          <p className="text-gray-600 mt-1">Administra todas las reservas del complejo</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reservas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{estadisticas.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmadas</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{estadisticas.confirmadas}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{estadisticas.pendientes}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-in Hoy</p>
                <p className="text-3xl font-bold text-primary-600 mt-1">{estadisticas.checkinHoy}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Home className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline h-4 w-4 mr-1" />
                Buscar Reserva
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Número, cliente o email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Estado
              </label>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              >
                <option value="todas">Todas</option>
                <option value="Confirmada">Confirmadas</option>
                <option value="Pendiente">Pendientes</option>
                <option value="Check-in">Check-in</option>
                <option value="Check-out">Check-out</option>
                <option value="Cancelada">Canceladas</option>
              </select>
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Check-in
              </label>
              <input
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>

            <button
              onClick={() => {
                setBusqueda('')
                setFiltro('todas')
                setFechaFiltro('')
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Lista de Reservas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-800">
              Reservas ({reservasFiltradas.length})
            </h3>
          </div>

          {reservasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No se encontraron reservas</p>
              <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reserva</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Cabaña</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Fechas</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Pasajeros</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Precio</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Canal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradas.map(reserva => (
                    <tr key={reserva.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-mono font-bold text-primary-600">{reserva.numero}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(reserva.fechaReserva).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-800">{reserva.cliente}</p>
                          <p className="text-sm text-gray-600">{reserva.email}</p>
                          <p className="text-sm text-gray-600">{reserva.telefono}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium">{reserva.cabana}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="font-medium">
                            {new Date(reserva.checkin).toLocaleDateString('es-AR')}
                          </p>
                          <p className="text-gray-600">
                            {new Date(reserva.checkout).toLocaleDateString('es-AR')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {reserva.noches} {reserva.noches === 1 ? 'noche' : 'noches'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium">{reserva.pasajeros}</span>
                        </div>
                        {reserva.acompanantes && reserva.acompanantes.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{reserva.acompanantes.length} acompañantes
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-800">
                          ${reserva.precio.toLocaleString('es-AR')}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(reserva.estado)}`}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCanalColor(reserva.canal)}`}>
                          {reserva.canal}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/recepcion/checkin?reserva=${reserva.numero}`)}
                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                          >
                            <Eye className="inline h-4 w-4 mr-1" />
                            Ver
                          </button>
                          {reserva.estado === 'Confirmada' && (
                            <button
                              onClick={() => router.push(`/dashboard/recepcion/checkin?reserva=${reserva.numero}`)}
                              className="text-green-600 hover:text-green-700 font-semibold text-sm"
                            >
                              Check-in
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

