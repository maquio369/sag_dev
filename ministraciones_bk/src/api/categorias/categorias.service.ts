import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Categorias } from "./categorias.entity";

@Injectable()
export class CategoriasService extends BaseService<Categorias> {

    constructor(@InjectRepository(Categorias) private categoriasRepo: Repository<Categorias>) {
        super();
    }

    getRepository(): Repository<Categorias> {
        return this.categoriasRepo;
    }
}