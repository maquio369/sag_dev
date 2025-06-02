import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Productos])],
    providers: [ProductosService],
    controllers: [ProductosController]
})
export class ProductosModule { }