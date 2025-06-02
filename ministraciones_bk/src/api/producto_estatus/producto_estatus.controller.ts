import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { ProductoEstatus } from "./producto_estatus.entity";
// Make sure the file exists at the specified path, or update the path if necessary
import { ProductoEstatusService } from "./producto_estatus.service";

@Controller('api/producto_estatus')
export class ProductoEstatusController extends BaseController<ProductoEstatus> {

    constructor(private readonly productoEstatusService: ProductoEstatusService) {
        super();
    }

    getService(): BaseService<ProductoEstatus> {
        return this.productoEstatusService;
    }
}