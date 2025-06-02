import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Controller('api/usuarios')
export class UsuariosController extends BaseController<Usuarios> {
  constructor(private readonly usuariosService: UsuariosService) {
    super();
  }

  getService(): BaseService<Usuarios> {
    return this.usuariosService;
  }

  auth(usr: string, pwd: string) {
    return this.usuariosService.auth(usr, pwd);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() entity: Usuarios, @Req() req:any): Promise<Usuarios> {
    try {
      if (entity && 'clave' in entity) {
        //(entity as any).clave = bcrypt.hashSync((entity as any).clave, 9);
        //console.log(this.constructor.name); //UsuariosController
      }
      return await this.usuariosService.save(entity);
    } catch (error) {
      if (entity && 'clave' in entity) {
        (entity as any).clave = '••••••••••';
      }
      console.log(
        this.constructor.name + ' -',
        req.url + ' -',
        error.message,
        entity,
      );
      throw new HttpException(
        req.url + ': ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
