/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Docker
  output: 'standalone',
  
  // Configuración existente
  experimental: {
    // Otras configuraciones experimentales que puedas tener
  },
  
  // Variables de entorno públicas - APIS SEPARADAS
  env: {
    // API para autenticación (NestJS - Puerto 3011)
    NEXT_PUBLIC_AUTH_API: process.env.NEXT_PUBLIC_AUTH_API || 'http://172.16.35.75:3011',
    // API para datos de tablas (Servicio externo - Puerto 3013)
    NEXT_PUBLIC_DATA_API: process.env.NEXT_PUBLIC_DATA_API || 'http://172.16.35.75:3013/api',
  }
}

module.exports = nextConfig
