# 🚀 Inicio Rápido - Estancia del Carmen

## Instalación en 3 Pasos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar el Proyecto
```bash
npm run dev
```

### 3. Abrir en el Navegador
```
http://localhost:3000
```

## 🎯 Rutas Principales

### Para Clientes (Público)
- **Inicio:** http://localhost:3000
- **Buscar Cabañas:** http://localhost:3000/buscar
- **Realizar Reserva:** http://localhost:3000/reservar

### Para Personal (Requiere Login)
- **Login:** http://localhost:3000/login

#### Después de Login:
- **Gerente:** http://localhost:3000/dashboard/gerente
- **Recepción:** http://localhost:3000/dashboard/recepcion
- **Mantenimiento:** http://localhost:3000/dashboard/mantenimiento

## 👤 Credenciales de Acceso

```
Gerente:
Usuario: admin
Contraseña: admin123

Recepcionista:
Usuario: recepcion
Contraseña: recep456

Mantenimiento:
Usuario: mantenimiento
Contraseña: manten789
```

## 📱 Funcionalidades por Rol

### 🏢 GERENTE
✅ Dashboard con métricas de ocupación e ingresos  
✅ Gestión completa de cabañas  
✅ Configuración de precios por temporada  
✅ Análisis de rentabilidad  
✅ Configuración del sistema  

**Acceso directo:** Login → Panel de Gerente → Ver todas las secciones

### 👥 RECEPCIONISTA
✅ Realizar check-in de huéspedes  
✅ Registrar clientes nuevos  
✅ Buscar reservas  
✅ Asignar cabañas  
✅ Ver estado de reservas  

**Flujo de trabajo típico:**
1. Login como recepcionista
2. Click en "Realizar Check-in"
3. Buscar por número de reserva (ej: #EDC-001234)
4. Completar datos del cliente
5. Asignar cabaña
6. Confirmar check-in

### 🧹 MANTENIMIENTO
✅ Ver lista de tareas de limpieza  
✅ Marcar tareas como en progreso  
✅ Completar tareas  
✅ Ver checklist de limpieza estándar  

**Flujo de trabajo típico:**
1. Login como mantenimiento
2. Ver lista de tareas del día
3. Click en "Iniciar" para comenzar limpieza
4. Seguir checklist
5. Click en "Completar" al terminar

## 🧪 Probar el Sistema

### Escenario 1: Reserva como Cliente
1. Ir a http://localhost:3000
2. En el buscador, ingresar:
   - Check-in: (fecha futura)
   - Check-out: (fecha posterior)
   - Pasajeros: 4
3. Click en "Buscar Disponibilidad"
4. Seleccionar una cabaña
5. Click en "Reservar"
6. Completar formulario de datos personales
7. Click en "Continuar al Pago"
8. Ingresar datos de tarjeta (simulado)
9. Click en "Confirmar y Pagar"
10. ¡Reserva completada!

### Escenario 2: Check-in como Recepcionista
1. Login: usuario `recepcion`, contraseña `recep456`
2. En el dashboard, click en "Realizar Check-in"
3. Buscar reserva: ingresar `#EDC-001234`
4. Click en "Buscar"
5. Si el cliente no existe:
   - Completar formulario de registro
   - Click en "Guardar y Continuar"
6. Agregar acompañantes (opcional)
7. Seleccionar cabaña disponible
8. Click en "Completar Check-in"
9. ¡Check-in realizado!

### Escenario 3: Configurar Precios como Gerente
1. Login: usuario `admin`, contraseña `admin123`
2. En el menú lateral, click en "Precios y Tarifas"
3. Click en "Editar Precios"
4. Modificar precios según temporada
5. Click en "Guardar Cambios"
6. ¡Precios actualizados!

### Escenario 4: Gestionar Limpieza
1. Login: usuario `mantenimiento`, contraseña `manten789`
2. Ver lista de tareas pendientes
3. Click en "Iniciar" en una tarea
4. Revisar checklist de limpieza
5. Click en "Completar" al terminar
6. La cabaña queda disponible

## 🎨 Características del Diseño

- ✨ **Diseño Moderno:** Interfaz limpia y profesional
- 📱 **Responsive:** Funciona en móviles, tablets y desktop
- 🎯 **Intuitivo:** Navegación clara y fácil de usar
- ⚡ **Rápido:** Carga instantánea sin base de datos
- 🔒 **Seguro:** Validación de contraseñas y control de acceso

## 🛠️ Solución de Problemas

### El servidor no inicia
```bash
# Eliminar node_modules e instalar de nuevo
rm -rf node_modules
npm install
npm run dev
```

### Error de puerto en uso
```bash
# El puerto 3000 está ocupado, usar otro:
npm run dev -- -p 3001
```

### Estilos no se cargan
```bash
# Verificar que Tailwind esté configurado
npm run dev
# Refrescar el navegador (Ctrl + Shift + R)
```

## 📚 Recursos Adicionales

- **README completo:** Ver `README.md` para documentación detallada
- **Estructura del proyecto:** Ver árbol de archivos en README
- **Tecnologías usadas:** Next.js 14, React, TypeScript, Tailwind CSS

## 💡 Tips Útiles

1. **Modo oscuro del navegador:** El sistema se adapta automáticamente
2. **Datos de prueba:** Todos los datos son simulados y no se guardan
3. **Sesión:** Se guarda en localStorage, persiste al refrescar
4. **Cerrar sesión:** Click en "Cerrar Sesión" en el menú lateral
5. **Volver al inicio:** Click en "Estancia del Carmen" o "Ver sitio público"

## 🎓 Para Desarrollo

### Agregar nuevas páginas
1. Crear archivo en `src/app/nueva-pagina/page.tsx`
2. Usar componentes de React
3. Aplicar estilos con Tailwind CSS

### Modificar estilos
- Editar `src/app/globals.css` para estilos globales
- Usar clases de Tailwind en los componentes
- Configuración en `tailwind.config.js`

### Agregar iconos
```tsx
import { NombreIcono } from 'lucide-react'
<NombreIcono className="h-5 w-5" />
```

## ✅ Lista de Verificación

Antes de presentar el proyecto, verifica:

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona correctamente
- [ ] Página principal carga en http://localhost:3000
- [ ] Login funciona con las 3 credenciales
- [ ] Búsqueda de cabañas muestra resultados
- [ ] Proceso de reserva completo funciona
- [ ] Check-in se puede completar
- [ ] Los 3 dashboards son accesibles
- [ ] Diseño responsive en móvil

## 🎉 ¡Listo!

Tu sistema está funcionando. Explora todas las funcionalidades y disfruta del mockup.

Para más información, consulta el **README.md** principal.


