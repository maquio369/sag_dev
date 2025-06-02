import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionesController } from './organizaciones.controller';
import { Organizaciones } from './organizaciones.entity';
import { OrganizacionesService } from './organizaciones.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organizaciones])],
    providers: [OrganizacionesService],
    controllers: [OrganizacionesController]
})
export class OrganizacionesModule { }