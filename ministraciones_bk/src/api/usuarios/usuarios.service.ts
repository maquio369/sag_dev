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

  async create(entity: Usuarios): Promise<Usuarios> {
    return this.getRepository().create(entity);
  }

  async auth(usr: string, pwd: string): Promise<any> {
    const qry = "SELECT usuario,rol_id FROM usuarios WHERE esta_activo=true AND usuario=$1 AND clave=$2";
    const result = await this.getRepository().query(qry,[usr,pwd]);
    //console.log("service="usr,pwd,result);
    return result;
  }
}
