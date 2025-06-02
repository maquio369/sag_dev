import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { UnidadesDeMedida } from './unidades_de_medida.entity';

@Injectable()
export class UnidadesDeMedidaService extends BaseService<UnidadesDeMedida> {

  constructor(
    @InjectRepository(UnidadesDeMedida) 
    private unidadesDeMedidaRepo: Repository<UnidadesDeMedida>
  ) {
    super();
  }

  getRepository(): Repository<UnidadesDeMedida> {
    return this.unidadesDeMedidaRepo;
  }
}