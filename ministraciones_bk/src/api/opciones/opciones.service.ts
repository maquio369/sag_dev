import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Opciones } from "./opciones.entity";

@Injectable()
export class OpcionesService extends BaseService<Opciones> {

    constructor(@InjectRepository(Opciones) private opcionesRepo: Repository<Opciones>) {
        super();
    }

    getRepository(): Repository<Opciones> {
        return this.opcionesRepo;
    }

}