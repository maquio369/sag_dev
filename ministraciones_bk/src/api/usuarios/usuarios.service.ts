import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService extends BaseService<Usuarios> {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepo: Repository<Usuarios>,
  ) {
    super();
  }

  getRepository(): Repository<Usuarios> {
    return this.usuariosRepo;
  }
  
  /*
  // Métodos adicionales útiles
  async create(entity: Usuarios): Promise<Usuarios> {
    return this.getRepository().create(entity);
  }
*/
}
