import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosSql {
  constructor(@Inject() private dataSource: DataSource) {}

  // Métodos adicionales útiles
  async auth(usr: string, pwd: string): Promise<any> {
    const qry =
      "SELECT id_usuario as id, id_rol,usuario FROM usuarios WHERE esta_borrado=false AND usuario=$1 AND clave=$2";
    const result = await this.dataSource.query(qry, [usr, pwd]);
    //console.log("service="usr,pwd,result);
    return result;
  }

}
