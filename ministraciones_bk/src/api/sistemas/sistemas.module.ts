import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SistemasController } from './sistemas.controller';
import { Sistemas } from './sistemas.entity';
import { SistemasService } from './sistemas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sistemas])],
    providers: [SistemasService],
    controllers: [SistemasController]
    exports: [SistemasService]
    
})
export class SistemasModule {

}
