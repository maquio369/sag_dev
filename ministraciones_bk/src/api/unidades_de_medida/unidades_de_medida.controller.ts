import { Controller } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { UnidadesDeMedida } from './unidades_de_medida.entity';
import { UnidadesDeMedidaService } from './unidades_de_medida.service';

@Controller('api/unidades_de_medida')
export class UnidadesDeMedidaController extends BaseController<UnidadesDeMedida> {
  
  constructor(private readonly unidadesDeMedidaService: UnidadesDeMedidaService) {
    super();
  }

  getService(): BaseService<UnidadesDeMedida> {
    return this.unidadesDeMedidaService;
  }
}