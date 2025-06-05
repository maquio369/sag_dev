"use server"

import { verify } from "jsonwebtoken";

/**
 * Verifica y decodifica un token JWT
 * @param token Token JWT a verificar
 * @returns Payload decodificado o null si el token es inválido
 */
export async function verifyToken(token: string | null): Promise<any> {
  var payload = null as any;
  if (token) {
    try {
      var secret = process.env.JWT_SECRET || "";
      payload = verify(token, secret, { complete: false });
      console.log("Payload(verifyToken):", payload);
    } catch (error: any) {
      console.log("verifyToken:", error.message);
      payload = null;
    }
  }
  return payload;
}
