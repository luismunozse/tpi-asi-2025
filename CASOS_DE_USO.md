# 📋 Casos de Uso - Sistema Estancia del Carmen

## Actores del Sistema

### 👤 Cliente (Usuario Público)
Persona que desea reservar una cabaña en el complejo.

### 👨‍💼 Gerente
Administrador del complejo, tiene acceso completo al sistema.

### 👩‍💻 Recepcionista
Personal de recepción encargado de check-in/check-out y atención al cliente.

### 🧹 Personal de Mantenimiento
Encargado de limpieza y mantenimiento de las cabañas.

---

## 🌐 Casos de Uso - Cliente

### CU-01: Buscar Cabañas Disponibles

**Actor:** Cliente

**Precondiciones:** Ninguna

**Flujo Principal:**
1. Cliente accede al sitio web
2. Cliente ingresa fechas de check-in y check-out
3. Cliente selecciona cantidad de pasajeros
4. Cliente hace clic en "Buscar Disponibilidad"
5. Sistema consulta disponibilidad
6. Sistema muestra cabañas disponibles con:
   - Nombre de la cabaña
   - Capacidad
   - Habitaciones y baños
   - Servicios incluidos
   - Precio por noche
   - Foto de la cabaña
7. Cliente puede ver detalles de cada cabaña

**Postcondiciones:** Cliente visualiza cabañas disponibles

**Flujos Alternativos:**
- **5a:** No hay cabañas disponibles
  - Sistema muestra mensaje "No hay cabañas disponibles para X pasajeros"
  - Cliente puede modificar búsqueda

---

### CU-02: Realizar Reserva Online

**Actor:** Cliente

**Precondiciones:** 
- Cliente ha buscado cabañas
- Existe al menos una cabaña disponible

**Flujo Principal:**
1. Cliente selecciona una cabaña
2. Cliente hace clic en "Reservar"
3. Sistema muestra formulario de datos personales
4. Cliente completa:
   - Nombre y apellido
   - Email y teléfono
   - Documento de identidad
   - Domicilio completo (calle, número, piso, depto, ciudad, provincia)
5. Cliente hace clic en "Continuar al Pago"
6. Sistema muestra formulario de pago
7. Cliente selecciona tipo de tarjeta (crédito/débito)
8. Cliente ingresa:
   - Número de tarjeta
   - Nombre en la tarjeta
   - Fecha de vencimiento
   - CVV
9. Sistema muestra advertencia: "Una vez confirmada, la reserva no podrá ser rechazada"
10. Cliente hace clic en "Confirmar y Pagar"
11. Sistema procesa el pago
12. Sistema genera número de reserva único (#EDC-XXXXXX)
13. Sistema registra la reserva en el sistema
14. Sistema muestra confirmación con:
    - Número de reserva
    - Detalles de la reserva
    - Total pagado
15. Sistema envía email de confirmación al cliente

**Postcondiciones:** 
- Reserva registrada en el sistema
- Cliente recibe confirmación por email
- Cabaña queda reservada para esas fechas

**Flujos Alternativos:**
- **11a:** Error en el procesamiento de pago
  - Sistema muestra mensaje de error
  - Cliente puede reintentar o usar otra tarjeta

---

## 🏢 Casos de Uso - Recepcionista

### CU-03: Realizar Check-in

**Actor:** Recepcionista

**Precondiciones:** 
- Recepcionista ha iniciado sesión
- Existe una reserva confirmada

**Flujo Principal:**
1. Recepcionista accede a módulo de Check-in
2. Recepcionista solicita al huésped su número de reserva o nombre completo
3. Recepcionista busca la reserva en el sistema
4. Sistema verifica y muestra datos de la reserva
5. Sistema verifica si el cliente está registrado en el sistema
6. **Si cliente YA existe:**
   - Sistema muestra datos del cliente
   - Recepcionista verifica identidad con documento
   - **Ir al paso 13**
7. **Si cliente NO existe:**
   - Sistema muestra mensaje "Cliente no registrado"
   - Sistema muestra formulario de registro
8. Recepcionista solicita documentación al cliente
9. Recepcionista completa datos del cliente:
   - Nombre y apellido
   - Email y teléfono
   - Documento de identidad
   - Domicilio completo (calle, número, piso, depto, ciudad, provincia)
10. Recepcionista hace clic en "Guardar y Continuar"
11. Sistema registra al cliente
12. Sistema confirma registro
13. Sistema muestra sección de acompañantes
14. Recepcionista pregunta por pasajeros acompañantes
15. **Para cada acompañante:**
    - Recepcionista ingresa: nombre, apellido, documento
    - Recepcionista hace clic en "Agregar"
    - Sistema agrega acompañante a la lista
16. Sistema muestra cabañas disponibles del tipo reservado
17. Recepcionista selecciona cabaña a asignar
18. Recepcionista hace clic en "Completar Check-in"
19. Sistema registra el check-in con fecha y hora
20. Sistema muestra confirmación:
    - Número de cabaña asignada
    - Datos del cliente
    - Cantidad de acompañantes
21. Sistema imprime (opcional) comprobante de check-in
22. Recepcionista entrega llaves de la cabaña al huésped

**Postcondiciones:** 
- Cliente registrado en sistema (si era nuevo)
- Check-in completado
- Cabaña asignada
- Estado de cabaña cambia a "Ocupada"

**Flujos Alternativos:**
- **3a:** No se encuentra la reserva
  - Sistema muestra mensaje "Reserva no encontrada"
  - Recepcionista verifica datos con el cliente
  - Puede buscar por nombre alternativo
- **17a:** No hay cabañas disponibles del tipo reservado
  - Sistema muestra mensaje de error
  - Recepcionista puede asignar cabaña de categoría superior
  - Recepcionista consulta con gerente

---

### CU-04: Buscar Cliente

**Actor:** Recepcionista

**Precondiciones:** Recepcionista ha iniciado sesión

**Flujo Principal:**
1. Recepcionista accede a módulo de Clientes
2. Recepcionista ingresa criterio de búsqueda (nombre, documento, email)
3. Sistema busca en la base de datos
4. Sistema muestra resultados con:
   - Datos personales
   - Historial de reservas
   - Última estadía
5. Recepcionista puede ver detalles completos del cliente

**Postcondiciones:** Información del cliente visualizada

---

### CU-05: Gestionar Reservas

**Actor:** Recepcionista

**Precondiciones:** Recepcionista ha iniciado sesión

**Flujo Principal:**
1. Recepcionista accede a módulo de Reservas
2. Sistema muestra lista de reservas con filtros:
   - Todas
   - Check-in hoy
   - Check-out hoy
   - Próximas
3. Recepcionista puede ver detalles de cada reserva:
   - Cliente
   - Cabaña
   - Fechas
   - Estado
   - Monto pagado
4. Recepcionista puede realizar acciones:
   - Ver detalles completos
   - Realizar check-in
   - Imprimir comprobante

**Postcondiciones:** Reservas gestionadas

---

## 👨‍💼 Casos de Uso - Gerente

### CU-06: Gestionar Precios por Temporada

**Actor:** Gerente

**Precondiciones:** Gerente ha iniciado sesión

**Flujo Principal:**
1. Gerente accede a módulo de Precios y Tarifas
2. Sistema muestra tabla con precios actuales:
   - Por cada tipo de cabaña
   - Temporada Baja (Jun-Ago)
   - Temporada Media (Mar-May, Sep-Nov)
   - Temporada Alta (Dic-Feb)
   - Tarifa Booking.com
3. Gerente hace clic en "Editar Precios"
4. Sistema habilita edición
5. Gerente modifica precios según estrategia de marketing
6. Gerente hace clic en "Guardar Cambios"
7. Sistema valida que los precios sean números positivos
8. Sistema guarda nuevos precios
9. Sistema muestra confirmación
10. Los nuevos precios se aplican inmediatamente al sistema de reservas

**Postcondiciones:** Precios actualizados en el sistema

**Flujos Alternativos:**
- **7a:** Precio inválido
  - Sistema muestra error
  - Gerente corrige valor
- **5a:** Gerente cancela edición
  - Sistema restaura precios anteriores

---

### CU-07: Gestionar Cabañas

**Actor:** Gerente

**Precondiciones:** Gerente ha iniciado sesión

**Flujo Principal:**
1. Gerente accede a módulo de Cabañas
2. Sistema muestra resumen:
   - Total de cabañas
   - Disponibles
   - Ocupadas
   - En mantenimiento
3. Sistema muestra listado de todas las cabañas con:
   - Nombre/número
   - Capacidad
   - Habitaciones y baños
   - Precio actual
   - Estado
   - Servicios
4. Gerente puede realizar acciones:
   - Ver detalles
   - Editar información
   - Cambiar estado
   - Agregar nueva cabaña
5. Al editar una cabaña, gerente puede modificar:
   - Información general
   - Servicios disponibles
   - Fotos
   - Precios base

**Postcondiciones:** Información de cabañas actualizada

---

### CU-08: Ver Dashboard y Estadísticas

**Actor:** Gerente

**Precondiciones:** Gerente ha iniciado sesión

**Flujo Principal:**
1. Gerente accede al Dashboard
2. Sistema muestra métricas en tiempo real:
   - **Check-ins hoy:** Cantidad
   - **Ocupación actual:** Porcentaje
   - **Ingresos del mes:** Monto total
   - **Clientes nuevos:** Cantidad
3. Sistema muestra gráficos:
   - Ocupación por temporada (Alta, Media, Baja)
   - Canales de reserva (Booking, Web, Directo)
4. Sistema muestra tabla de reservas recientes
5. Gerente puede hacer clic en cualquier métrica para ver detalles

**Postcondiciones:** Gerente visualiza estado del negocio

---

## 🧹 Casos de Uso - Mantenimiento

### CU-09: Gestionar Limpieza de Cabañas

**Actor:** Personal de Mantenimiento

**Precondiciones:** 
- Personal ha iniciado sesión
- Huésped ha realizado check-out

**Flujo Principal:**
1. Personal accede al Dashboard de Mantenimiento
2. Sistema muestra métricas:
   - Tareas del día
   - Completadas
   - Pendientes
   - Urgentes
3. Sistema muestra lista de tareas de limpieza:
   - Cabaña
   - Tipo de tarea
   - Prioridad (Alta/Media/Baja)
   - Tiempo estimado
   - Estado (Pendiente/En Progreso/Completado)
4. Personal selecciona una tarea "Pendiente"
5. Personal hace clic en "Iniciar"
6. Sistema cambia estado a "En Progreso"
7. Sistema muestra checklist de limpieza:
   - **Áreas Comunes:** pisos, muebles, ventanas, amenities
   - **Baños:** desinfección, toallas, papel, espejos
   - **Habitaciones:** sábanas, aspirar, ordenar, papeleras
   - **Cocina:** vajilla, electrodomésticos, mesadas, insumos
8. Personal realiza limpieza siguiendo checklist
9. Personal hace clic en "Completar"
10. Sistema cambia estado a "Completado"
11. Sistema registra fecha y hora de finalización
12. Sistema cambia estado de cabaña a "Disponible"
13. La cabaña queda lista para nueva reserva

**Postcondiciones:** 
- Cabaña limpia
- Tarea marcada como completada
- Cabaña disponible para reservas

**Flujos Alternativos:**
- **9a:** Se detecta problema en la cabaña
  - Personal reporta incidencia
  - Sistema notifica a gerente
  - Cabaña queda en estado "Mantenimiento"

---

## 📊 Matriz de Casos de Uso por Actor

| Caso de Uso | Cliente | Recepcionista | Gerente | Mantenimiento |
|-------------|---------|---------------|---------|---------------|
| Buscar Cabañas | ✅ | - | - | - |
| Realizar Reserva | ✅ | - | - | - |
| Realizar Check-in | - | ✅ | ✅ | - |
| Buscar Cliente | - | ✅ | ✅ | - |
| Gestionar Reservas | - | ✅ | ✅ | - |
| Gestionar Precios | - | - | ✅ | - |
| Gestionar Cabañas | - | - | ✅ | - |
| Ver Dashboard | - | ✅ | ✅ | ✅ |
| Gestionar Limpieza | - | - | - | ✅ |

---

## 🔄 Flujos Integrados

### Flujo Completo: Desde Reserva hasta Check-out

```
1. CLIENTE: Busca y reserva cabaña online
   ↓
2. SISTEMA: Registra reserva y envía confirmación
   ↓
3. CLIENTE: Llega al complejo en fecha de check-in
   ↓
4. RECEPCIONISTA: Busca reserva y verifica identidad
   ↓
5. RECEPCIONISTA: Registra cliente (si es nuevo)
   ↓
6. RECEPCIONISTA: Registra acompañantes
   ↓
7. RECEPCIONISTA: Asigna cabaña y entrega llaves
   ↓
8. CLIENTE: Disfruta su estadía
   ↓
9. CLIENTE: Realiza check-out
   ↓
10. SISTEMA: Genera tarea de limpieza automáticamente
    ↓
11. MANTENIMIENTO: Ve tarea y marca como "En Progreso"
    ↓
12. MANTENIMIENTO: Realiza limpieza según checklist
    ↓
13. MANTENIMIENTO: Marca tarea como "Completada"
    ↓
14. SISTEMA: Marca cabaña como "Disponible"
    ↓
15. Cabaña lista para siguiente huésped
```

---

## 🎯 Reglas de Negocio

### RN-01: Reservas
- Las reservas confirmadas NO pueden ser rechazadas
- Solo se acepta pago con tarjeta (crédito o débito)
- El desayuno está incluido en todas las tarifas
- Check-in estándar: 14:00 hs
- Check-out estándar: 10:00 hs

### RN-02: Precios
- Los precios se aplican según la fecha de check-in
- Temporada Alta: Mayor precio (Dic-Feb)
- Temporada Media: Precio estándar (Mar-May, Sep-Nov)
- Temporada Baja: Precio reducido (Jun-Ago)
- Tarifa Booking: +8-10% sobre temporada media

### RN-03: Capacidad
- No se puede exceder la capacidad máxima de cada cabaña
- Se debe registrar a todos los pasajeros acompañantes
- El pasajero principal es quien realiza la reserva

### RN-04: Estados de Cabaña
- **Disponible:** Lista para reservar
- **Ocupada:** Con huéspedes actualmente
- **En Limpieza:** No disponible temporalmente
- **Mantenimiento:** Requiere reparaciones

### RN-05: Autenticación
- Contraseñas: 8-12 caracteres
- Mínimo 2 números en la contraseña
- Sesión persiste hasta logout manual
- Cada rol tiene permisos específicos

---

## 📝 Notas de Implementación

Este es un **sistema mockup** con las siguientes características:

✅ **Implementado:**
- Interfaz de usuario completa
- Flujos de navegación
- Validaciones de formularios
- Simulación de datos
- Control de acceso por roles

❌ **No implementado (requiere backend real):**
- Base de datos persistente
- API REST
- Procesamiento de pagos real
- Envío de emails
- Integración con Booking.com

Para una implementación completa en producción, se requiere desarrollar el backend con las siguientes tecnologías sugeridas:

- **Backend:** Node.js + Express o NestJS
- **Base de Datos:** PostgreSQL o MongoDB
- **Autenticación:** JWT o OAuth2
- **Pasarela de Pago:** Stripe, MercadoPago
- **Emails:** SendGrid, AWS SES
- **Hosting:** AWS, Azure, Google Cloud

---

Para más información técnica, consulta el README.md principal del proyecto.


