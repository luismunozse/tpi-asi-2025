# 🚀 Guía de Despliegue - Estancia del Carmen

## Opciones de Despliegue

Este proyecto Next.js puede ser desplegado en múltiples plataformas. A continuación se detallan las opciones más comunes.

## 1. Vercel (Recomendado)

Vercel es la plataforma creada por los desarrolladores de Next.js y ofrece la mejor experiencia.

### Despliegue Automático desde Git

1. **Subir código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/estancia-del-carmen.git
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ir a https://vercel.com
   - Click en "New Project"
   - Importar tu repositorio de GitHub
   - Vercel detectará automáticamente que es Next.js
   - Click en "Deploy"

3. **Configuración Automática**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **¡Listo!**
   - Tu sitio estará en línea en minutos
   - URL: `https://tu-proyecto.vercel.app`

### Despliegue Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

## 2. Netlify

### Despliegue desde Git

1. **Subir código a GitHub** (mismo que Vercel)

2. **Conectar con Netlify**
   - Ir a https://netlify.com
   - Click en "New site from Git"
   - Conectar tu repositorio
   - Configuración:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Deploy**

### Despliegue Manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

## 3. Servidor Propio (VPS)

### Requisitos
- Servidor Linux (Ubuntu 20.04+ recomendado)
- Node.js 18+
- Nginx (opcional, como proxy reverso)
- PM2 (para mantener la app corriendo)

### Pasos

1. **Preparar el servidor**
   ```bash
   # Actualizar sistema
   sudo apt update
   sudo apt upgrade -y

   # Instalar Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Instalar PM2
   sudo npm install -g pm2
   ```

2. **Subir el proyecto**
   ```bash
   # Clonar repositorio o subir archivos
   git clone https://github.com/tu-usuario/estancia-del-carmen.git
   cd estancia-del-carmen

   # Instalar dependencias
   npm install

   # Build para producción
   npm run build
   ```

3. **Configurar PM2**
   ```bash
   # Crear archivo ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'estancia-carmen',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }

   # Iniciar con PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Configurar Nginx (opcional)**
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL con Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tudominio.com
   ```

## 4. Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Comandos Docker

```bash
# Build
docker build -t estancia-carmen .

# Run
docker run -p 3000:3000 estancia-carmen

# Con Docker Compose
docker-compose up -d
```

## Variables de Entorno

Para producción, crea un archivo `.env.production`:

```env
# General
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tudominio.com

# API (si conectas un backend)
NEXT_PUBLIC_API_URL=https://api.tudominio.com

# Otras configuraciones
NEXT_PUBLIC_CONTACT_EMAIL=info@estanciadelcarmen.com
```

## Optimizaciones para Producción

### 1. Análisis de Bundle

```bash
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // config
})

# Ejecutar análisis
ANALYZE=true npm run build
```

### 2. Imágenes Optimizadas

Si usas imágenes locales, optimízalas antes del deploy:

```bash
npm install -D sharp
```

### 3. Compresión

```bash
# next.config.js
module.exports = {
  compress: true,
}
```

### 4. Headers de Seguridad

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## Monitoreo

### Logs con PM2

```bash
# Ver logs en tiempo real
pm2 logs estancia-carmen

# Ver logs de errores
pm2 logs estancia-carmen --err

# Monitorear recursos
pm2 monit
```

### Vercel Analytics

Si despliegas en Vercel, puedes agregar analytics:

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Checklist Pre-Despliegue

- [ ] Código testeado localmente
- [ ] Build sin errores (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] URLs actualizadas (no localhost)
- [ ] Imágenes optimizadas
- [ ] SEO meta tags configurados
- [ ] Favicon agregado
- [ ] Robots.txt configurado
- [ ] Sitemap.xml generado (opcional)
- [ ] Analytics configurado (opcional)

## Post-Despliegue

1. **Verificar funcionalidad**
   - [ ] Página principal carga
   - [ ] Login funciona
   - [ ] Todas las rutas accesibles
   - [ ] Responsive en móvil
   - [ ] Formularios funcionan

2. **Performance**
   - [ ] Lighthouse score > 90
   - [ ] First Contentful Paint < 1.8s
   - [ ] Time to Interactive < 3.8s

3. **SEO**
   - [ ] Meta tags presentes
   - [ ] Open Graph configurado
   - [ ] Sitemap accesible

## Dominios Personalizados

### Vercel
1. Ir a Project Settings → Domains
2. Agregar tu dominio
3. Configurar DNS según instrucciones

### Netlify
1. Ir a Domain Settings
2. Agregar dominio personalizado
3. Configurar DNS

### Servidor Propio
1. Apuntar DNS A record a IP del servidor
2. Configurar Nginx con el dominio
3. Configurar SSL con Let's Encrypt

## Backup y Recuperación

```bash
# Backup de código (Git)
git push origin main

# Backup de configuración
tar -czf backup-config.tar.gz .env* next.config.js

# Backup de build
tar -czf backup-build.tar.gz .next
```

## Troubleshooting

### Build falla
```bash
# Limpiar caché
rm -rf .next node_modules
npm install
npm run build
```

### Puerto en uso
```bash
# Cambiar puerto
PORT=3001 npm start
```

### Memoria insuficiente
```bash
# Aumentar memoria de Node
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## Recursos

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [PM2 Docs](https://pm2.keymetrics.io)

---

Para más información, consulta la documentación oficial de Next.js o contacta al equipo de desarrollo.

