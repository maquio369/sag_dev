import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Roles } from "./roles.entity";

@Injectable()
export class RolesService extends BaseService<Roles> {

    constructor(@InjectRepository(Roles) private rolesRepo: Repository<Roles>) {
        super();
    }

    getRepository(): Repository<Roles> {
        return this.rolesRepo;
    }

}