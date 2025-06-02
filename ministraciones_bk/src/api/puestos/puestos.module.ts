import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuestosController } from './puestos.controller';
import { Puestos } from './puestos.entity';
import { PuestosService } from './puestos.service';

@Module({
    imports : [TypeOrmModule.forFeature([Puestos])],
    providers : [PuestosService],
    controllers : [PuestosController]
})
export class PuestosModule {

}
