import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Areas } from "./areas.entity";
import { AreasService } from "./areas.service";

@Controller('api/areas')
export class AreasController extends BaseController<Areas> {

    constructor(private readonly areasService: AreasService) {
        super();
    }

    getService(): BaseService<Areas> {
        return this.areasService;
    }

}