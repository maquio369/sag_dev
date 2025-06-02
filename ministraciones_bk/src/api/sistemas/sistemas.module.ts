import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sistemas } from './sistemas.entity';
import { SistemasService } from './sistemas.service';
import { SistemasController } from './sistemas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sistemas])],
  providers: [SistemasService],
  controllers: [SistemasController]
})
export class SistemasModule {}