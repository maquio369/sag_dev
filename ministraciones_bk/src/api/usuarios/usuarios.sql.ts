import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/service.commons';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosSql {//extends BaseService<any> 
    constructor(
    @Inject() private dataSource: DataSource 
  ) {
      //super();
    }
  
  // Métodos adicionales útiles
  async auth(usr: string, pwd: string): Promise<any> {
    const qry =
      'SELECT usuario,id_rol FROM usuarios WHERE esta_borrado=false AND usuario=$1 AND clave=$2';
    const result = await this.dataSource.query(qry, [usr, pwd]);
    //console.log("service="usr,pwd,result);
    return result;
  }
}
