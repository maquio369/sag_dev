import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesController } from './opciones.controller';
import { Opciones } from './opciones.entity';
import { OpcionesService } from './opciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Opciones])],
  providers: [OpcionesService],
  controllers: [OpcionesController]
})
export class OpcionesModule { }