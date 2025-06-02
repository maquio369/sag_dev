import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { RequisicionesDetalle } from './requisiciones_detalle.entity';

@Injectable()
export class RequisicionesDetalleService extends BaseService<RequisicionesDetalle> {

  constructor(
    @InjectRepository(RequisicionesDetalle) 
    private requisicionesDetalleRepo: Repository<RequisicionesDetalle>
  ) {
    super();
  }

  getRepository(): Repository<RequisicionesDetalle> {
    return this.requisicionesDetalleRepo;
  }
}