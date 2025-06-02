import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosNoRegistradosController } from './productos-no-registrados.controller';
import { ProductosNoRegistrados } from './productos_no_registrados.entity';
import { ProductosNoRegistradosService } from './productos_no_registrados.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductosNoRegistrados])],
    providers: [ProductosNoRegistradosService],
    controllers: [ProductosNoRegistradosController]
})
export class ProductosNoRegistradosModule { }