'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Home, Edit, Eye, Plus, Users, Bed, Bath } from 'lucide-react'

export default function CabanasGerente() {
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

  const cabanas = [
    { 
      id: 1, 
      nombre: 'Cabaña Familiar #1', 
      capacidad: 6, 
      habitaciones: 3, 
      banos: 2,
      estado: 'Disponible',
      precio: 25000,
      servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción']
    },
    { 
      id: 2, 
      nombre: 'Cabaña Familiar #2', 
      capacidad: 6, 
      habitaciones: 3, 
      banos: 2,
      estado: 'Ocupada',
      precio: 25000,
      servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción']
    },
    { 
      id: 3, 
      nombre: 'Cabaña Romántica #3', 
      capacidad: 2, 
      habitaciones: 1, 
      banos: 1,
      estado: 'Disponible',
      precio: 18000,
      servicios: ['WiFi', 'TV', 'Jacuzzi', 'Chimenea']
    },
    { 
      id: 4, 
      nombre: 'Cabaña Grande #4', 
      capacidad: 8, 
      habitaciones: 4, 
      banos: 3,
      estado: 'En Limpieza',
      precio: 35000,
      servicios: ['WiFi', 'TV', 'Cocina completa', 'Parrilla']
    },
    { 
      id: 5, 
      nombre: 'Cabaña Standard #5', 
      capacidad: 4, 
      habitaciones: 2, 
      banos: 1,
      estado: 'Disponible',
      precio: 20000,
      servicios: ['WiFi', 'TV', 'Cocina', 'Calefacción']
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-100 text-green-700'
      case 'Ocupada':
        return 'bg-red-100 text-red-700'
      case 'En Limpieza':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <DashboardLayout role="gerente">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Cabañas</h1>
            <p className="text-gray-600 mt-1">Administra el inventario de cabañas del complejo</p>
          </div>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Nueva Cabaña
          </button>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cabañas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{cabanas.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600">Disponibles</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {cabanas.filter(c => c.estado === 'Disponible').length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600">Ocupadas</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {cabanas.filter(c => c.estado === 'Ocupada').length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600">En Mantenimiento</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {cabanas.filter(c => c.estado === 'En Limpieza').length}
            </p>
          </div>
        </div>

        {/* Lista de Cabañas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cabanas.map(cabana => (
            <div key={cabana.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cabana.nombre}</h3>
                    <p className="text-2xl font-bold text-primary-600 mt-1">
                      ${cabana.precio.toLocaleString('es-AR')}/noche
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(cabana.estado)}`}>
                    {cabana.estado}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b">
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

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm font-semibold flex items-center justify-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-semibold flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}


