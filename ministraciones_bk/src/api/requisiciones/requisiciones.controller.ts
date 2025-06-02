import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Requisiciones } from "./requisiciones.entity";
import { RequisicionesService } from "./requisiciones.service";

@Controller('api/requisiciones')
export class RequisicionesController extends BaseController<Requisiciones> {

    constructor(private readonly requisicionesService: RequisicionesService) {
        super();
    }

    getService(): BaseService<Requisiciones> {
        return this.requisicionesService;
    }
}