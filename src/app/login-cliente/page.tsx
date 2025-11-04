'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Lock, User, AlertCircle, Eye, EyeOff, Mail, Phone, MapPin, UserPlus, Zap } from 'lucide-react'

export default function LoginClientePage() {
  const router = useRouter()
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Inicializar usuario de prueba al cargar la página
  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    const usuarioPrueba = {
      id: 999999,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'cliente@test.com',
      password: 'cliente123',
      telefono: '+54 294 123-4567',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      calle: 'Av. Bustillo',
      numero: '1234',
      piso: '2',
      departamento: 'A',
      ciudad: 'San Carlos de Bariloche',
      provincia: 'Río Negro'
    }

    // Solo crear si no existe ya
    const existeUsuarioPrueba = clientes.find((c: any) => c.email === usuarioPrueba.email)
    if (!existeUsuarioPrueba) {
      clientes.push(usuarioPrueba)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }
  }, [])

  // Estado para login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Estado para registro
  const [registroData, setRegistroData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    ciudad: '',
    provincia: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatePassword = (pwd: string): boolean => {
    if (pwd.length < 8 || pwd.length > 12) {
      setError('La contraseña debe tener entre 8 y 12 caracteres')
      return false
    }
    const numberCount = (pwd.match(/\d/g) || []).length
    if (numberCount < 2) {
      setError('La contraseña debe contener al menos 2 números')
      return false
    }
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!loginData.email || !loginData.password) {
      setError('Por favor complete todos los campos')
      return
    }

    if (!validatePassword(loginData.password)) {
      return
    }

    setLoading(true)

    // Simular autenticación
    setTimeout(() => {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const cliente = clientes.find((c: any) => 
        c.email === loginData.email && c.password === loginData.password
      )

      if (cliente) {
        // Guardar sesión de cliente
        localStorage.setItem('cliente', JSON.stringify({
          id: cliente.id,
          email: cliente.email,
          nombre: cliente.nombre,
          apellido: cliente.apellido
        }))
        router.push('/buscar')
      } else {
        setError('Email o contraseña incorrectos')
        setLoading(false)
      }
    }, 1000)
  }

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!registroData.nombre || !registroData.apellido || !registroData.email || 
        !registroData.password || !registroData.confirmPassword || !registroData.telefono ||
        !registroData.tipoDocumento || !registroData.numeroDocumento || !registroData.calle || !registroData.numero ||
        !registroData.ciudad || !registroData.provincia) {
      setError('Por favor complete todos los campos obligatorios')
      return
    }

    if (registroData.password !== registroData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!validatePassword(registroData.password)) {
      return
    }

    setLoading(true)

    // Simular registro
    setTimeout(() => {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      
      // Verificar si el email ya existe
      if (clientes.some((c: any) => c.email === registroData.email)) {
        setError('Este email ya está registrado')
        setLoading(false)
        return
      }

      // Crear nuevo cliente
      const nuevoCliente = {
        id: Date.now(),
        ...registroData,
        password: registroData.password // En producción, esto debería estar hasheado
      }

      clientes.push(nuevoCliente)
      localStorage.setItem('clientes', JSON.stringify(clientes))

      // Auto-login después del registro
      localStorage.setItem('cliente', JSON.stringify({
        id: nuevoCliente.id,
        email: nuevoCliente.email,
        nombre: nuevoCliente.nombre,
        apellido: nuevoCliente.apellido
      }))

      router.push('/buscar')
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, tipo: 'login' | 'registro') => {
    const value = e.target.value
    if (tipo === 'login') {
      setLoginData({ ...loginData, [e.target.name]: value })
    } else {
      setRegistroData({ ...registroData, [e.target.name]: value })
    }
  }

  // Login rápido con usuario de prueba
  const handleLoginRapido = () => {
    setLoginData({
      email: 'cliente@test.com',
      password: 'cliente123'
    })
    
    setLoading(true)
    setTimeout(() => {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const cliente = clientes.find((c: any) => c.email === 'cliente@test.com')
      
      if (cliente) {
        localStorage.setItem('cliente', JSON.stringify({
          id: cliente.id,
          email: cliente.email,
          nombre: cliente.nombre,
          apellido: cliente.apellido
        }))
        router.push('/buscar')
      } else {
        setLoading(false)
        setError('Usuario de prueba no encontrado')
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:opacity-80 transition mb-4">
            <Home className="h-10 w-10" />
            <span className="text-2xl font-bold">Estancia del Carmen</span>
          </Link>
          <h2 className="text-white text-xl mt-2">
            {modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl p-4 flex gap-2 mb-0">
          <button
            onClick={() => {
              setModo('login')
              setError('')
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              modo === 'login'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => {
              setModo('registro')
              setError('')
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              modo === 'registro'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {modo === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => handleInputChange(e, 'login')}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e, 'login')}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  La contraseña debe tener entre 8 y 12 caracteres con al menos 2 números
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLoginRapido}
                disabled={loading}
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Zap className="h-5 w-5 mr-2" />
                {loading ? 'Iniciando sesión...' : 'Login Rápido (Usuario de Prueba)'}
              </button>

              <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-xs text-primary-800 text-center">
                  <strong>Usuario de prueba:</strong> cliente@test.com / cliente123
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegistro} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={registroData.nombre}
                    onChange={(e) => handleInputChange(e, 'registro')}
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
                    value={registroData.apellido}
                    onChange={(e) => handleInputChange(e, 'registro')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={registroData.email}
                  onChange={(e) => handleInputChange(e, 'registro')}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={registroData.telefono}
                    onChange={(e) => handleInputChange(e, 'registro')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento *
                  </label>
                  <select
                    name="tipoDocumento"
                    value={registroData.tipoDocumento}
                    onChange={(e) => handleInputChange(e, 'registro')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Cédula">Cédula</option>
                    
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Documento *
                </label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={registroData.numeroDocumento}
                  onChange={(e) => handleInputChange(e, 'registro')}
                  required
                  placeholder="Ingrese el número de documento"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={registroData.password}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={registroData.confirmPassword}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                La contraseña debe tener entre 8 y 12 caracteres con al menos 2 números
              </p>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
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
                      value={registroData.calle}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número *
                    </label>
                    <input
                      type="text"
                      name="numero"
                      value={registroData.numero}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                      value={registroData.piso}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento
                    </label>
                    <input
                      type="text"
                      name="departamento"
                      value={registroData.departamento}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
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
                      value={registroData.ciudad}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provincia *
                    </label>
                    <input
                      type="text"
                      name="provincia"
                      value={registroData.provincia}
                      onChange={(e) => handleInputChange(e, 'registro')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  'Registrando...'
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-primary-600 hover:underline text-sm">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

