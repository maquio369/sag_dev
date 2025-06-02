import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { PermisosRoles } from "./permisos_roles.entity";
import { PermisosRolesService } from "./permisos-roles.service";

@Controller('api/permisos_roles')
export class PermisosRolesController extends BaseController<PermisosRoles> {
  constructor(private readonly permisosRolesService: PermisosRolesService) {
    super();
  }

  getService(): BaseService<PermisosRoles> {
    return this.permisosRolesService;
  }

  @Get('rol/:rol_id')
  async getPermisosPorRol(@Param('rol_id') rol_id: number) {
    return await this.permisosRolesService.getPermisosPorRol(rol_id);
  }

  @Put('estado')
  async updateEstado(
    @Body('rol_id') rol_id: number,
    @Body('permiso_id') permiso_id: number,
    @Body('estado') estado: boolean
  ) {
    return await this.permisosRolesService.updateEstado(rol_id, permiso_id, estado);
  }
}