import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { PermisosRoles } from "./permisos_roles.entity";

@Injectable()
export class PermisosRolesService extends BaseService<PermisosRoles> {
  constructor(
    @InjectRepository(PermisosRoles)
    private permisosRolesRepo: Repository<PermisosRoles>
  ) {
    super();
  }

  getRepository(): Repository<PermisosRoles> {
    return this.permisosRolesRepo;
  }

  // Métodos adicionales útiles
  async updateEstado(rol_id: number, permiso_id: number, estado: boolean): Promise<void> {
    await this.permisosRolesRepo.update(
      { rol_id, permiso_id },
      { esta_borrado: estado }
    );
  }

  async getPermisosPorRol(rol_id: number): Promise<PermisosRoles[]> {
    return this.permisosRolesRepo.find({ 
      where: { rol_id, esta_borrado: false }
    });
  }
}