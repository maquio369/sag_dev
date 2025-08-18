/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Docker
  output: 'standalone',
  
  // Configuración existente (agregar a lo que ya tienes)
  experimental: {
    // Otras configuraciones experimentales que puedas tener
  },
  
  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://172.16.35.75:3011',
  }
}

module.exports = nextConfig
