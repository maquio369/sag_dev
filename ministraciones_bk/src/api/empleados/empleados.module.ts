import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadosController } from './empleados.controller';
import { Empleados } from './empleados.entity';
import { EmpleadosService } from './empleados.service';

@Module({
    imports: [TypeOrmModule.forFeature([Empleados])],
    providers: [EmpleadosService],
    controllers: [EmpleadosController]
})
export class EmpleadosModule { }