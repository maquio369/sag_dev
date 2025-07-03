import type { NextConfig } from "next";
//require('dotenv').config();

const nextConfig: NextConfig = {
  env: { 
    //usar prefijo NEXT_PUBLIC_ para que sean visibles en el lado del cliente
    NEXT_PUBLIC_API_BASE: process.env.API_URL2 !== undefined ? process.env.API_URL2 : "http://localhost:3001", 
    NEXT_PUBLIC_DELETED_COLUMN_NAME:"esta_borrado",
    NEXT_PUBLIC_FK_COLUMN_POSTFIX:"_text",
    
    //NEXT_PUBLIC_ID_PREFIX:"id_"
   },
  /* config options here */
  /*images: {
    remotePatterns: [
      {
        hostname: "pexels.com",        
      }
    ],
  },*/
};

export default nextConfig;
