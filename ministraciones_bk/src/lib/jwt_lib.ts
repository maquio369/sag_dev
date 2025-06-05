import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { verify } from 'jsonwebtoken';

/**
 * Verifica y decodifica un token JWT
 * @param token Token JWT a verificar
 * @returns Payload decodificado o null si el token es inválido
 */
export function verifyToken(token: string | null): any | null {
  var payload = null as any;
  if (token) {
    try {
      var secret = process.env.JWT_SECRET || "";
      payload = verify(token, secret, { complete: true });
      console.log("Payload(verifyToken):", payload);
    } catch (error: any) {
      console.log("verifyToken:", error.message);
      payload = null;
    }
  }
  return payload;
}
/**
 * Verifica el JWT enviado en el Header y decodifica el Payload
 * @param authHeader
 * @returns
 */
export function verifyTokenFromAuthHeader(
  authHeader: string,
  url?: string,
): any | null {
  const token = extractTokenFromHeader(authHeader);
  var payload;
  try {
    var secret = process.env.JWT_SECRET || '';
    payload = verify(token, secret, { complete: true });
  } catch (error:any) {
    console.log('verifyToken:', error.message, url ? url : '');
    //payload = null;
    throw new HttpException(
      error.message == 'jwt expired' ? 'Token expirado' : 'No autorizado',
      HttpStatus.UNAUTHORIZED,
    );
  }
  return payload;
}

/**
 * Extrae el token JWT de los headers de autorización
 * @param authHeader Header de Authorization
 * @returns Token extraído o null
 */
export function extractTokenFromHeader(authHeader: string | null): string {
  return authHeader ? authHeader.split(' ')[1] : '';
}
