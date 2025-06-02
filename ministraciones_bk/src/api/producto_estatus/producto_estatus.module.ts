import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEstatusController } from './producto_estatus.controller';
import { ProductoEstatus } from './producto_estatus.entity';
import { ProductoEstatusService } from './producto_estatus.service' ;

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEstatus])],
    providers: [ProductoEstatusService],
    controllers: [ProductoEstatusController]
})
export class ProductoEstatusModule { }