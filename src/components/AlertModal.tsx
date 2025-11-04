'use client'

import { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  showCancel = false,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}: AlertModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />
      case 'error':
        return <XCircle className="h-8 w-8 text-red-600" />
      case 'warning':
        return <AlertCircle className="h-8 w-8 text-yellow-600" />
      default:
        return <Info className="h-8 w-8 text-blue-600" />
    }
  }

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'error':
        return 'bg-red-100'
      case 'warning':
        return 'bg-yellow-100'
      default:
        return 'bg-blue-100'
    }
  }

  const getButtonStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white'
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white'
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getIconBg()}`}>
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-6 py-2 rounded-lg transition font-medium ${getButtonStyle()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook para usar el modal fácilmente
export const useAlert = () => {
  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    options?: {
      showCancel?: boolean
      confirmText?: string
      cancelText?: string
      onConfirm?: () => void
      onCancel?: () => void
    }
  ) => {
    // Esta función se implementará en el componente padre
    console.log('Alert:', { title, message, type, options })
  }

  return { showAlert }
}

