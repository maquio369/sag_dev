import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { Permisos } from './permisos.entity';

@Injectable()
export class PermisosService extends BaseService<Permisos> {
  constructor(
    @InjectRepository(Permisos)
    private permisosRepo: Repository<Permisos>,
  ) {
    super();
  }

  getRepository(): Repository<Permisos> {
    return this.permisosRepo;
  }

  // Métodos adicionales útiles
  async getBySistema(id_sistema: number): Promise<Permisos[]> {
    return this.permisosRepo.find({
      where: { id_sistema },
      order: { orden: 'ASC' },
    });
  }

  async getPermisos(idSistema: number, idRol: number): Promise<any> {
    const qry = 'SELECT fn_permisos($1,$2) AS menuItems';
    const result = await this.getRepository().query(qry, [idSistema, idRol]);
    //console.log("service=",idSistema,idRol,result);
    return result;
  }
}
