import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
  Param,
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
    "contraseña": "•••••",
    "id_sistema": 2
  }    */
  @Post('api/auth')
  @HttpCode(HttpStatus.OK)
  async auth(
    @Body() body: { usuario: string; contraseña: string; id_sistema: number },
    @Res() res: any
  ): Promise<any> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no definida');
    }
    const { usuario, contraseña, id_sistema } = body;

    const jsonObj = await this.usuariosSql.auth(usuario, contraseña, id_sistema);
    //console.log("app.controller = ", usuario,jsonObj);
    if (jsonObj.length > 0) {
      //console.log('select:', jsonObj[0].usuario, jsonObj[0].id_rol);
      var expTime = process.env.JWT_EXPIRATION as StringValue;
      const token = jwt.sign(jsonObj[0], jwtSecret as string, {
        expiresIn: expTime ? expTime : '7h',
      });
      //set cookie with token
      res.cookie("__next_hmr_refreshacc__", token);//.httpOnly(); 
      //res.cookie("n1", jsonObj[0].ns);
      return res.json({ message: 'Acceso autorizado', token, ns:jsonObj[0].ns, nu:jsonObj[0].nu, nr:jsonObj[0].nr });
    } else {
      return res.json({ message: 'Credenciales inválidas', token: '' });
    }
  }

    @Get('api/usuarios/getUser/:id')
    async getUser(@Param('id') id: number): Promise<any | null> {
      return await this.usuariosSql.getUser(id);
    }
}
