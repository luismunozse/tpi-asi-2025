'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, LogOut, Menu, X, Calendar, Users, Key, Settings, DollarSign, ClipboardList } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'gerente' | 'recepcionista' | 'mantenimiento'
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const menuItems = {
    gerente: [
      { icon: Home, label: 'Dashboard', href: '/dashboard/gerente' },
      { icon: Calendar, label: 'Reservas', href: '/dashboard/gerente/reservas' },
      { icon: Key, label: 'Cabañas', href: '/dashboard/gerente/cabanas' },
      { icon: DollarSign, label: 'Precios y Tarifas', href: '/dashboard/gerente/precios' },
      { icon: Users, label: 'Clientes', href: '/dashboard/gerente/clientes' },
      { icon: Settings, label: 'Configuración', href: '/dashboard/gerente/configuracion' },
    ],
    recepcionista: [
      { icon: Home, label: 'Dashboard', href: '/dashboard/recepcion' },
      { icon: Calendar, label: 'Reservas', href: '/dashboard/recepcion/reservas' },
      { icon: ClipboardList, label: 'Check-in', href: '/dashboard/recepcion/checkin' },
      { icon: Users, label: 'Clientes', href: '/dashboard/recepcion/clientes' },
      { icon: Key, label: 'Cabañas', href: '/dashboard/recepcion/cabanas' },
    ],
    mantenimiento: [
      { icon: Home, label: 'Dashboard', href: '/dashboard/mantenimiento' },
      { icon: Key, label: 'Estado de Cabañas', href: '/dashboard/mantenimiento/cabanas' },
      { icon: ClipboardList, label: 'Tareas', href: '/dashboard/mantenimiento/tareas' },
    ],
  }

  const currentMenuItems = menuItems[role]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-primary-900 text-white transform transition-transform duration-300 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-primary-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Estancia del Carmen</h1>
              <p className="text-sm text-primary-300 capitalize">{role}</p>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {currentMenuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-800 transition"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-800">
          {user && (
            <div className="mb-3 px-4">
              <p className="text-sm text-primary-300">Usuario</p>
              <p className="font-semibold">{user.username}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-800 transition text-red-300 hover:text-red-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              Panel de {role}
            </h2>
            <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
              Ver sitio público
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}


