'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { ClipboardList, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

export default function MantenimientoDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(user)
    if (userData.role !== 'mantenimiento') {
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

  const tareas = [
    { 
      id: 1, 
      cabana: 'Cabaña Familiar #1', 
      tarea: 'Limpieza completa', 
      estado: 'En Progreso', 
      prioridad: 'Alta', 
      tiempo: '45 min',
      tiempoEstimado: '45 min',
      tiempoTranscurrido: '25 min',
      asignadoA: 'María López',
      horaInicio: '14:30',
      horaEstimadaFin: '15:15',
      notas: 'Check-out realizado a las 11:00. Requiere limpieza profunda.',
      checkOut: '2025-10-18 11:00',
      proximoCheckIn: '2025-10-20 14:00'
    },
    { 
      id: 2, 
      cabana: 'Cabaña Romántica #3', 
      tarea: 'Limpieza completa', 
      estado: 'Pendiente', 
      prioridad: 'Alta', 
      tiempo: '30 min',
      tiempoEstimado: '30 min',
      tiempoTranscurrido: '0 min',
      asignadoA: 'Pendiente',
      horaInicio: null,
      horaEstimadaFin: null,
      notas: 'Check-out programado para las 11:00. Preparar para nueva reserva.',
      checkOut: '2025-10-17 11:00',
      proximoCheckIn: '2025-10-17 14:00'
    },
    { 
      id: 3, 
      cabana: 'Cabaña Standard #5', 
      tarea: 'Limpieza completa', 
      estado: 'Completado', 
      prioridad: 'Media', 
      tiempo: '35 min',
      tiempoEstimado: '35 min',
      tiempoTranscurrido: '35 min',
      asignadoA: 'Juan Pérez',
      horaInicio: '10:00',
      horaEstimadaFin: '10:35',
      horaFin: '10:32',
      notas: 'Limpieza completada satisfactoriamente. Todo en orden.',
      checkOut: '2025-10-16 11:00',
      proximoCheckIn: '2025-10-19 14:00'
    },
    { 
      id: 4, 
      cabana: 'Cabaña Grande #2', 
      tarea: 'Limpieza completa', 
      estado: 'Completado', 
      prioridad: 'Media', 
      tiempo: '60 min',
      tiempoEstimado: '60 min',
      tiempoTranscurrido: '55 min',
      asignadoA: 'Carlos Martínez',
      horaInicio: '09:00',
      horaEstimadaFin: '10:00',
      horaFin: '09:55',
      notas: 'Cabaña grande requiere más tiempo. Limpieza exhaustiva completada.',
      checkOut: '2025-10-15 11:00',
      proximoCheckIn: '2025-10-22 14:00'
    },
    { 
      id: 5, 
      cabana: 'Cabaña Familiar #2', 
      tarea: 'Limpieza completa', 
      estado: 'Pendiente', 
      prioridad: 'Media', 
      tiempo: '45 min',
      tiempoEstimado: '45 min',
      tiempoTranscurrido: '0 min',
      asignadoA: 'Pendiente',
      horaInicio: null,
      horaEstimadaFin: null,
      notas: 'Disponible para limpieza. Sin urgencia.',
      checkOut: '2025-10-16 11:00',
      proximoCheckIn: '2025-10-22 14:00'
    },
    { 
      id: 6, 
      cabana: 'Cabaña Standard #6', 
      tarea: 'Limpieza profunda + Mantenimiento', 
      estado: 'Pendiente', 
      prioridad: 'Alta', 
      tiempo: '90 min',
      tiempoEstimado: '90 min',
      tiempoTranscurrido: '0 min',
      asignadoA: 'Pendiente',
      horaInicio: null,
      horaEstimadaFin: null,
      notas: 'Reporte de problemas eléctricos. Requiere mantenimiento adicional.',
      checkOut: '2025-10-17 11:00',
      proximoCheckIn: '2025-10-18 14:00'
    },
  ]

  const stats = {
    tareasHoy: tareas.length,
    completadas: tareas.filter(t => t.estado === 'Completado').length,
    pendientes: tareas.filter(t => t.estado === 'Pendiente').length,
    enProgreso: tareas.filter(t => t.estado === 'En Progreso').length,
    urgentes: tareas.filter(t => t.prioridad === 'Alta' && t.estado !== 'Completado').length
  }

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    console.log(`Cambiar tarea ${id} a ${nuevoEstado}`)
  }

  return (
    <DashboardLayout role="mantenimiento">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Mantenimiento</h1>
          <p className="text-gray-600 mt-1">Gestión de limpieza y mantenimiento de cabañas</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tareas Hoy</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.tareasHoy}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <ClipboardList className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completadas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.completadas}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Progreso</p>
                <p className="text-3xl font-bold text-primary-600 mt-1">{stats.enProgreso}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pendientes}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.urgentes}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Tareas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tareas del Día</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Cabaña</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Tarea</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Asignado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Prioridad</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Tiempo</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">Acción</th>
                </tr>
              </thead>
              <tbody>
                {tareas.map(tarea => (
                  <tr key={tarea.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{tarea.cabana}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div>{tarea.tarea}</div>
                      {tarea.notas && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={tarea.notas}>
                          {tarea.notas}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {tarea.asignadoA !== 'Pendiente' ? (
                        <div>
                          <div className="font-medium">{tarea.asignadoA}</div>
                          {tarea.horaInicio && (
                            <div className="text-xs text-gray-500">Inicio: {tarea.horaInicio}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Sin asignar</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tarea.prioridad === 'Alta' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tarea.prioridad}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div>Est: {tarea.tiempoEstimado}</div>
                      {tarea.estado === 'En Progreso' && tarea.tiempoTranscurrido && (
                        <div className="text-xs text-primary-600">Trans: {tarea.tiempoTranscurrido}</div>
                      )}
                      {tarea.horaEstimadaFin && (
                        <div className="text-xs text-gray-500">Fin: {tarea.horaEstimadaFin}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tarea.estado === 'Completado' 
                          ? 'bg-green-100 text-green-700'
                          : tarea.estado === 'En Progreso'
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tarea.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {tarea.estado === 'Pendiente' && (
                        <button
                          onClick={() => cambiarEstado(tarea.id, 'En Progreso')}
                          className="text-primary-600 hover:text-primary-700 font-semibold transition"
                        >
                          Iniciar
                        </button>
                      )}
                      {tarea.estado === 'En Progreso' && (
                        <button
                          onClick={() => cambiarEstado(tarea.id, 'Completado')}
                          className="text-green-600 hover:text-green-700 font-semibold transition"
                        >
                          Completar
                        </button>
                      )}
                      {tarea.estado === 'Completado' && (
                        <div className="text-xs text-gray-600">
                          <div className="text-green-600 font-semibold">✓ Listo</div>
                          {tarea.horaFin && (
                            <div className="text-gray-500">Fin: {tarea.horaFin}</div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checklist de Limpieza */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            <ClipboardList className="inline h-5 w-5 mr-2" />
            Checklist de Limpieza Estándar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-semibold text-gray-800 mb-3">Áreas Comunes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Limpieza de pisos y alfombras
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Desempolvar muebles
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Limpieza de ventanas
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Reposición de amenities
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-semibold text-gray-800 mb-3">Baños</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Desinfección completa
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Reposición de toallas
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Reposición de papel higiénico
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Limpieza de espejos
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-semibold text-gray-800 mb-3">Habitaciones</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Cambio de sábanas y funda
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Aspirar y trapear
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Ordenar muebles
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Vaciar papeleras
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-semibold text-gray-800 mb-3">Cocina</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Lavar vajilla y utensilios
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Limpiar electrodomésticos
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Desinfectar mesadas
                </li>
                <li className="flex items-center text-gray-900">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  Reposición de insumos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


