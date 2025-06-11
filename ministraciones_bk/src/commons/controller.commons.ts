import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { BaseService } from './service.commons';
import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { verifyTokenFromAuthHeader } from 'src/lib/jwt_lib';
export abstract class BaseController<T extends ObjectLiteral> {
  abstract getService(): BaseService<T>;

  @Get('findAll')
  async findAll(): Promise<T[]> {
    return await this.getService().findAll();
  }
  @Get('findAll/:IsDeleted')
  @HttpCode(HttpStatus.OK)
  async findAllIsDeleted(
    @Param('IsDeleted') IsDeleted: boolean,
    @Req() req: any,
  ): Promise<T[]> {
    verifyTokenFromAuthHeader(req.headers['authorization'], req.url);
    const result = await this.getService().findAll(IsDeleted);
    return result ? result : [];
  }
  //verifyToken( this.request, this.response, () => {});

  @Get('findPaginated/:page/:limit/:isDeleted')
  async findPaginated(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('isDeleted') isDeleted?: boolean,
  ): Promise<T[]> {
    const skip = (page - 1) * limit;
    const take = limit;
    return await this.getService().findPaginated(skip, take, isDeleted);
  }
  @Get('findPaginated/:page/:limit')
  async findPaginatedAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<T[]> {
    const skip = (page - 1) * limit;
    const take = limit;
    return await this.getService().findPaginated(skip, take);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: number): Promise<T | null> {
    return await this.getService().findOne(id);
  }

  /*** Find by options */
  // Ejemplo: GET /api/persona/findByOptions/%7B"where"%3A%7B"nombre"%3A"Jade_3"%7D%7D
  // { == %7B   } == %7D   : == %3A   " == %22   , == %2C
  // { "where": { "nombre": "Axel","apellido":"Tik" } } == %7B%22where%22%3A%7B%22nombre%22%3A%22Axel%22%2C%22apellido%22%3A%22Tik%22%7D%7D
  @Get('findByOptions/:parameters')
  async findByOptions(@Param('parameters') parameters: string): Promise<T[]> {
    const options: FindManyOptions<T> = JSON.parse(parameters);
    return this.getService().findByOptions(options);
  }

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() entity: T,
    @Req() req: any,): Promise<T> {
    try {
          return await this.getService().save(entity);
    } catch (error) {      
      if (entity && 'clave' in entity) {
         (entity as any).clave = "••••••••••"
      }
          console.log(this.constructor.name, req.url+":", error.message, entity);
          throw new HttpException(req.url+": "+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
  }

  @Post('saveMany')
  @HttpCode(HttpStatus.CREATED)
  async saveMany(@Body() entities: T[]): Promise<T[]> {
    return await this.getService().saveMany(entities);
  }

  /*
  @Delete('hardDelete/:id')
  @HttpCode(HttpStatus.OK)
  async hardDelete(@Param('id') id: number) {
    return await this.getService().hardDelete(id);
  }
*/
  @Delete('softDelete/:id')
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param('id') id: number) {
    return this.getService().softDelete(id);
  }
  @Delete('softDelete/:id/:isDeleted')
  @HttpCode(HttpStatus.OK)
  async softDeleteIsDeleted(@Param('id') id:number, @Param('isDeleted') isDeleted:boolean) {
    return this.getService().softDelete(id, isDeleted);
  }

  @Get('count')
  async count(): Promise<number> {
    return await this.getService().count();
  }
  @Get('count/:isDeleted')
  async countIsDeleted(@Param('isDeleted') isDeleted: boolean): Promise<number> {
    return await this.getService().count(isDeleted);
  }
}
