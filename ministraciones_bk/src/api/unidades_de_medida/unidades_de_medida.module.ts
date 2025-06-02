import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadesDeMedida } from './unidades_de_medida.entity';
import { UnidadesDeMedidaService } from './unidades_de_medida.service';
import { UnidadesDeMedidaController } from './unidades_de_medida.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadesDeMedida])],
  providers: [UnidadesDeMedidaService],
  controllers: [UnidadesDeMedidaController]
})
export class UnidadesDeMedidaModule {}