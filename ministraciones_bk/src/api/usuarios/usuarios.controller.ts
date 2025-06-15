import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.commons";
import { BaseService } from "src/commons/service.commons";
import { Usuarios } from "./usuarios.entity";
import { UsuariosService } from "./usuarios.service";

@Controller('api/usuarios')
export class UsuariosController extends BaseController<Usuarios> {

    constructor(private readonly usuariosService: UsuariosService) {
        super();
    }

    getService(): BaseService<Usuarios> {
        return this.usuariosService;
    }

}