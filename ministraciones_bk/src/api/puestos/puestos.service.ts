import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Puestos } from "./puestos.entity";

@Injectable()
export class PuestosService extends BaseService<Puestos> {

    constructor(@InjectRepository(Puestos) private puestosRepo : Repository<Puestos>) {
        super();
    }

    getRepository(): Repository<Puestos> {
        return this.puestosRepo;
    }

}