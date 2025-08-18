# Dockerfile Frontend SIMPLE
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
EXPOSE 3010

# Comando para desarrollo
CMD ["npm", "run", "dev"]
