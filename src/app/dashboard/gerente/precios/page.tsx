'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import AlertModal from '@/components/AlertModal'
import { useAlert } from '@/hooks/useAlert'
import { DollarSign, TrendingUp, Calendar, Edit, Save } from 'lucide-react'

interface Precio {
  cabana: string
  temporadaBaja: number
  temporadaMedia: number
  temporadaAlta: number
  tarifaBooking: number
}

export default function PreciosGerente() {
  const router = useRouter()
  const { alert, hideAlert, showSuccess } = useAlert()
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(false)

  const [precios, setPrecios] = useState<Precio[]>([
    {
      cabana: 'Cabaña Familiar',
      temporadaBaja: 20000,
      temporadaMedia: 25000,
      temporadaAlta: 35000,
      tarifaBooking: 27000
    },
    {
      cabana: 'Cabaña Romántica',
      temporadaBaja: 15000,
      temporadaMedia: 18000,
      temporadaAlta: 25000,
      tarifaBooking: 19500
    },
    {
      cabana: 'Cabaña Grande',
      temporadaBaja: 28000,
      temporadaMedia: 35000,
      temporadaAlta: 45000,
      tarifaBooking: 38000
    },
    {
      cabana: 'Cabaña Standard',
      temporadaBaja: 16000,
      temporadaMedia: 20000,
      temporadaAlta: 28000,
      tarifaBooking: 21500
    },
  ])

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

  const handlePrecioChange = (index: number, campo: keyof Precio, valor: string) => {
    const nuevosPrecios = [...precios]
    nuevosPrecios[index] = {
      ...nuevosPrecios[index],
      [campo]: Number(valor)
    }
    setPrecios(nuevosPrecios)
  }

  const guardarPrecios = () => {
    // Aquí iría la lógica para guardar en el backend
    console.log('Guardando precios:', precios)
    setEditando(false)
    showSuccess('Precios actualizados', 'Los precios han sido actualizados correctamente en el sistema.')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const temporadas = [
    {
      nombre: 'Temporada Alta',
      meses: 'Diciembre - Febrero',
      descripcion: 'Verano y vacaciones',
      color: 'red'
    },
    {
      nombre: 'Temporada Media',
      meses: 'Marzo - Mayo, Septiembre - Noviembre',
      descripcion: 'Primavera y Otoño',
      color: 'yellow'
    },
    {
      nombre: 'Temporada Baja',
      meses: 'Junio - Agosto',
      descripcion: 'Invierno',
      color: 'blue'
    }
  ]

  return (
    <DashboardLayout role="gerente">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Precios y Tarifas</h1>
            <p className="text-gray-600 mt-1">Administra los precios según temporada y canal de venta</p>
          </div>
          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center"
            >
              <Edit className="h-5 w-5 mr-2" />
              Editar Precios
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditando(false)
                  // Recargar precios originales
                }}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={guardarPrecios}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Guardar Cambios
              </button>
            </div>
          )}
        </div>

        {/* Información de Temporadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temporadas.map((temporada, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-3">
                <Calendar className={`h-6 w-6 text-${temporada.color}-600 mr-2`} />
                <h3 className="font-bold text-lg text-gray-800">{temporada.nombre}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{temporada.meses}</p>
              <p className="text-xs text-gray-500">{temporada.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Tabla de Precios */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-800">
              <DollarSign className="inline h-5 w-5 mr-2" />
              Precios por Cabaña y Temporada
            </h3>
            <p className="text-sm text-gray-600 mt-1">Todos los precios son por noche</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Cabaña</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Temporada Baja</span>
                      <span className="text-xs font-normal text-gray-500">Jun-Ago</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Temporada Media</span>
                      <span className="text-xs font-normal text-gray-500">Mar-May, Sep-Nov</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Temporada Alta</span>
                      <span className="text-xs font-normal text-gray-500">Dic-Feb</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <span>Tarifa Booking</span>
                      <span className="text-xs font-normal text-gray-500">Especial</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {precios.map((precio, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-semibold text-gray-800">{precio.cabana}</td>
                    <td className="py-4 px-4 text-center">
                      {editando ? (
                        <input
                          type="number"
                          value={precio.temporadaBaja}
                          onChange={(e) => handlePrecioChange(index, 'temporadaBaja', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          ${precio.temporadaBaja.toLocaleString('es-AR')}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {editando ? (
                        <input
                          type="number"
                          value={precio.temporadaMedia}
                          onChange={(e) => handlePrecioChange(index, 'temporadaMedia', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-yellow-600 font-semibold">
                          ${precio.temporadaMedia.toLocaleString('es-AR')}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {editando ? (
                        <input
                          type="number"
                          value={precio.temporadaAlta}
                          onChange={(e) => handlePrecioChange(index, 'temporadaAlta', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-red-600 font-semibold">
                          ${precio.temporadaAlta.toLocaleString('es-AR')}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {editando ? (
                        <input
                          type="number"
                          value={precio.tarifaBooking}
                          onChange={(e) => handlePrecioChange(index, 'tarifaBooking', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-purple-600 font-semibold">
                          ${precio.tarifaBooking.toLocaleString('es-AR')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Análisis de Precios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              <TrendingUp className="inline h-5 w-5 mr-2" />
              Estrategia de Precios
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Temporada Baja</p>
                  <p className="text-gray-600">Precios reducidos para incentivar reservas en época de menor demanda</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <span className="text-yellow-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Temporada Media</p>
                  <p className="text-gray-600">Precio base estándar con demanda moderada</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Temporada Alta</p>
                  <p className="text-gray-600">Precios máximos durante períodos de alta demanda</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <span className="text-purple-600 font-bold">B</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Tarifa Booking.com</p>
                  <p className="text-gray-600">Precio especial para plataforma (generalmente +8-10% sobre temporada media)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Comparativa de Ingresos</h3>
            <div className="space-y-4">
              {precios.map((precio, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{precio.cabana}</span>
                    <span className="text-gray-600">Promedio: ${Math.round((precio.temporadaBaja + precio.temporadaMedia + precio.temporadaAlta) / 3).toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex gap-1 h-6">
                    <div 
                      className="bg-blue-500 rounded-l flex items-center justify-center text-xs text-white"
                      style={{ width: `${(precio.temporadaBaja / precio.temporadaAlta) * 100}%` }}
                    >
                      {precio.temporadaBaja < 20000 ? '' : 'Baja'}
                    </div>
                    <div 
                      className="bg-yellow-500 flex items-center justify-center text-xs text-white"
                      style={{ width: `${(precio.temporadaMedia / precio.temporadaAlta) * 100}%` }}
                    >
                      Media
                    </div>
                    <div 
                      className="bg-red-500 rounded-r flex items-center justify-center text-xs text-white"
                      style={{ width: '100%' }}
                    >
                      Alta
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notas Importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-2">Notas Importantes</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Los precios se aplican automáticamente según la fecha de reserva</li>
            <li>• La tarifa de Booking.com incluye la comisión de la plataforma</li>
            <li>• Todos los precios incluyen desayuno para todos los huéspedes</li>
            <li>• Los cambios de precios se reflejan inmediatamente en el sistema de reservas</li>
          </ul>
        </div>
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

