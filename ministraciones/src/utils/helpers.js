"use client"
import { verifyToken } from "@/Lib/jwt_lib_front";

export const verificarToken = async () => {
  //Verificar token
  var token = sessionStorage.getItem("token");
  var payload = await verifyToken(token);
  //console.log("-Token:", token, "*payload:", payload);
  if (!payload) {
    window.location.href = "/login";
  }
  return payload;
};
