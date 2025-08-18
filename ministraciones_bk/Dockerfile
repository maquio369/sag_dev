# Dockerfile para Backend NestJS
FROM node:20-alpine AS dependencies

# Instalar dependencias del sistema
RUN apk add --no-cache curl dumb-init

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para build)
RUN npm ci && npm cache clean --force

# Stage 2: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar dependencias del stage anterior
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json ./

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production

# Instalar dependencias del sistema
RUN apk add --no-cache curl dumb-init

WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copiar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar build y cambiar permisos
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist

# Exponer puerto
EXPOSE 3011

USER nestjs

# Comando de inicio
CMD ["dumb-init", "node", "dist/main"]
