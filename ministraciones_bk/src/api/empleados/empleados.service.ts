import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Empleados } from "./empleados.entity";

@Injectable()
export class EmpleadosService extends BaseService<Empleados> {

    constructor(@InjectRepository(Empleados) private empleadosRepo: Repository<Empleados>) {
        super();
    }

    getRepository(): Repository<Empleados> {
        return this.empleadosRepo;
    }
}