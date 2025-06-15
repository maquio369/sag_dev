import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OpcionesSql {
  constructor(@Inject() private dataSource: DataSource) {}

  // Métodos adicionales útiles
  async getMenu(idSistema: number, idRol: number): Promise<any> {
    const qry = 'SELECT fn_menu($1,$2) AS menuItems';
    const result = await this.dataSource.query(qry, [idSistema, idRol]);
    return result;
  }

  async getOpciones(idSistema: number, idRol: number): Promise<any> {
    const qry = 'SELECT fn_opciones($1,$2) AS menuItems';
    const result = await this.dataSource.query(qry, [idSistema, idRol]);
    return result;
  }
}
