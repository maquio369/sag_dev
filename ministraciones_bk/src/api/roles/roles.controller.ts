import { Controller } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('api/roles')
export class RolesController extends BaseController<Roles> {
  
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  getService(): BaseService<Roles> {
    return this.rolesService;
  }
}