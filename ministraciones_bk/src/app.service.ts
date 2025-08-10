import { Injectable } from '@nestjs/common';
//import { DataSource } from 'typeorm';
@Injectable()
export class AppService {
  getHey(): string {
    return '🐧=͟͟͞ clave';
  }
/*
  constructor(
    @Inject() private dataSource: DataSource 
  ) {}

  async auth(usr: string, pwd: string) {
    const qry = `SELECT usuario_id,usuario,password FROM usuarios WHERE usuario = '${usr}'`;
    const result = await this.dataSource.query(qry);
    return result; 
  }
  */
}


  