'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import AlertModal from '@/components/AlertModal'
import { useAlert } from '@/hooks/useAlert'
import { Search, User, Mail, Phone, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react'

function CheckinContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { alert, hideAlert, showWarning } = useAlert()
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState(searchParams.get('reserva') || '')
  const [reservaEncontrada, setReservaEncontrada] = useState<any>(null)
  const [clienteExiste, setClienteExiste] = useState(true)
  const [paso, setPaso] = useState(1)
  const [acompanantes, setAcompanantes] = useState<any[]>([])
  const [nuevoAcompanante, setNuevoAcompanante] = useState({ nombre: '', apellido: '', documento: '' })
  const [cabanaAsignada, setCabanaAsignada] = useState('')

  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    ciudad: '',
    provincia: '',
    documento: ''
  })

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

  const buscarReserva = () => {
    // Simulación de búsqueda de reserva
    if (busqueda) {
      setReservaEncontrada({
        numero: busqueda,
        cliente: 'Juan Pérez',
        cabana: 'Cabaña Familiar',
        checkin: '2025-10-15',
        checkout: '2025-10-18',
        pasajeros: 4,
        precio: 75000
      })
      
      // Simular que el cliente ya existe en el sistema
      const existe = Math.random() > 0.3 // 70% de probabilidad de que exista
      setClienteExiste(existe)
      
      if (existe) {
        setClienteData({
          nombre: 'Juan',
          apellido: 'Pérez',
          email: 'juan.perez@email.com',
          telefono: '+54 9 11 1234-5678',
          calle: 'Av. Bustillo',
          numero: '1234',
          piso: '',
          departamento: '',
          ciudad: 'San Carlos de Bariloche',
          provincia: 'Río Negro',
          documento: '12345678'
        })
        setPaso(3) // Saltar al paso de acompañantes
      } else {
        setPaso(2) // Ir a registro de cliente
      }
    }
  }

  const agregarAcompanante = () => {
    if (nuevoAcompanante.nombre && nuevoAcompanante.apellido) {
      setAcompanantes([...acompanantes, { ...nuevoAcompanante, id: Date.now() }])
      setNuevoAcompanante({ nombre: '', apellido: '', documento: '' })
    }
  }

  const eliminarAcompanante = (id: number) => {
    setAcompanantes(acompanantes.filter(a => a.id !== id))
  }

  const completarCheckin = () => {
    if (cabanaAsignada) {
      setPaso(4)
    } else {
      showWarning('Cabaña requerida', 'Por favor seleccione una cabaña para continuar con el check-in.')
    }
  }

  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClienteData({
      ...clienteData,
      [e.target.name]: e.target.value
    })
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Check-in de Huéspedes</h1>
          <p className="text-gray-600 mt-1">Registro de llegada y asignación de cabaña</p>
        </div>

        {/* Paso 1: Búsqueda de Reserva */}
        {paso === 1 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              <Search className="inline h-6 w-6 mr-2" />
              Buscar Reserva
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Reserva o Nombre del Cliente
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: #EDC-001234 o Juan Pérez"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={buscarReserva}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    <Search className="inline h-5 w-5 mr-2" />
                    Buscar
                  </button>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-800">
                  <strong>Instrucción:</strong> Solicite al huésped su número de reserva o documento de identidad para verificar su reserva en el sistema.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Paso 2: Registro de Cliente Nuevo */}
        {paso === 2 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Cliente no registrado en el sistema</p>
                  <p className="text-sm text-yellow-700 mt-1">Por favor, complete los datos del cliente para continuar.</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-6">Registro de Cliente</h2>
            <form onSubmit={(e) => { e.preventDefault(); setPaso(3); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={clienteData.nombre}
                    onChange={handleClienteChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={clienteData.apellido}
                    onChange={handleClienteChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={clienteData.email}
                    onChange={handleClienteChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={clienteData.telefono}
                    onChange={handleClienteChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documento de Identidad *
                </label>
                <input
                  type="text"
                  name="documento"
                  value={clienteData.documento}
                  onChange={handleClienteChange}
                  required
                  placeholder="DNI, Pasaporte, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  <MapPin className="inline h-5 w-5 mr-1" />
                  Domicilio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calle *</label>
                    <input
                      type="text"
                      name="calle"
                      value={clienteData.calle}
                      onChange={handleClienteChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                    <input
                      type="text"
                      name="numero"
                      value={clienteData.numero}
                      onChange={handleClienteChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Piso</label>
                    <input
                      type="text"
                      name="piso"
                      value={clienteData.piso}
                      onChange={handleClienteChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                    <input
                      type="text"
                      name="departamento"
                      value={clienteData.departamento}
                      onChange={handleClienteChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={clienteData.ciudad}
                      onChange={handleClienteChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provincia *</label>
                    <input
                      type="text"
                      name="provincia"
                      value={clienteData.provincia}
                      onChange={handleClienteChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setPaso(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Guardar y Continuar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Paso 3: Acompañantes y Asignación de Cabaña */}
        {paso === 3 && reservaEncontrada && (
          <div className="space-y-6">
            {/* Información de la Reserva */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Información de la Reserva</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Reserva</p>
                  <p className="font-semibold">{reservaEncontrada.numero}</p>
                </div>
                <div>
                  <p className="text-gray-600">Cliente</p>
                  <p className="font-semibold">{clienteData.nombre} {clienteData.apellido}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-in</p>
                  <p className="font-semibold">{new Date(reservaEncontrada.checkin).toLocaleDateString('es-AR')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-out</p>
                  <p className="font-semibold">{new Date(reservaEncontrada.checkout).toLocaleDateString('es-AR')}</p>
                </div>
              </div>
            </div>

            {/* Registro de Acompañantes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                <Users className="inline h-5 w-5 mr-2" />
                Pasajeros Acompañantes
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Pasajero principal: <strong>{clienteData.nombre} {clienteData.apellido}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Capacidad de la cabaña: {reservaEncontrada.pasajeros} personas (1 registrado + {acompanantes.length} acompañantes)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nuevoAcompanante.nombre}
                  onChange={(e) => setNuevoAcompanante({...nuevoAcompanante, nombre: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={nuevoAcompanante.apellido}
                  onChange={(e) => setNuevoAcompanante({...nuevoAcompanante, apellido: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Documento"
                    value={nuevoAcompanante.documento}
                    onChange={(e) => setNuevoAcompanante({...nuevoAcompanante, documento: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={agregarAcompanante}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {acompanantes.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Acompañantes registrados:</p>
                  <ul className="space-y-2">
                    {acompanantes.map((acomp) => (
                      <li key={acomp.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm">{acomp.nombre} {acomp.apellido} - Doc: {acomp.documento}</span>
                        <button
                          onClick={() => eliminarAcompanante(acomp.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Asignación de Cabaña */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Asignación de Cabaña</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Cabaña Disponible *
                </label>
                <select
                  value={cabanaAsignada}
                  onChange={(e) => setCabanaAsignada(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seleccione una cabaña...</option>
                  <option value="1">Cabaña Familiar - Número 1</option>
                  <option value="2">Cabaña Familiar - Número 2</option>
                  <option value="5">Cabaña Standard - Número 5</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setPaso(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={completarCheckin}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                <CheckCircle className="inline h-5 w-5 mr-2" />
                Completar Check-in
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Confirmación */}
        {paso === 4 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Check-in Completado</h2>
            <p className="text-gray-600 mb-6">
              El huésped ha sido registrado exitosamente en el sistema.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <h3 className="font-bold text-lg mb-4">Información de Entrega</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Cabaña Asignada:</strong> #{cabanaAsignada}</p>
                <p><strong>Cliente:</strong> {clienteData.nombre} {clienteData.apellido}</p>
                <p><strong>Acompañantes:</strong> {acompanantes.length}</p>
                <p><strong>Check-in:</strong> {new Date().toLocaleString('es-AR')}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Próximo paso:</strong> Entregar las llaves de la cabaña #{cabanaAsignada} al huésped.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard/recepcion')}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Volver al Dashboard
              </button>
              <button
                onClick={() => window.print()}
                className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
              >
                Imprimir Comprobante
              </button>
            </div>
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

export default function CheckinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <CheckinContent />
    </Suspense>
  )
}

