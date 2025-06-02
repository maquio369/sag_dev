import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisicionesDetalle } from './requisiciones_detalle.entity';
import { RequisicionesDetalleService } from './requisiciones_detalle.service';
import { RequisicionesDetalleController } from './requisiciones_detalle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequisicionesDetalle])],
  providers: [RequisicionesDetalleService],
  controllers: [RequisicionesDetalleController]
})
export class RequisicionesDetalleModule {}