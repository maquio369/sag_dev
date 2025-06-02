import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Categorias } from "./categorias.entity";
import { CategoriasService } from "./categorias.service";

@Controller('api/categorias')
export class CategoriasController extends BaseController<Categorias> {

    constructor(private readonly categoriasService: CategoriasService) {
        super();
    }

    getService(): BaseService<Categorias> {
        return this.categoriasService;
    }
}