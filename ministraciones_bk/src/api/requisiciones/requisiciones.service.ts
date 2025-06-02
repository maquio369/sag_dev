import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Requisiciones } from "./requisiciones.entity";

@Injectable()
export class RequisicionesService extends BaseService<Requisiciones> {

    constructor(@InjectRepository(Requisiciones) private requisicionesRepo: Repository<Requisiciones>) {
        super();
    }

    getRepository(): Repository<Requisiciones> {
        return this.requisicionesRepo;
    }
}