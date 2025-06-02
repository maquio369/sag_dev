import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.commons";
import { Repository } from "typeorm";
import { Persona } from "./persona.entity";

@Injectable()
export class PersonaService extends BaseService<Persona> {

    constructor(@InjectRepository(Persona) private personaRepo : Repository<Persona>) {
        super();
    }

    getRepository(): Repository<Persona> {
        return this.personaRepo;
    }

}