import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Organizaciones } from "./organizaciones.entity";
import { OrganizacionesService } from "./organizaciones.service";

@Controller('api/organizaciones')
export class OrganizacionesController extends BaseController<Organizaciones> {

    constructor(private readonly organizacionesService: OrganizacionesService) {
        super();
    }

    getService(): BaseService<Organizaciones> {
        return this.organizacionesService;
    }
}