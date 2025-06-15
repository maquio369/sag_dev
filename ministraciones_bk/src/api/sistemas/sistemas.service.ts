import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Sistemas } from "./sistemas.entity";

@Injectable()
export class SistemasService extends BaseService<Sistemas> {

    constructor(@InjectRepository(Sistemas) private sistemasRepo: Repository<Sistemas>) {
        super();
    }

    getRepository(): Repository<Sistemas> {
        return this.sistemasRepo;
    }

}