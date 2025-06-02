import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Puestos } from "./puestos.entity";
import { PuestosService } from "./puestos.service";

@Controller('api/puestos')
export class PuestosController extends BaseController<Puestos> {

    constructor(private readonly puestosService: PuestosService) {
        super();
    }

    getService(): BaseService<Puestos> {
        return this.puestosService;
    }

}