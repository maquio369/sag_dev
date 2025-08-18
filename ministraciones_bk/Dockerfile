# Dockerfile para Backend NestJS
FROM node:20-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache curl

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3011

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Cambiar propiedad de archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Comando de inicio
CMD ["npm", "run", "start:prod"]
