import { Controller } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { RequisicionesDetalle } from './requisiciones_detalle.entity';
import { RequisicionesDetalleService } from './requisiciones_detalle.service';

@Controller('api/requisiciones_detalle')
export class RequisicionesDetalleController extends BaseController<RequisicionesDetalle> {
  
  constructor(private readonly requisicionesDetalleService: RequisicionesDetalleService) {
    super();
  }

  getService(): BaseService<RequisicionesDetalle> {
    return this.requisicionesDetalleService;
  }
}