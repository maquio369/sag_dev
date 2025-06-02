import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Areas } from "./areas.entity";

@Injectable()
export class AreasService extends BaseService<Areas> {

    constructor(@InjectRepository(Areas) private areasRepo: Repository<Areas>) {
        super();
    }

    getRepository(): Repository<Areas> {
        return this.areasRepo;
    }

}