// src/api/tables.controller.ts (en la raíz de api, no en carpeta)
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SistemasService } from './sistemas/sistemas.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { RolesService } from './roles/roles.service';
import { ProductosService } from './productos/productos.service';
import { RequisicionesService } from './requisiciones/requisiciones.service';

@Controller('api/tables')
export class TablesController {
  constructor(
    private readonly sistemasService: SistemasService,
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
    private readonly productosService: ProductosService,
    private readonly requisicionesService: RequisicionesService,
  ) {}

  @Get()
  getTables() {
    return [
      'sistemas',
      'usuarios', 
      'roles',
      'productos',
      'requisiciones',
      'areas',
      'puestos',
      'categorias',
      'unidades_de_medida'
    ];
  }

  @Get(':tableName/schema')
  getTableSchema(@Param('tableName') tableName: string) {
    const schemas = {
      sistemas: {
        columns: [
          { column_name: 'id_sistema', data_type: 'integer', is_primary_key: true, is_identity: true },
          { column_name: 'sistema', data_type: 'varchar', is_nullable: 'NO', comment: 'Sistema' },
          { column_name: 'grupo', data_type: 'varchar', comment: 'Grupo' },
          { column_name: 'abreviatura', data_type: 'varchar', comment: 'Sist.' },
          { column_name: 'objetivo', data_type: 'text', comment: 'Objetivo del sistema' },
          { column_name: 'id_sistema_padre', data_type: 'integer', comment: 'sistemas' },
          { column_name: 'icono', data_type: 'varchar', comment: 'Ícono' },
          { column_name: 'estilo', data_type: 'varchar', comment: 'Estilo' },
          { column_name: 'esta_borrado', data_type: 'boolean', default: false, comment: 'Borrado' }
        ],
        primaryKey: 'id_sistema'
      },
      roles: {
        columns: [
          { column_name: 'id_rol', data_type: 'integer', is_primary_key: true, is_identity: true },
          { column_name: 'rol', data_type: 'varchar', is_nullable: 'NO' },
          { column_name: 'descripcion', data_type: 'text' },
          { column_name: 'esta_borrado', data_type: 'boolean', default: false }
        ],
        primaryKey: 'id_rol'
      },
      usuarios: {
        columns: [
          { column_name: 'id_usuario', data_type: 'integer', is_primary_key: true, is_identity: true },
          { column_name: 'nombre', data_type: 'varchar', is_nullable: 'NO' },
          { column_name: 'email', data_type: 'varchar' },
          { column_name: 'esta_borrado', data_type: 'boolean', default: false }
        ],
        primaryKey: 'id_usuario'
      }
    };

    return schemas[tableName] || { error: 'Table not found' };
  }

  @Get(':tableName')
  async getTableData(
    @Param('tableName') tableName: string,
    @Query('limit') limit: string = '50',
    @Query('page') page: string = '1'
  ) {
    try {
      switch (tableName) {
        case 'sistemas':
          return await this.sistemasService.findAll();
        case 'usuarios':
          return await this.usuariosService.findAll();
        case 'roles':
          return await this.rolesService.findAll();
        case 'productos':
          return await this.productosService.findAll();
        case 'requisiciones':
          return await this.requisicionesService.findAll();
        default:
          return { error: `Table ${tableName} not found` };
      }
    } catch (error) {
      return { error: `Error fetching ${tableName}: ${error.message}` };
    }
  }
}
