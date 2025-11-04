'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { ArrowLeft, Save, User, Mail, Phone, MapPin, FileText } from 'lucide-react'

export default function NuevoCliente() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento: '',
    domicilio: {
      calle: '',
      numero: '',
      piso: '',
      departamento: '',
      ciudad: 'San Carlos de Bariloche',
      provincia: 'Río Negro'
    }
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(user)
    if (userData.role !== 'recepcionista') {
      router.push('/login')
      return
    }
    setLoading(false)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('domicilio.')) {
      const domicilioField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        domicilio: {
          ...prev.domicilio,
          [domicilioField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Aquí iría la lógica real de guardado
      console.log('Nuevo cliente:', formData)
      
      // Redirigir a la lista de clientes
      router.push('/dashboard/recepcion/clientes')
    } catch (error) {
      console.error('Error al guardar cliente:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <DashboardLayout role="recepcionista">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Nuevo Cliente</h1>
            <p className="text-gray-600 mt-1">Registra un nuevo cliente en el sistema</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-600" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="Ingrese el nombre"
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
                    placeholder="Ingrese el apellido"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Documento *
                  </label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="DNI sin puntos ni guiones"
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-600" />
                Información de Contacto
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="cliente@email.com"
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
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>
              </div>
            </div>

            {/* Domicilio */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                Domicilio
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calle *
                  </label>
                  <input
                    type="text"
                    name="domicilio.calle"
                    value={formData.domicilio.calle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="Nombre de la calle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    name="domicilio.numero"
                    value={formData.domicilio.numero}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Piso
                  </label>
                  <input
                    type="text"
                    name="domicilio.piso"
                    value={formData.domicilio.piso}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    name="domicilio.departamento"
                    value={formData.domicilio.departamento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    placeholder="A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad *
                  </label>
                  <select
                    name="domicilio.ciudad"
                    value={formData.domicilio.ciudad}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  >
                    <option value="San Carlos de Bariloche">San Carlos de Bariloche</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Rosario">Rosario</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="La Plata">La Plata</option>
                    <option value="Tucumán">Tucumán</option>
                    <option value="Mar del Plata">Mar del Plata</option>
                    <option value="Salta">Salta</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="San Juan">San Juan</option>
                    <option value="Resistencia">Resistencia</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Posadas">Posadas</option>
                    <option value="San Salvador de Jujuy">San Salvador de Jujuy</option>
                    <option value="Paraná">Paraná</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Rawson">Rawson</option>
                    <option value="Viedma">Viedma</option>
                    <option value="Santa Rosa">Santa Rosa</option>
                    <option value="Ushuaia">Ushuaia</option>
                    <option value="San Luis">San Luis</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Río Gallegos">Río Gallegos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <select
                    name="domicilio.provincia"
                    value={formData.domicilio.provincia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  >
                    <option value="Río Negro">Río Negro</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Tucumán">Tucumán</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Chubut">Chubut</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="San Luis">San Luis</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cliente
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

