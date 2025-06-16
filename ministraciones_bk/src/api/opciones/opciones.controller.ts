import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Opciones } from './opciones.entity';
import { OpcionesService } from './opciones.service';
import { OpcionesSql } from './opciones.sql';

@Controller('api/opciones')
export class OpcionesController extends BaseController<Opciones> {
  constructor(
    private readonly opcionesService: OpcionesService,
    private readonly opcionesSql: OpcionesSql,
  ) {
    super();
  }

  getService(): BaseService<Opciones> {
    return this.opcionesService;
  }

  @Get('getmenu/:idSistema/:idRol') //localhost:3011/api/opciones/getmenu/2/5
  async getMenu(
    @Param('idSistema') idSistema: number,
    @Param('idRol') idRol: number,
  ) {
    return await this.opcionesSql.getMenu(idSistema, idRol);
  }
  @Get('getopciones/:idSistema/:idRol')
  async getOpciones(
    @Param('idSistema') idSistema: number,
    @Param('idRol') idRol: number,
  ) {
    return await this.opcionesSql.getOpciones(idSistema, idRol);
  }
}
