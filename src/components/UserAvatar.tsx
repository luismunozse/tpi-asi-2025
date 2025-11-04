'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, LogOut, ChevronDown } from 'lucide-react'

export default function UserAvatar() {
  const router = useRouter()
  const [cliente, setCliente] = useState<any>(null)
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Verificar si hay un cliente logueado
    const clienteData = localStorage.getItem('cliente')
    if (clienteData) {
      setCliente(JSON.parse(clienteData))
    }

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const clienteData = localStorage.getItem('cliente')
      if (clienteData) {
        setCliente(JSON.parse(clienteData))
      } else {
        setCliente(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Verificar periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(() => {
      const clienteData = localStorage.getItem('cliente')
      if (clienteData) {
        setCliente(JSON.parse(clienteData))
      } else {
        setCliente(null)
      }
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownAbierto(false)
      }
    }

    if (dropdownAbierto) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownAbierto])

  const handleLogout = () => {
    localStorage.removeItem('cliente')
    setCliente(null)
    setDropdownAbierto(false)
    router.push('/')
    // Recargar para actualizar el header en todas las páginas
    window.location.reload()
  }

  const getIniciales = () => {
    if (!cliente) return 'U'
    const nombre = cliente.nombre || ''
    const apellido = cliente.apellido || ''
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
  }

  if (!cliente) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownAbierto(!dropdownAbierto)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-sm">
          {getIniciales()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-gray-800">
            {cliente.nombre} {cliente.apellido}
          </div>
          <div className="text-xs text-gray-500">
            {cliente.email}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownAbierto ? 'rotate-180' : ''}`} />
      </button>

      {dropdownAbierto && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                {getIniciales()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {cliente.nombre} {cliente.apellido}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {cliente.email}
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <Link
              href="/buscar"
              onClick={() => setDropdownAbierto(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <User className="h-4 w-4" />
              Mis Reservas
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

