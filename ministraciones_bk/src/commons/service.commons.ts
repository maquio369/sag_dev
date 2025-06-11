import { FindManyOptions, Repository, ObjectLiteral } from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {
  abstract getRepository(): Repository<T>;

  findAll(IsDeleted?: boolean): Promise<T[]> {
    //console.log(this.getRepository().metadata.target + String('-' + IsDeleted));
    return this.getRepository().find({
      where: IsDeleted === undefined ? ({} as any) : { esta_borrado: IsDeleted },
    });
  }

  findPaginated(skip: number, take: number, IsDeleted?: boolean): Promise<T[]> {
    return this.getRepository().find({
      where: IsDeleted == undefined ? ({} as any) : { esta_borrado: IsDeleted },
      skip,
      take,
    });
  }

  findOne(id: number): Promise<T | null> {
    //const idField= this.getRepository().metadata.primaryColumns[0].propertyName;
    //return this.getRepository().findOne({ where: { [idField]: id } } as any);
    return this.getRepository().findOne({
      where: {
        [this.getRepository().metadata.primaryColumns[0].propertyName]: id,
      },
    } as any);
  }

  save(entity: T): Promise<T> {
    return this.getRepository().save(entity);
  }

  saveMany(entities: T[]): Promise<T[]> {
    return this.getRepository().save(entities);
  }

  async hardDelete(id: any) {
    const result = await this.getRepository().delete(id);
    return result.affected;
  }

  /// <summary>SoftDelete sets IsDeleted field to false</summary>
  /// <param name="id">identifier of the entity to soft delete</param>
  /// <returns>number of affected rows</returns>
  async softDelete(id: number, isDeleted: boolean = true) {
    const qry = `UPDATE ${this.getRepository().metadata.tableName} SET esta_borrado = ${isDeleted} WHERE ${this.getRepository().metadata.primaryColumns[0].propertyName} = ${id}`;
    const result = await this.getRepository().query(qry);
    return result[1]; //affected rows
  }

  count(IsDeleted?: boolean): Promise<number> {
    return this.getRepository().count({
      where: IsDeleted == undefined ? ({} as any) : { esta_borrado: IsDeleted },
    });
  }

  findByOptions(options: FindManyOptions<T>, IsDeleted?: boolean): Promise<T[]> {
    console.log(options);
    return this.getRepository().find({
      ...options,
      where:
        IsDeleted == undefined
          ? (options.where as any)
          : { ...(options.where as ObjectLiteral), esta_borrado: IsDeleted },
    });
  }
}
