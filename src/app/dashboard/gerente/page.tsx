'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, DollarSign, Home, TrendingUp, Users } from 'lucide-react'

export default function GerenteDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(user)
    if (userData.role !== 'gerente') {
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

  // Datos simulados
  const stats = {
    reservasHoy: 3,
    ocupacion: 75,
    ingresosMes: 450000,
    clientesNuevos: 12
  }

  const reservasRecientes = [
    { id: 1, cliente: 'Juan Pérez', cabana: 'Cabaña Familiar', checkin: '2025-10-15', estado: 'Confirmada' },
    { id: 2, cliente: 'María González', cabana: 'Cabaña Romántica', checkin: '2025-10-16', estado: 'Confirmada' },
    { id: 3, cliente: 'Carlos López', cabana: 'Cabaña Standard', checkin: '2025-10-18', estado: 'Pendiente' },
  ]

  return (
    <DashboardLayout role="gerente">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard del Gerente</h1>
          <p className="text-gray-600 mt-1">Bienvenido al panel de control del complejo</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reservas Hoy</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.reservasHoy}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-3">↑ 12% vs ayer</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ocupación</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.ocupacion}%</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Home className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-3">↑ 5% vs mes pasado</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos del Mes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">${(stats.ingresosMes / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-3">↑ 18% vs mes pasado</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Nuevos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.clientesNuevos}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-3">↑ 8% vs mes pasado</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              <TrendingUp className="inline h-5 w-5 mr-2" />
              Ocupación por Temporada
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temporada Alta (Dic-Feb)</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temporada Media (Mar-May, Sep-Nov)</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temporada Baja (Jun-Ago)</span>
                  <span className="font-semibold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Canales de Reserva
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Booking.com</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="font-semibold text-sm">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sitio Web</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="font-semibold text-sm">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Directo/Teléfono</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="font-semibold text-sm">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reservas Recientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cabaña</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservasRecientes.map(reserva => (
                  <tr key={reserva.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">#{reserva.id.toString().padStart(4, '0')}</td>
                    <td className="py-3 px-4 text-sm">{reserva.cliente}</td>
                    <td className="py-3 px-4 text-sm">{reserva.cabana}</td>
                    <td className="py-3 px-4 text-sm">{new Date(reserva.checkin).toLocaleDateString('es-AR')}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reserva.estado === 'Confirmada' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {reserva.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


