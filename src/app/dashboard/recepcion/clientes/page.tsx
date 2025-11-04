'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import ClientDetailsModal from '@/components/ClientDetailsModal'
import { Search, User, Mail, Phone, MapPin, Calendar, Eye, Plus } from 'lucide-react'

interface Cliente {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  documento: string
  domicilio: {
    calle: string
    numero: string
    piso?: string
    departamento?: string
    ciudad: string
    provincia: string
  }
  fechaRegistro: string
  reservasTotales: number
  ultimaEstadia?: string
  totalGastado: number
  acompanantes?: string[]
}

export default function ClientesRecepcion() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtroCiudad, setFiltroCiudad] = useState('todas')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)

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
    // Simular carga de clientes
    const clientesData: Cliente[] = [
      {
        id: '1',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@email.com',
        telefono: '+54 9 11 1234-5678',
        documento: '12345678',
        domicilio: {
          calle: 'Av. Bustillo',
          numero: '1234',
          piso: '2',
          departamento: 'A',
          ciudad: 'San Carlos de Bariloche',
          provincia: 'Río Negro'
        },
        fechaRegistro: '2025-09-15',
        reservasTotales: 3,
        ultimaEstadia: '2025-10-15',
        totalGastado: 225000,
        acompanantes: ['María Pérez', 'Carlos Pérez', 'Ana Pérez']
      },
      {
        id: '2',
        nombre: 'María',
        apellido: 'González',
        email: 'maria.gonzalez@email.com',
        telefono: '+54 9 11 2345-6789',
        documento: '23456789',
        domicilio: {
          calle: 'Mitre',
          numero: '567',
          ciudad: 'San Carlos de Bariloche',
          provincia: 'Río Negro'
        },
        fechaRegistro: '2025-10-01',
        reservasTotales: 1,
        ultimaEstadia: '2025-10-16',
        totalGastado: 54000
      },
      {
        id: '3',
        nombre: 'Carlos',
        apellido: 'López',
        email: 'carlos.lopez@email.com',
        telefono: '+54 9 11 3456-7890',
        documento: '34567890',
        domicilio: {
          calle: 'Perito Moreno',
          numero: '890',
          piso: '1',
          ciudad: 'San Carlos de Bariloche',
          provincia: 'Río Negro'
        },
        fechaRegistro: '2025-08-20',
        reservasTotales: 5,
        ultimaEstadia: '2025-10-18',
        totalGastado: 180000
      },
      {
        id: '4',
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'ana.martinez@email.com',
        telefono: '+54 9 11 4567-8901',
        documento: '45678901',
        domicilio: {
          calle: '12 de Octubre',
          numero: '123',
          ciudad: 'Buenos Aires',
          provincia: 'Buenos Aires'
        },
        fechaRegistro: '2025-09-30',
        reservasTotales: 2,
        ultimaEstadia: '2025-10-20',
        totalGastado: 175000,
        acompanantes: ['Roberto Martínez', 'Laura Martínez', 'Pedro Martínez', 'Sofia Martínez', 'Diego Martínez']
      },
      {
        id: '5',
        nombre: 'Luis',
        apellido: 'Rodríguez',
        email: 'luis.rodriguez@email.com',
        telefono: '+54 9 11 5678-9012',
        documento: '56789012',
        domicilio: {
          calle: 'Belgrano',
          numero: '456',
          ciudad: 'Córdoba',
          provincia: 'Córdoba'
        },
        fechaRegistro: '2025-07-10',
        reservasTotales: 4,
        ultimaEstadia: '2025-10-22',
        totalGastado: 200000
      }
    ]

    setClientes(clientesData)
  }, [])

  const filtrarClientes = () => {
    let filtrados = clientes

    // Filtro por búsqueda
    if (busqueda) {
      filtrados = filtrados.filter(c => 
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.documento.includes(busqueda) ||
        c.telefono.includes(busqueda)
      )
    }

    // Filtro por ciudad
    if (filtroCiudad !== 'todas') {
      filtrados = filtrados.filter(c => c.domicilio.ciudad === filtroCiudad)
    }

    return filtrados
  }

  const clientesFiltrados = filtrarClientes()

  const ciudades = [...new Set(clientes.map(c => c.domicilio.ciudad))]

  const abrirModal = (cliente: Cliente) => {
    setClienteSeleccionado(cliente)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setClienteSeleccionado(null)
  }

  const handleCheckIn = (cliente: Cliente) => {
    cerrarModal()
    router.push(`/dashboard/recepcion/checkin?cliente=${cliente.documento}`)
  }

  const estadisticas = {
    total: clientes.length,
    bariloche: clientes.filter(c => c.domicilio.ciudad === 'San Carlos de Bariloche').length,
    otros: clientes.filter(c => c.domicilio.ciudad !== 'San Carlos de Bariloche').length,
    frecuentes: clientes.filter(c => c.reservasTotales >= 3).length
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Base de Clientes</h1>
            <p className="text-gray-600 mt-1">Gestiona la información de todos los clientes</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/recepcion/clientes/nuevo')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Cliente
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clientes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{estadisticas.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bariloche</p>
                <p className="text-3xl font-bold text-primary-600 mt-1">{estadisticas.bariloche}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Otras Ciudades</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{estadisticas.otros}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-3">
                <MapPin className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Frecuentes</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{estadisticas.frecuentes}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-green-600" />
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
                Buscar Cliente
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre, apellido, email, documento o teléfono..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <select
                value={filtroCiudad}
                onChange={(e) => setFiltroCiudad(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              >
                <option value="todas">Todas las ciudades</option>
                {ciudades.map(ciudad => (
                  <option key={ciudad} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setBusqueda('')
                setFiltroCiudad('todas')
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-800">
              Clientes ({clientesFiltrados.length})
            </h3>
          </div>

          {clientesFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No se encontraron clientes</p>
              <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Cliente</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Contacto</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Domicilio</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Reservas</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Total Gastado</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Última Estadía</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map(cliente => (
                    <tr key={cliente.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="bg-primary-100 rounded-full p-2 mr-3">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {cliente.nombre} {cliente.apellido}
                            </p>
                            <p className="text-sm text-gray-600">DNI: {cliente.documento}</p>
                            <p className="text-xs text-gray-500">
                              Registro: {new Date(cliente.fechaRegistro).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">{cliente.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">{cliente.telefono}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="flex items-center mb-1">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-medium">{cliente.domicilio.ciudad}</span>
                          </div>
                          <p className="text-gray-600">
                            {cliente.domicilio.calle} {cliente.domicilio.numero}
                            {cliente.domicilio.piso && `, Piso ${cliente.domicilio.piso}`}
                            {cliente.domicilio.departamento && `, Dto. ${cliente.domicilio.departamento}`}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {cliente.domicilio.provincia}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary-600">{cliente.reservasTotales}</p>
                          <p className="text-xs text-gray-500">reservas</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-800">
                          ${cliente.totalGastado.toLocaleString('es-AR')}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        {cliente.ultimaEstadia ? (
                          <div className="text-sm">
                            <p className="font-medium">
                              {new Date(cliente.ultimaEstadia).toLocaleDateString('es-AR')}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {Math.ceil((new Date().getTime() - new Date(cliente.ultimaEstadia).getTime()) / (1000 * 60 * 60 * 24))} días atrás
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Sin estadías</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => abrirModal(cliente)}
                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                          >
                            <Eye className="inline h-4 w-4 mr-1" />
                            Ver
                          </button>
                          <button
                            onClick={() => router.push(`/dashboard/recepcion/checkin?cliente=${cliente.documento}`)}
                            className="text-green-600 hover:text-green-700 font-semibold text-sm"
                          >
                            Check-in
                          </button>
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

      {/* Modal de Detalles del Cliente */}
      <ClientDetailsModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        cliente={clienteSeleccionado}
        onCheckIn={handleCheckIn}
      />
    </DashboardLayout>
  )
}
