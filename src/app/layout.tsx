import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Estancia del Carmen - Sistema de Gestión',
  description: 'Sistema de gestión para el complejo de cabañas Estancia del Carmen en San Carlos de Bariloche',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}


