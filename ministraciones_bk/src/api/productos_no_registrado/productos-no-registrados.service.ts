import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { ProductosNoRegistrados } from "./productos_no_registrados.entity";

@Injectable()
export class ProductosNoRegistradosService extends BaseService<ProductosNoRegistrados> {

    constructor(@InjectRepository(ProductosNoRegistrados) private productosNoRegistradosRepo: Repository<ProductosNoRegistrados>) {
        super();
    }

    getRepository(): Repository<ProductosNoRegistrados> {
        return this.productosNoRegistradosRepo;
    }
}