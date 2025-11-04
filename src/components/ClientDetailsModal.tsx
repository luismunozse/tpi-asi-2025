'use client'

import { useEffect, useState } from 'react'
import { X, User, Mail, Phone, MapPin, Calendar, DollarSign, Users, FileText, Edit } from 'lucide-react'

interface Cliente {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  documento: string
  domicilio: {
    calle: string
    numero: string
    piso?: string
    departamento?: string
    ciudad: string
    provincia: string
  }
  fechaRegistro: string
  reservasTotales: number
  ultimaEstadia?: string
  totalGastado: number
  acompanantes?: string[]
}

interface ClientDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  cliente: Cliente | null
  onEdit?: (cliente: Cliente) => void
  onCheckIn?: (cliente: Cliente) => void
}

export default function ClientDetailsModal({ 
  isOpen, 
  onClose, 
  cliente, 
  onEdit, 
  onCheckIn 
}: ClientDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen || !cliente) return null

  const diasDesdeUltimaEstadia = cliente.ultimaEstadia 
    ? Math.ceil((new Date().getTime() - new Date(cliente.ultimaEstadia).getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {cliente.nombre} {cliente.apellido}
                </h2>
                <p className="text-primary-100">Cliente desde {new Date(cliente.fechaRegistro).toLocaleDateString('es-AR')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 transition p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <User className="h-5 w-5 text-primary-600" />
                Información Personal
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-800">{cliente.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium text-gray-800">{cliente.telefono}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Documento</p>
                    <p className="font-medium text-gray-800">DNI: {cliente.documento}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Domicilio */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary-600" />
                Domicilio
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-800">
                  {cliente.domicilio.calle} {cliente.domicilio.numero}
                  {cliente.domicilio.piso && `, Piso ${cliente.domicilio.piso}`}
                  {cliente.domicilio.departamento && `, Dto. ${cliente.domicilio.departamento}`}
                </p>
                <p className="text-gray-600">
                  {cliente.domicilio.ciudad}, {cliente.domicilio.provincia}
                </p>
              </div>
            </div>

            {/* Historial de Reservas */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-600" />
                Historial de Reservas
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{cliente.reservasTotales}</p>
                  <p className="text-sm text-blue-800">Reservas Totales</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    ${(cliente.totalGastado / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-green-800">Total Gastado</p>
                </div>
              </div>

              {cliente.ultimaEstadia && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Última Estadía</p>
                  <p className="font-medium text-gray-800">
                    {new Date(cliente.ultimaEstadia).toLocaleDateString('es-AR')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {diasDesdeUltimaEstadia === 0 
                      ? 'Hoy' 
                      : diasDesdeUltimaEstadia === 1 
                        ? 'Ayer' 
                        : `Hace ${diasDesdeUltimaEstadia} días`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Acompañantes */}
            {cliente.acompanantes && cliente.acompanantes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-600" />
                  Acompañantes Frecuentes
                </h3>
                
                <div className="space-y-2">
                  {cliente.acompanantes.map((acompanante, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{acompanante}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Cliente registrado el {new Date(cliente.fechaRegistro).toLocaleDateString('es-AR')}
          </div>
          <div className="flex gap-3">
            {onEdit && (
              <button
                onClick={() => onEdit(cliente)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
            )}
            {onCheckIn && (
              <button
                onClick={() => onCheckIn(cliente)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Check-in
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

