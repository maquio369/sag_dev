import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { UsuariosService } from './api/usuarios/usuarios.service';
import { DatabaseService } from './lib/DatabaseService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usuariosService: UsuariosService,
    public readonly db: DatabaseService,
  ) {}

  @Get()
  async main(): Promise<string> {
    return this.appService.getHey();
  }
  ///Example of a login route that generates a JWT token
  /*  POST http://localhost:3500/api/auth
  BODY (JSON):
  {
    "user": "admin",
    "password": "123"
  }    */
  @Post('api/auth')
  @HttpCode(HttpStatus.OK)
  async auth(@Body() body: { user: string; password: string }): Promise<any> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no definida');
    }
    const { user, password } = body;

    const jsonObj = await this.usuariosService.auth(user, password);
    //console.log(password, user);
    if (jsonObj.length > 0) {
      //console.log('select:', jsonObj[0].usuario, jsonObj[0].rol_id, password);
      var expTime = process.env.JWT_EXPIRATION as StringValue;
      const token = jwt.sign(jsonObj[0], jwtSecret as string, {
        expiresIn: expTime ? expTime : '7h',
      });
      return { message: 'Acceso autorizado', token };
    } else {
      return { message: 'Credenciales inválidas', token: '' };
    }
  }
}
