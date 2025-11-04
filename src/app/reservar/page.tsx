'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Home, ChevronLeft, Calendar, Users, CreditCard, CheckCircle, AlertCircle, Mail, ArrowRight, Receipt, FileText } from 'lucide-react'
import AlertModal from '@/components/AlertModal'
import { useAlert } from '@/hooks/useAlert'

function ReservarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { alert, hideAlert, showError, showSuccess } = useAlert()
  
  const [paso, setPaso] = useState(1) // 1: Confirmación, 2: Selección pago, 3: Datos tarjeta, 4: Comprobantes
  const [loading, setLoading] = useState(false)
  const [cliente, setCliente] = useState<any>(null)
  const [reservaConfirmada, setReservaConfirmada] = useState(false)
  const [comprobantePago, setComprobantePago] = useState<any>(null)
  const [comprobanteReserva, setComprobanteReserva] = useState<any>(null)

  const cabanaId = searchParams.get('cabana')
  const checkIn = searchParams.get('checkin') || ''
  const checkOut = searchParams.get('checkout') || ''
  const guests = Number(searchParams.get('guests')) || 2

  // Datos de la cabaña (simulado - debería venir de la búsqueda)
  const cabanas = {
    1: { id: 1, nombre: 'Cabaña Familiar', capacidad: 6, precio: 25000, imagen: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800' },
    2: { id: 2, nombre: 'Cabaña Romántica', capacidad: 2, precio: 18000, imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800' },
    3: { id: 3, nombre: 'Cabaña Grande', capacidad: 8, precio: 35000, imagen: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800' },
    4: { id: 4, nombre: 'Cabaña Standard', capacidad: 4, precio: 20000, imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' }
  }

  const cabana = cabanas[Number(cabanaId) as keyof typeof cabanas] || cabanas[1]

  // Datos de pago
  const [medioPago, setMedioPago] = useState<'debito' | 'credito' | ''>('')
  const [datosTarjeta, setDatosTarjeta] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    cvv: ''
  })

  // Verificar autenticación
  useEffect(() => {
    const clienteData = localStorage.getItem('cliente')
    if (!clienteData) {
      router.push(`/login-cliente?redirect=/reservar?cabana=${cabanaId}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`)
      return
    }
    setCliente(JSON.parse(clienteData))
  }, [router, cabanaId, checkIn, checkOut, guests])

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0
    try {
      const inicio = new Date(checkIn + 'T00:00:00')
      const fin = new Date(checkOut + 'T00:00:00')
      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) return 0
      const diff = fin.getTime() - inicio.getTime()
      const noches = Math.ceil(diff / (1000 * 3600 * 24))
      return noches > 0 ? noches : 0
    } catch {
      return 0
    }
  }

  // Detectar temporada para aplicar descuentos
  const getSeasonDiscount = () => {
    if (!checkIn) return 0
    try {
      const fecha = new Date(checkIn + 'T00:00:00')
      const month = fecha.getMonth() + 1
      if (month >= 4 && month <= 5) return 0.15 // Otoño - 15% descuento
      if (month >= 9 && month <= 11) return 0.10 // Primavera - 10% descuento
      return 0
    } catch {
      return 0
    }
  }

  const noches = calcularNoches()
  const subtotal = cabana.precio * noches
  const descuento = getSeasonDiscount()
  const descuentoMonto = Math.round(subtotal * descuento)
  const subtotalConDescuento = subtotal - descuentoMonto
  const comisionServicio = Math.round(subtotalConDescuento * 0.12)
  const impuestos = Math.round(subtotalConDescuento * 0.21)
  const total = subtotalConDescuento + comisionServicio + impuestos

  // Paso 1: Confirmación de reserva
  const handleConfirmarReserva = () => {
    if (!checkIn || !checkOut) {
      showError('Fechas requeridas', 'Por favor selecciona las fechas de check-in y check-out.')
      return
    }
    if (noches <= 0) {
      showError('Fechas inválidas', 'La fecha de check-out debe ser posterior al check-in.')
      return
    }
    setPaso(2)
  }

  // Paso 2: Selección de medio de pago
  const handleSeleccionarPago = (tipo: 'debito' | 'credito') => {
    setMedioPago(tipo)
    setPaso(3)
  }

  // Paso 3: Ingreso de datos de tarjeta y pago
  const handleProcesarPago = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!datosTarjeta.numeroTarjeta || !datosTarjeta.nombreTarjeta || 
        !datosTarjeta.vencimiento || !datosTarjeta.cvv) {
      showError('Datos incompletos', 'Por favor completa todos los datos de la tarjeta.')
      return
    }

    setLoading(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setLoading(false)
      
      // Generar comprobante de pago
      const numeroComprobante = `PAGO-${Date.now().toString().slice(-8)}`
      const comprobantePagoData = {
        numero: numeroComprobante,
        fecha: new Date().toLocaleString('es-AR'),
        monto: total,
        medioPago: medioPago === 'debito' ? 'Tarjeta de Débito' : 'Tarjeta de Crédito',
        ultimos4: datosTarjeta.numeroTarjeta.slice(-4),
        estado: 'Aprobado'
      }
      setComprobantePago(comprobantePagoData)

      // Registrar el pago
      const pagos = JSON.parse(localStorage.getItem('pagos') || '[]')
      pagos.push(comprobantePagoData)
      localStorage.setItem('pagos', JSON.stringify(pagos))

      // Registrar la reserva
      const numeroReserva = `EDC-${Date.now().toString().slice(-6)}`
      const reservaData = {
        numero: numeroReserva,
        cliente: cliente,
        cabana: cabana,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        noches: noches,
        subtotal: subtotal,
        descuento: descuento,
        descuentoMonto: descuentoMonto,
        subtotalConDescuento: subtotalConDescuento,
        comisionServicio: comisionServicio,
        impuestos: impuestos,
        total: total,
        fechaReserva: new Date().toLocaleString('es-AR'),
        estado: 'Confirmada',
        comprobantePago: numeroComprobante
      }

      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
      reservas.push(reservaData)
      localStorage.setItem('reservas', JSON.stringify(reservas))

      setComprobanteReserva(reservaData)

      // Simular envío de email
      setTimeout(() => {
        showSuccess('Email enviado', `Se ha enviado un correo de confirmación a ${cliente.email}`)
      }, 500)

      setReservaConfirmada(true)
      setPaso(4)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const name = e.target.name

    // Formatear número de tarjeta
    if (name === 'numeroTarjeta') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (value.length > 19) value = value.slice(0, 19)
    }

    // Formatear vencimiento
    if (name === 'vencimiento') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4)
      }
      if (value.length > 5) value = value.slice(0, 5)
    }

    // Formatear CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    setDatosTarjeta({
      ...datosTarjeta,
      [name]: value
    })
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (reservaConfirmada && paso === 4) {
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
          <div className="max-w-4xl mx-auto">
            {/* Confirmación exitosa */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-6">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Reserva Confirmada!</h2>
              <p className="text-gray-600 mb-2">
                Tu reserva ha sido procesada exitosamente.
              </p>
              <p className="text-primary-600 font-semibold mb-6">
                Número de Reserva: {comprobanteReserva?.numero}
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary-800 flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Se ha enviado un correo de confirmación a <strong className="ml-1">{cliente.email}</strong>
                </p>
              </div>
            </div>

            {/* Comprobantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Comprobante de Pago */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Receipt className="h-6 w-6 mr-2 text-primary-600" />
                    Comprobante de Pago
                  </h3>
                  <button
                    onClick={() => window.print()}
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Imprimir
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número:</span>
                    <span className="font-semibold text-gray-900">{comprobantePago?.numero}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="text-gray-900">{comprobantePago?.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monto:</span>
                    <span className="font-bold text-primary-600">
                      ${comprobantePago?.monto.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medio de pago:</span>
                    <span className="text-gray-900">{comprobantePago?.medioPago}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarjeta:</span>
                    <span className="text-gray-900">**** {comprobantePago?.ultimos4}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600 font-semibold">{comprobantePago?.estado}</span>
                  </div>
                </div>
              </div>

              {/* Comprobante de Reserva */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-primary-600" />
                    Comprobante de Reserva
                  </h3>
                  <button
                    onClick={() => window.print()}
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Imprimir
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número:</span>
                    <span className="font-semibold text-gray-900">{comprobanteReserva?.numero}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha reserva:</span>
                    <span className="text-gray-900">{comprobanteReserva?.fechaReserva}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cabaña:</span>
                    <span className="text-gray-900">{comprobanteReserva?.cabana.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="text-gray-900">{new Date(checkIn).toLocaleDateString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="text-gray-900">{new Date(checkOut).toLocaleDateString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Huéspedes:</span>
                    <span className="text-gray-900">{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Noches:</span>
                    <span className="text-gray-900">{noches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-primary-600">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600 font-semibold">{comprobanteReserva?.estado}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información importante */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-yellow-800 mb-2">Importante:</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Presenta tu número de reserva y documento de identidad al llegar al complejo</li>
                <li>• El check-in se realiza a partir de las 14:00 hs</li>
                <li>• El check-out debe realizarse antes de las 11:00 hs</li>
                <li>• Una vez confirmada, la reserva no puede ser rechazada según las políticas del establecimiento</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Volver al Inicio
              </Link>
              <button
                onClick={() => window.print()}
                className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
              >
                Imprimir Todos los Comprobantes
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hola, {cliente?.nombre}</span>
              <Link href="/buscar" className="text-gray-700 hover:text-primary-600 flex items-center text-sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Volver
              </Link>
            </div>
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
              <span className="ml-2 font-medium">Confirmar</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${paso >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Medio de Pago</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${paso >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Datos de Tarjeta</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-2">
            {paso === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirmar Reserva</h2>
                
                <div className="mb-6">
                  <div 
                    className="h-48 bg-cover bg-center rounded-lg mb-4"
                    style={{ backgroundImage: `url(${cabana.imagen})` }}
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{cabana.nombre}</h3>
                  <p className="text-gray-600">Hasta {cabana.capacidad} personas</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Detalles de la estadía</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                      <span><strong>Check-in:</strong> {new Date(checkIn).toLocaleDateString('es-AR')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                      <span><strong>Check-out:</strong> {new Date(checkOut).toLocaleDateString('es-AR')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-primary-600" />
                      <span><strong>Huéspedes:</strong> {guests}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-7 mr-2"></span>
                      <span><strong>Noches:</strong> {noches}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Monto a abonar</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">${cabana.precio.toLocaleString('es-AR')} × {noches} {noches === 1 ? 'noche' : 'noches'}</span>
                      <span className="font-semibold text-gray-900">${subtotal.toLocaleString('es-AR')}</span>
                    </div>
                    {descuento > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>
                          Descuento {descuento === 0.15 ? 'Otoño (15%)' : descuento === 0.10 ? 'Primavera (10%)' : ''}
                        </span>
                        <span className="font-semibold">
                          -${descuentoMonto.toLocaleString('es-AR')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comisión de servicio (12%)</span>
                      <span className="font-semibold text-gray-900">${comisionServicio.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impuestos (21%)</span>
                      <span className="font-semibold text-gray-900">${impuestos.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-primary-600">${total.toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Importante:</strong> Una vez confirmada la reserva, no se podrá rechazar según las políticas del establecimiento.</span>
                  </p>
                </div>

                <button
                  onClick={handleConfirmarReserva}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center"
                >
                  Confirmar Reserva
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            )}

            {paso === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="h-6 w-6 mr-2" />
                  Seleccionar Medio de Pago
                </h2>
                <p className="text-gray-600 mb-6">Elige cómo deseas realizar el pago</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSeleccionarPago('debito')}
                    className="border-2 border-gray-300 hover:border-primary-600 rounded-xl p-6 text-left transition-all hover:shadow-lg group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">Tarjeta de Débito</h3>
                      <CreditCard className="h-8 w-8 text-gray-400 group-hover:text-primary-600 transition" />
                    </div>
                    <p className="text-sm text-gray-600">Pago inmediato con tarjeta de débito</p>
                  </button>

                  <button
                    onClick={() => handleSeleccionarPago('credito')}
                    className="border-2 border-gray-300 hover:border-primary-600 rounded-xl p-6 text-left transition-all hover:shadow-lg group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">Tarjeta de Crédito</h3>
                      <CreditCard className="h-8 w-8 text-gray-400 group-hover:text-primary-600 transition" />
                    </div>
                    <p className="text-sm text-gray-600">Pago con tarjeta de crédito</p>
                  </button>
                </div>

                <button
                  onClick={() => setPaso(1)}
                  className="mt-6 text-gray-600 hover:text-gray-800 flex items-center text-sm"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Volver
                </button>
              </div>
            )}

            {paso === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="h-6 w-6 mr-2" />
                  Datos de Tarjeta {medioPago === 'debito' ? 'de Débito' : 'de Crédito'}
                </h2>
                <form onSubmit={handleProcesarPago} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={datosTarjeta.numeroTarjeta}
                      onChange={handleInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre en la Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="nombreTarjeta"
                      value={datosTarjeta.nombreTarjeta}
                      onChange={handleInputChange}
                      required
                      placeholder="Como aparece en la tarjeta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                        value={datosTarjeta.vencimiento}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={datosTarjeta.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setPaso(2)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Procesando pago...' : 'Confirmar y Pagar'}
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

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">${cabana.precio.toLocaleString('es-AR')} × {noches} {noches === 1 ? 'noche' : 'noches'}</span>
                  <span className="font-semibold text-gray-900">${subtotal.toLocaleString('es-AR')}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Descuento {descuento === 0.15 ? 'Otoño (15%)' : descuento === 0.10 ? 'Primavera (10%)' : ''}
                    </span>
                    <span className="font-semibold">
                      -${descuentoMonto.toLocaleString('es-AR')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Comisión servicio</span>
                  <span className="font-semibold text-gray-900">${comisionServicio.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="font-semibold text-gray-900">${impuestos.toLocaleString('es-AR')}</span>
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
