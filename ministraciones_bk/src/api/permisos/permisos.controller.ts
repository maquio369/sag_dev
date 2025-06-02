import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Permisos } from "./permisos.entity";
import { PermisosService } from "./permisos.service";

@Controller('api/permisos')
export class PermisosController extends BaseController<Permisos> {
  constructor(private readonly permisosService: PermisosService) {
    super();
  }

  getService(): BaseService<Permisos> {
    return this.permisosService;
  }

  // Endpoint adicional opcional
  @Get('sistema/:sistema_id')
  async getBySistema(@Param('sistema_id') sistema_id: number) {
    return await this.permisosService.getBySistema(sistema_id);
  }
}