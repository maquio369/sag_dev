import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import Entity Modules
import { PersonaModule } from 'src/api/persona/persona.module';
import { PuestosModule } from './api/puestos/puestos.module';
import { AreasModule } from './api/areas/areas.module';
import { CategoriasModule } from './api/categorias/categorias.module';
import { RolesModule } from './api/roles/roles.module';
import { EmpleadosModule } from './api/empleados/empleados.module';
import { OrganizacionesModule } from './api/organizaciones/organizaciones.module';
import { PermisosModule } from './api/permisos/permisos.module';
import { PermisosRoles } from './api/permisos_roles/permisos_roles.entity';
import { RequisicionesModule } from './api/requisiciones/requisiciones.module';
import { ProductosNoRegistradosModule } from './api/productos_no_registrado/productos-no-registrados.module';
import { ProductosModule } from './api/productos/productos.module';
import { RequisicionesDetalleModule } from './api/requisiciones_detalle/requisiciones_detalle.module';
import { SistemasModule } from './api/sistemas/sistemas.module';
import { UnidadesDeMedidaModule } from './api/unidades_de_medida/unidades_de_medida.module';
import { UsuariosModule } from './api/usuarios/usuarios.module';
import { ProductoEstatusModule } from './api/producto_estatus/producto_estatus.module';
import { UsuariosService } from './api/usuarios/usuarios.service';
import { Usuarios } from './api/usuarios/usuarios.entity';
import { DatabaseService } from './lib/DatabaseService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST?.toString(),
      port: parseInt(process.env.POSTGRES_PORT?.toString() ?? '5432', 10),
      username: process.env.POSTGRES_USER?.toString(),
      password: process.env.POSTGRES_PASSWORD?.toString(),
      database: process.env.POSTGRES_DATABASE?.toString(),
      entities: [__dirname + '/api/**/*.entity{.ts,.js}'], //, Puestos,'dist/**/*.entity.js'
      logging: false, // Habilita el registro de consultas SQL en la consola   
    }),
    PersonaModule,
    PuestosModule,
    AreasModule,
    CategoriasModule,
    RolesModule,
    EmpleadosModule,
    OrganizacionesModule,
    PermisosModule,
    PermisosRoles,
    RequisicionesModule,
    ProductoEstatusModule,
    ProductosModule,
    ProductosNoRegistradosModule,
    RequisicionesDetalleModule,
    SistemasModule,
    UnidadesDeMedidaModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService,UsuariosService,DatabaseService],
})
export class AppModule {}
