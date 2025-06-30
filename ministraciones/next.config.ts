import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { //GLOBAL_SYSTEM_CONST: "SAG",
    API_BASE: process.env.API_URL2 !== undefined ? process.env.API_URL2 : "http://localhost:3001/",
    DELETED_COLUMN_NAME:"esta_borrado",
    FK_COLUMN_POSTFIX:"_text",
    PK_COLUMN_NAME:"🔑",
    //ID_PREFIX:"id_"
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
