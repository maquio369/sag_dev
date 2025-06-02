import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Empleados } from "./empleados.entity";
import { EmpleadosService } from "./empleados.service";

@Controller('api/empleados')
export class EmpleadosController extends BaseController<Empleados> {

    constructor(private readonly empleadosService: EmpleadosService) {
        super();
    }

    getService(): BaseService<Empleados> {
        return this.empleadosService;
    }
}