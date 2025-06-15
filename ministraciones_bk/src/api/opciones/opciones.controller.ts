import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Opciones } from "./opciones.entity";
import { OpcionesService } from "./opciones.service";

@Controller('api/opciones')
export class OpcionesController extends BaseController<Opciones> {

    constructor(private readonly opcionesService: OpcionesService) {
        super();
    }

    getService(): BaseService<Opciones> {
        return this.opcionesService;
    }

}