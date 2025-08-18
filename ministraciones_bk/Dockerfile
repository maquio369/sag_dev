# Dockerfile Backend SIMPLE
FROM node:20-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache curl

# Directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer puerto
EXPOSE 3011

# Comando para desarrollo (sin build)
CMD ["npm", "run", "start:dev"]
