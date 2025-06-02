import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Productos } from "./productos.entity";

@Injectable()
export class ProductosService extends BaseService<Productos> {

    constructor(@InjectRepository(Productos) private productosRepo: Repository<Productos>) {
        super();
    }

    getRepository(): Repository<Productos> {
        return this.productosRepo;
    }
}