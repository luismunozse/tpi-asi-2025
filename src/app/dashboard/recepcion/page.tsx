'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react'

export default function RecepcionDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const checkinsHoy = [
    { 
      id: 1, 
      reserva: '#EDC-001234', 
      cliente: 'Juan Pérez', 
      email: 'juan.perez@email.com',
      telefono: '+54 294 123-4567',
      cabana: 'Cabaña Familiar', 
      hora: '14:00', 
      estado: 'Pendiente',
      huespedes: 4,
      noches: 3
    },
    { 
      id: 2, 
      reserva: '#EDC-001235', 
      cliente: 'María González', 
      email: 'maria.gonzalez@email.com',
      telefono: '+54 294 234-5678',
      cabana: 'Cabaña Romántica', 
      hora: '15:30', 
      estado: 'Pendiente',
      huespedes: 2,
      noches: 2
    },
    { 
      id: 3, 
      reserva: '#EDC-001236', 
      cliente: 'Carlos López', 
      email: 'carlos.lopez@email.com',
      telefono: '+54 294 345-6789',
      cabana: 'Cabaña Standard', 
      hora: '16:00', 
      estado: 'Completado',
      huespedes: 3,
      noches: 4
    },
    { 
      id: 4, 
      reserva: '#EDC-001237', 
      cliente: 'Ana Martínez', 
      email: 'ana.martinez@email.com',
      telefono: '+54 294 456-7890',
      cabana: 'Cabaña Deluxe', 
      hora: '17:00', 
      estado: 'Pendiente',
      huespedes: 2,
      noches: 5
    },
    { 
      id: 5, 
      reserva: '#EDC-001238', 
      cliente: 'Roberto Silva', 
      email: 'roberto.silva@email.com',
      telefono: '+54 294 567-8901',
      cabana: 'Cabaña Ejecutiva', 
      hora: '18:30', 
      estado: 'Pendiente',
      huespedes: 1,
      noches: 2
    }
  ]

  const stats = {
    checkinsHoy: checkinsHoy.filter(c => c.estado === 'Pendiente').length,
    checkoutsHoy: 3,
    reservasPendientes: checkinsHoy.length,
    cabanasDisponibles: 2
  }

  return (
    <DashboardLayout role="recepcionista">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard de Recepción</h1>
          <p className="text-gray-600 mt-1">Gestiona check-ins, check-outs y reservas</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-ins Hoy</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.checkinsHoy}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-outs Hoy</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.checkoutsHoy}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reservas Pendientes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.reservasPendientes}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cabañas Disponibles</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.cabanasDisponibles}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/recepcion/checkin')}
            className="bg-primary-600 text-white p-6 rounded-xl shadow-md hover:bg-primary-700 transition"
          >
            <CheckCircle className="h-8 w-8 mb-2" />
            <h3 className="font-bold text-lg">Realizar Check-in</h3>
            <p className="text-sm text-primary-100 mt-1">Registrar llegada de huéspedes</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/recepcion/reservas')}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border-2 border-gray-200"
          >
            <Calendar className="h-8 w-8 mb-2 text-primary-600" />
            <h3 className="font-bold text-lg">Ver Reservas</h3>
            <p className="text-sm text-gray-600 mt-1">Gestionar reservas activas</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/recepcion/clientes')}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border-2 border-gray-200"
          >
            <Users className="h-8 w-8 mb-2 text-primary-600" />
            <h3 className="font-bold text-lg">Buscar Cliente</h3>
            <p className="text-sm text-gray-600 mt-1">Consultar información de clientes</p>
          </button>
        </div>

        {/* Check-ins de Hoy */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Check-ins Programados para Hoy</h3>
            <span className="text-sm text-gray-500">Total: {checkinsHoy.length} reservas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reserva</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contacto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cabaña</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Detalles</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Acción</th>
                </tr>
              </thead>
              <tbody>
                {checkinsHoy.map(checkin => (
                  <tr key={checkin.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm font-mono text-primary-600 font-semibold">
                      {checkin.reserva}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-medium text-gray-900">{checkin.cliente}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="text-gray-600">{checkin.email}</div>
                      <div className="text-xs text-gray-500">{checkin.telefono}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-medium text-gray-900">{checkin.cabana}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="text-gray-600">{checkin.huespedes} huésped{checkin.huespedes > 1 ? 'es' : ''}</div>
                      <div className="text-xs text-gray-500">{checkin.noches} noche{checkin.noches > 1 ? 's' : ''}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-medium text-gray-900">{checkin.hora}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        checkin.estado === 'Completado' 
                          ? 'bg-green-100 text-green-700' 
                          : checkin.estado === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {checkin.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {checkin.estado === 'Pendiente' && (
                        <button 
                          onClick={() => router.push(`/dashboard/recepcion/checkin?reserva=${checkin.reserva}`)}
                          className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition text-xs font-semibold"
                        >
                          Check-in
                        </button>
                      )}
                      {checkin.estado === 'Completado' && (
                        <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Completado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {checkinsHoy.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No hay check-ins programados para hoy</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

