import { Controller } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Sistemas } from './sistemas.entity';
import { SistemasService } from './sistemas.service';

@Controller('api/sistemas')
export class SistemasController extends BaseController<Sistemas> {
  
  constructor(private readonly sistemasService: SistemasService) {
    super();
  }

  getService(): BaseService<Sistemas> {
    return this.sistemasService;
  }
}