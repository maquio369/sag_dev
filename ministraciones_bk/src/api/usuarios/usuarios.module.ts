import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios])],
    providers: [UsuariosService],
    controllers: [UsuariosController]
})
export class UsuariosModule {

}