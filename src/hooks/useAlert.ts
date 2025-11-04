'use client'

import { useState } from 'react'

interface AlertOptions {
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertOptions | null>(null)

  const showAlert = (options: AlertOptions) => {
    setAlert(options)
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const showSuccess = (title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      title,
      message,
      type: 'success',
      onConfirm
    })
  }

  const showError = (title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      title,
      message,
      type: 'error',
      onConfirm
    })
  }

  const showWarning = (title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      title,
      message,
      type: 'warning',
      onConfirm
    })
  }

  const showInfo = (title: string, message: string, onConfirm?: () => void) => {
    showAlert({
      title,
      message,
      type: 'info',
      onConfirm
    })
  }

  const showConfirm = (
    title: string, 
    message: string, 
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showAlert({
      title,
      message,
      type: 'warning',
      showCancel: true,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm,
      onCancel
    })
  }

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  }
}

