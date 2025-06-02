import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Organizaciones } from "./organizaciones.entity";

@Injectable()
export class OrganizacionesService extends BaseService<Organizaciones> {

    constructor(@InjectRepository(Organizaciones) private organizacionesRepo: Repository<Organizaciones>) {
        super();
    }

    getRepository(): Repository<Organizaciones> {
        return this.organizacionesRepo;
    }
}