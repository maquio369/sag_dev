import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Opciones } from "./opciones.entity";
import { OpcionesService } from "./opciones.service";

@Controller('api/opciones')
export class OpcionesController extends BaseController<Opciones> {
  constructor(private readonly opcionesService: OpcionesService) {
    super();
  }

  getService(): BaseService<Opciones> {
    return this.opcionesService;
  }

  // Métodos adicionales útiles
  @Get('sistema/:sistema_id')
  async getBySistema(@Param('sistema_id') sistema_id: number) {
    return await this.opcionesService.getBySistema(sistema_id);
  }
}