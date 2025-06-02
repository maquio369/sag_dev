import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisicionesController } from './requisiciones.controller';
import { Requisiciones } from './requisiciones.entity';
import { RequisicionesService } from './requisiciones.service';

@Module({
    imports: [TypeOrmModule.forFeature([Requisiciones])],
    providers: [RequisicionesService],
    controllers: [RequisicionesController]
})
export class RequisicionesModule { }