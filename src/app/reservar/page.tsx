'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Home, ChevronLeft, Calendar, Users, CreditCard, Mail, Phone, MapPin, User, CheckCircle } from 'lucide-react'

function ReservarContent() {
  const searchParams = useSearchParams()
  const [paso, setPaso] = useState(1)
  const [loading, setLoading] = useState(false)
  const [reservaConfirmada, setReservaConfirmada] = useState(false)
  
  const cabanaId = searchParams.get('cabana')
  const checkIn = searchParams.get('checkin') || ''
  const checkOut = searchParams.get('checkout') || ''
  const guests = Number(searchParams.get('guests')) || 2

  // Datos del cliente
  const [formData, setFormData] = useState({
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
    documento: '',
    // Pago
    numeroTarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    cvv: '',
    tipoTarjeta: 'credito'
  })

  // Datos de la cabaña (simulado)
  const cabana = {
    id: Number(cabanaId),
    nombre: 'Cabaña Familiar',
    capacidad: 6,
    precio: 25000,
    imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800'
  }

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0
    const inicio = new Date(checkIn)
    const fin = new Date(checkOut)
    const diff = fin.getTime() - inicio.getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  const noches = calcularNoches()
  const subtotal = cabana.precio * noches
  const total = subtotal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePaso1 = (e: React.FormEvent) => {
    e.preventDefault()
    setPaso(2)
  }

  const handlePaso2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setLoading(false)
      setReservaConfirmada(true)
      setPaso(3)
    }, 2000)
  }

  if (reservaConfirmada && paso === 3) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Estancia del Carmen</h1>
                <p className="text-sm text-gray-600">San Carlos de Bariloche</p>
              </div>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-6">
              Tu reserva ha sido procesada exitosamente. Recibirás un correo electrónico con todos los detalles.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-bold text-lg mb-4">Detalles de la Reserva</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Número de Reserva:</strong> #EDC-{Date.now().toString().slice(-6)}</p>
                <p><strong>Cabaña:</strong> {cabana.nombre}</p>
                <p><strong>Check-in:</strong> {new Date(checkIn).toLocaleDateString('es-AR')}</p>
                <p><strong>Check-out:</strong> {new Date(checkOut).toLocaleDateString('es-AR')}</p>
                <p><strong>Noches:</strong> {noches}</p>
                <p><strong>Pasajeros:</strong> {guests}</p>
                <p><strong>Total pagado:</strong> ${total.toLocaleString('es-AR')}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Al llegar al complejo, deberás presentar tu número de reserva y un documento de identidad válido para realizar el check-in.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
                Volver al Inicio
              </Link>
              <button
                onClick={() => window.print()}
                className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
              >
                Imprimir Confirmación
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Estancia del Carmen</h1>
                <p className="text-sm text-gray-600">San Carlos de Bariloche</p>
              </div>
            </Link>
            <Link href="/buscar" className="text-gray-700 hover:text-primary-600 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a resultados
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${paso >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Datos Personales</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${paso >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Pago</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${paso >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Confirmación</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            {paso === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos del Pasajero Principal</h2>
                <form onSubmit={handlePaso1} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline h-4 w-4 mr-1" />
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                        value={formData.documento}
                        onChange={handleChange}
                        required
                        placeholder="DNI, Pasaporte, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      <MapPin className="inline h-5 w-5 mr-1" />
                      Domicilio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Calle *
                        </label>
                        <input
                          type="text"
                          name="calle"
                          value={formData.calle}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          name="numero"
                          value={formData.numero}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Piso
                        </label>
                        <input
                          type="text"
                          name="piso"
                          value={formData.piso}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Departamento
                        </label>
                        <input
                          type="text"
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Provincia *
                        </label>
                        <input
                          type="text"
                          name="provincia"
                          value={formData.provincia}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                    >
                      Continuar al Pago
                    </button>
                  </div>
                </form>
              </div>
            )}

            {paso === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <CreditCard className="inline h-6 w-6 mr-2" />
                  Información de Pago
                </h2>
                <form onSubmit={handlePaso2} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Tarjeta *
                    </label>
                    <select
                      name="tipoTarjeta"
                      value={formData.tipoTarjeta}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="credito">Tarjeta de Crédito</option>
                      <option value="debito">Tarjeta de Débito</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={formData.numeroTarjeta}
                      onChange={handleChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre en la Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="nombreTarjeta"
                      value={formData.nombreTarjeta}
                      onChange={handleChange}
                      required
                      placeholder="Como aparece en la tarjeta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vencimiento *
                      </label>
                      <input
                        type="text"
                        name="vencimiento"
                        value={formData.vencimiento}
                        onChange={handleChange}
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Una vez confirmada la reserva, no podrá ser rechazada según las políticas del establecimiento.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setPaso(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-400"
                    >
                      {loading ? 'Procesando...' : 'Confirmar y Pagar'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen de Reserva</h3>
              
              <div className="mb-4">
                <div 
                  className="h-32 bg-cover bg-center rounded-lg mb-3"
                  style={{ backgroundImage: `url(${cabana.imagen})` }}
                />
                <h4 className="font-bold text-gray-800">{cabana.nombre}</h4>
                <p className="text-sm text-gray-600">Hasta {cabana.capacidad} personas</p>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Check-in: {new Date(checkIn).toLocaleDateString('es-AR')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Check-out: {new Date(checkOut).toLocaleDateString('es-AR')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{guests} {guests === 1 ? 'Pasajero' : 'Pasajeros'}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">${cabana.precio.toLocaleString('es-AR')} × {noches} {noches === 1 ? 'noche' : 'noches'}</span>
                  <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desayuno incluido</span>
                  <span>✓</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-primary-600">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReservarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <ReservarContent />
    </Suspense>
  )
}

