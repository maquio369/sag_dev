import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { GLOBAL_SYSTEM_CONST: 'SAG' }
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
