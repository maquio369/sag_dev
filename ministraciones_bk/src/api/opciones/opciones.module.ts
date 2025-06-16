import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesController } from './opciones.controller';
import { Opciones } from './opciones.entity';
import { OpcionesService } from './opciones.service';
import { OpcionesSql } from './opciones.sql';

@Module({
    imports: [TypeOrmModule.forFeature([Opciones])],
    providers: [OpcionesService, OpcionesSql],
    controllers: [OpcionesController]
})
export class OpcionesModule {

}