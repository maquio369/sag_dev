import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosRolesController } from './permisos-roles.controller';
import { PermisosRoles } from './permisos_roles.entity';
import { PermisosRolesService } from './permisos-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermisosRoles])],
  providers: [PermisosRolesService],
  controllers: [PermisosRolesController]
})
export class PermisosRolesModule { }