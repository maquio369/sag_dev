import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { ProductoEstatus } from "./producto_estatus.entity";

@Injectable()
export class ProductoEstatusService extends BaseService<ProductoEstatus> {

    constructor(@InjectRepository(ProductoEstatus) private productoEstatusRepo: Repository<ProductoEstatus>) {
        super();
    }

    getRepository(): Repository<ProductoEstatus> {
        return this.productoEstatusRepo;
    }
}