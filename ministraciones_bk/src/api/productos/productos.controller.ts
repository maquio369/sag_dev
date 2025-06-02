import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Productos } from "./productos.entity";
import { ProductosService } from "./productos.service";

@Controller('api/productos')
export class ProductosController extends BaseController<Productos> {

    constructor(private readonly productosService: ProductosService) {
        super();
    }

    getService(): BaseService<Productos> {
        return this.productosService;
    }
}