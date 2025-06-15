import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosController } from './permisos.controller';
import { Permisos } from './permisos.entity';
import { PermisosService } from './permisos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Permisos])],
    providers: [PermisosService],
    controllers: [PermisosController]
})
export class PermisosModule {

}