# Sistema de Gestión - Estancia del Carmen

Sistema web completo de gestión para el complejo de cabañas "Estancia del Carmen" en San Carlos de Bariloche, desarrollado con Next.js 14, React y TypeScript.

## 🏔️ Descripción del Proyecto

Este sistema integral permite gestionar todas las operaciones del complejo de cabañas, incluyendo:

- **Sitio público** para clientes con búsqueda y reserva de cabañas
- **Panel de recepción** para check-in y gestión de huéspedes
- **Panel de gerencia** para administración completa del complejo
- **Panel de mantenimiento** para gestión de limpieza y tareas

## ✨ Características Principales

### Funcionalidades Públicas
- 🏠 Página principal moderna y atractiva
- 🔍 Búsqueda de cabañas por fechas y cantidad de pasajeros
- 📅 Sistema de reservas en línea
- 💳 Procesamiento de pagos (simulado)
- ✉️ Confirmación de reserva por email

### Panel de Recepción
- ✅ Proceso completo de check-in
- 👥 Registro de clientes nuevos con todos sus datos
- 📝 Registro de acompañantes
- 🔑 Asignación de cabañas
- 🔍 Búsqueda de reservas por número o nombre

### Panel de Gerencia
- 📊 Dashboard con métricas y estadísticas
- 🏘️ Gestión completa de cabañas
- 💰 Configuración de precios por temporada
- 📈 Análisis de ocupación y rentabilidad
- ⚙️ Configuración del sistema

### Panel de Mantenimiento
- 🧹 Lista de tareas de limpieza
- ✔️ Checklist de limpieza estándar
- 📋 Estado de cabañas
- ⏱️ Control de tiempos y prioridades

## 🔐 Sistema de Autenticación

El sistema incluye validación de contraseñas con los siguientes requisitos:
- Longitud: 8-12 caracteres
- Al menos 2 números
- Control de acceso por roles

### Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Gerente |
| recepcion | recep456 | Recepcionista |
| mantenimiento | manten789 | Mantenimiento |

## 🎨 Tecnologías Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **UI/UX:** Diseño responsive y moderno

## 📦 Instalación

### Requisitos Previos
- Node.js 18.x o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd mockup-tp-asi-2025
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🚀 Comandos Disponibles

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm run start

# Linter
npm run lint
```

## 📁 Estructura del Proyecto

```
mockup-tp-asi-2025/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Página principal pública
│   │   ├── login/                      # Sistema de autenticación
│   │   ├── buscar/                     # Búsqueda de cabañas
│   │   ├── reservar/                   # Proceso de reserva
│   │   └── dashboard/
│   │       ├── gerente/               # Panel de gerencia
│   │       │   ├── page.tsx
│   │       │   ├── cabanas/
│   │       │   └── precios/
│   │       ├── recepcion/             # Panel de recepción
│   │       │   ├── page.tsx
│   │       │   └── checkin/
│   │       └── mantenimiento/         # Panel de mantenimiento
│   │           └── page.tsx
│   ├── components/
│   │   └── DashboardLayout.tsx        # Layout común para dashboards
│   └── app/
│       ├── layout.tsx
│       └── globals.css
├── public/                             # Archivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 Módulos Principales

### 1. Página Principal (/)
- Hero section atractivo
- Buscador de cabañas
- Información del complejo
- Sección de contacto

### 2. Sistema de Login (/login)
- Validación de credenciales
- Validación de contraseñas según requisitos
- Redirección según rol de usuario

### 3. Búsqueda de Cabañas (/buscar)
- Filtrado por capacidad
- Visualización de cabañas disponibles
- Información detallada de cada cabaña
- Precios y servicios

### 4. Proceso de Reserva (/reservar)
- **Paso 1:** Datos personales del cliente
- **Paso 2:** Información de pago
- **Paso 3:** Confirmación de reserva
- Resumen lateral con detalles

### 5. Dashboard de Gerente (/dashboard/gerente)
- Métricas de ocupación e ingresos
- Gráficos de rendimiento
- Gestión de cabañas
- Configuración de precios por temporada:
  - Temporada Alta
  - Temporada Media
  - Temporada Baja
  - Tarifa especial Booking

### 6. Dashboard de Recepción (/dashboard/recepcion)
- Check-ins programados
- Proceso de check-in completo:
  - Búsqueda de reserva
  - Verificación/Registro de cliente
  - Registro de acompañantes
  - Asignación de cabaña
  - Confirmación

### 7. Dashboard de Mantenimiento (/dashboard/mantenimiento)
- Lista de tareas de limpieza
- Estados: Pendiente, En Progreso, Completado
- Checklist de limpieza estándar
- Prioridades de tareas

## 💾 Datos Simulados

El mockup utiliza datos simulados en el cliente. En una implementación real, estos datos se conectarían a un backend con base de datos.

### Tipos de Cabañas
1. **Cabaña Familiar** - Capacidad: 6 personas
2. **Cabaña Romántica** - Capacidad: 2 personas
3. **Cabaña Grande** - Capacidad: 8 personas
4. **Cabaña Standard** - Capacidad: 4 personas

### Temporadas
- **Temporada Alta:** Diciembre - Febrero (verano)
- **Temporada Media:** Marzo - Mayo, Septiembre - Noviembre
- **Temporada Baja:** Junio - Agosto (invierno)

## 🎨 Diseño y UX

- **Diseño responsive:** Funciona en desktop, tablet y móvil
- **Paleta de colores:** Azules (primary) con acentos
- **Tipografía:** Sistema de fuentes del sistema
- **Iconografía:** Lucide React para iconos consistentes
- **Feedback visual:** Estados de carga, confirmaciones, alertas

## 📝 Requisitos Implementados

### Caso de Uso: Reservas
✅ Búsqueda por fechas y cantidad de pasajeros  
✅ Consulta de disponibilidad  
✅ Cálculo de costos  
✅ Registro de datos personales completos  
✅ Pago con tarjeta (simulado)  
✅ Confirmación de reserva  
✅ Las reservas confirmadas no se pueden rechazar  

### Caso de Uso: Check-in
✅ Búsqueda por número de reserva o nombre  
✅ Verificación de identidad  
✅ Registro de cliente nuevo si no existe  
✅ Captura de todos los datos requeridos:
  - Nombre, apellido, teléfono, email
  - Domicilio completo (calle, número, piso, depto)
  - Ciudad y provincia  
✅ Registro de pasajeros acompañantes  
✅ Asignación de cabaña  
✅ Confirmación de check-in  

### Caso de Uso: Gestión de Cabañas
✅ Visualización de todas las cabañas  
✅ Estados: Disponible, Ocupada, En Limpieza  
✅ Información completa de cada cabaña  

### Caso de Uso: Mantenimiento
✅ Lista de tareas de limpieza  
✅ Cambio de estados de tareas  
✅ Checklist de limpieza estándar  

### Caso de Uso: Precios
✅ Configuración de precios por temporada  
✅ Tarifas especiales (Booking)  
✅ Edición de precios en tiempo real  

### Requisitos de Sistema
✅ Interfaz web responsive  
✅ Accesible desde cualquier dispositivo  
✅ Sistema de autenticación con validación  
✅ Contraseñas: 8-12 caracteres, mínimo 2 números  
✅ Control de acceso por roles  

## 🔄 Flujos de Trabajo Principales

### Flujo de Reserva Online
1. Cliente busca cabañas por fechas y pasajeros
2. Sistema muestra cabañas disponibles
3. Cliente selecciona cabaña y completa datos
4. Cliente ingresa datos de pago
5. Sistema procesa pago
6. Sistema confirma reserva
7. Cliente recibe confirmación

### Flujo de Check-in
1. Recepcionista busca reserva
2. Sistema verifica existencia de cliente
3. Si no existe: registrar cliente nuevo
4. Registrar acompañantes (opcional)
5. Asignar cabaña disponible
6. Confirmar check-in
7. Entregar llaves

### Flujo de Limpieza
1. Huéspedes hacen check-out
2. Sistema genera tarea de limpieza
3. Personal de mantenimiento ve tarea
4. Marca tarea como "En Progreso"
5. Realiza limpieza según checklist
6. Marca tarea como "Completada"
7. Cabaña queda disponible

## 🚧 Próximas Mejoras Sugeridas

Para una implementación completa en producción:

- [ ] Integración con backend (API REST o GraphQL)
- [ ] Base de datos (PostgreSQL, MongoDB)
- [ ] Autenticación real con JWT o NextAuth
- [ ] Pasarela de pagos real (Stripe, MercadoPago)
- [ ] Sistema de emails transaccionales
- [ ] Calendario interactivo de disponibilidad
- [ ] Sistema de reportes y exportación
- [ ] Gestión de empleados y turnos
- [ ] Sistema de inventario
- [ ] Integración real con Booking.com API
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Sistema de valoraciones
- [ ] Multi-idioma (i18n)

## 📄 Licencia

Este proyecto es un mockup educativo desarrollado para el curso de Análisis de Sistemas de Información 2025.

## 👥 Autor

Desarrollado como proyecto académico para Estancia del Carmen - San Carlos de Bariloche.

## 📞 Soporte

Para consultas sobre el proyecto, contactar al equipo de desarrollo del curso.

---

**Nota:** Este es un sistema mockup con datos simulados. No incluye backend real ni procesamiento de pagos real. Está diseñado para demostrar la interfaz de usuario y flujos de trabajo del sistema propuesto.


