import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { Opciones } from './opciones.entity';

@Injectable()
export class OpcionesService extends BaseService<Opciones> {
  constructor(
    @InjectRepository(Opciones)
    private opcionesRepo: Repository<Opciones>,
  ) {
    super();
  }

  getRepository(): Repository<Opciones> {
    return this.opcionesRepo;
  }

  // Métodos adicionales útiles
  async getBySistema(id_sistema: number): Promise<Opciones[]> {
    return this.opcionesRepo.find({
      where: { id_sistema },
      order: { orden: 'ASC' },
    });
  }

  async getOpciones(idSistema: number, idRol: number): Promise<any> {
    const qry = 'SELECT fn_opciones($1,$2) AS menuItems';
    const result = await this.getRepository().query(qry, [idSistema, idRol]);
    //console.log("service=",idSistema,idRol,result);
    return result;
  }
}
