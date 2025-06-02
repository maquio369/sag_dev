import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Permisos } from "./permisos.entity";

@Injectable()
export class PermisosService extends BaseService<Permisos> {
  constructor(
    @InjectRepository(Permisos)
    private permisosRepo: Repository<Permisos>
  ) {
    super();
  }

  getRepository(): Repository<Permisos> {
    return this.permisosRepo;
  }

  // Método adicional opcional para obtener permisos por sistema
  async getBySistema(sistema_id: number): Promise<Permisos[]> {
    return this.permisosRepo.find({ 
      where: { sistema_id },
      order: { orden: 'ASC' }
    });
  }
}