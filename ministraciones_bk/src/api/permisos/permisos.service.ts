import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Permisos } from "./permisos.entity";

@Injectable()
export class PermisosService extends BaseService<Permisos> {

    constructor(@InjectRepository(Permisos) private permisosRepo: Repository<Permisos>) {
        super();
    }

    getRepository(): Repository<Permisos> {
        return this.permisosRepo;
    }

}