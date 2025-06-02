import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { ProductosNoRegistrados } from "./productos_no_registrados.entity";
import { ProductosNoRegistradosService } from "./productos_no_registrados.service";

@Controller('api/productos-no-registrados')
export class ProductosNoRegistradosController extends BaseController<ProductosNoRegistrados> {

    constructor(private readonly productosNoRegistradosService: ProductosNoRegistradosService) {
        super();
    }

    getService(): BaseService<ProductosNoRegistrados> {
        return this.productosNoRegistradosService;
    }
}