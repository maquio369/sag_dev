import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasController } from './areas.controller';
import { Areas } from './areas.entity';
import { AreasService } from './areas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Areas])],
    providers: [AreasService],
    controllers: [AreasController]
})
export class AreasModule {

}