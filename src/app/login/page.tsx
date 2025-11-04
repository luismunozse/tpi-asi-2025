'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validatePassword = (pwd: string): boolean => {
    // Validar longitud (8-12 caracteres)
    if (pwd.length < 8 || pwd.length > 12) {
      setError('La contraseña debe tener entre 8 y 12 caracteres')
      return false
    }

    // Validar que al menos 2 caracteres sean números
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
    
    if (!username) {
      setError('Por favor ingrese su usuario')
      return
    }

    if (!password) {
      setError('Por favor ingrese su contraseña')
      return
    }

    if (!validatePassword(password)) {
      return
    }

    setLoading(true)

    // Simulación de autenticación
    setTimeout(() => {
      // Credenciales de ejemplo
      const users = {
        'admin': { password: 'admin123', role: 'gerente', redirect: '/dashboard/gerente' },
        'recepcion': { password: 'recep456', role: 'recepcionista', redirect: '/dashboard/recepcion' },
        'mantenimiento': { password: 'manten789', role: 'mantenimiento', redirect: '/dashboard/mantenimiento' }
      }

      const user = users[username as keyof typeof users]
      
      if (user && user.password === password) {
        // Guardar sesión en localStorage
        localStorage.setItem('user', JSON.stringify({ username, role: user.role }))
        window.location.href = user.redirect
      } else {
        setError('Usuario o contraseña incorrectos')
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:opacity-80 transition mb-4">
            <Home className="h-10 w-10" />
            <span className="text-2xl font-bold">Estancia del Carmen</span>
          </Link>
          <h2 className="text-white text-xl mt-2">Acceso al Sistema de Gestión</h2>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 rounded-full p-4">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Iniciar Sesión
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="Ingrese su contraseña"
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
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Usuarios de prueba:
            </p>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p><strong>admin</strong> / admin123 (Gerente)</p>
              <p><strong>recepcion</strong> / recep456 (Recepcionista)</p>
              <p><strong>mantenimiento</strong> / manten789 (Mantenimiento)</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

