import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { UsuariosSql } from './api/usuarios/usuarios.sql';
//import { DatabaseService } from './lib/DatabaseService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usuariosSql: UsuariosSql,
    //public readonly db: DatabaseService,
  ) {}

  @Get()
  async main(): Promise<string> {
    return this.appService.getHey();
  }
  ///Example of a login route that generates a JWT token
  /*  POST http://localhost:3011/api/auth
  BODY (JSON):
  {
    "usuario": "admin",
    "clave": "123"
  }    */
  @Post('api/auth')
  @HttpCode(HttpStatus.OK)
  async auth(
    @Body() body: { usuario: string; clave: string },
    @Res() res: any
  ): Promise<any> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no definida');
    }
    const { usuario, clave } = body;

    const jsonObj = await this.usuariosSql.auth(usuario, clave);
    //console.log("app.controller = ",clave, usuario,jsonObj);
    if (jsonObj.length > 0) {
      //console.log('select:', jsonObj[0].usuario, jsonObj[0].id_rol, clave);
      var expTime = process.env.JWT_EXPIRATION as StringValue;
      const token = jwt.sign(jsonObj[0], jwtSecret as string, {
        expiresIn: expTime ? expTime : '7h',
      });
      //set cookie with token
      res.cookie("access_token", token);//.httpOnly(); 
      return res.json({ message: 'Acceso autorizado', token,payload:jsonObj[0].id });
    } else {
      return res.json({ message: 'Credenciales inválidas', token: '' });
    }
  }
}
