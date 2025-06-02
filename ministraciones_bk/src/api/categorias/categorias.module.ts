import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasController } from './categorias.controller';
import { Categorias } from './categorias.entity';
import { CategoriasService } from './categorias.service';

@Module({
    imports: [TypeOrmModule.forFeature([Categorias])],
    providers: [CategoriasService],
    controllers: [CategoriasController]
})
export class CategoriasModule { }