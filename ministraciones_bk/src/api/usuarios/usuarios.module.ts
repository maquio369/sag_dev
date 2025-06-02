import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuariosService],
  controllers: [UsuariosController]
})
export class UsuariosModule {}