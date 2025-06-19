import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosSql {
  constructor(@Inject() private dataSource: DataSource) {}

  // Métodos adicionales útiles
  async auth(usr: string, pwd: string, idSistema: number): Promise<any> {
    const qry =
      "SELECT $3::integer as ns, id_usuario as nu, id_rol as nr FROM usuarios WHERE esta_borrado=false AND usuario=$1 AND clave=$2";
    const result = await this.dataSource.query(qry, [usr, pwd, idSistema]);
    //console.log("service="usr,pwd,result);
    return result;
  }

}
