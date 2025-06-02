import { Injectable } from '@nestjs/common';
import { AppDataSource } from './DataSource';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

@Injectable()
export class DatabaseService {  
  /***
   * Execute a raw query
   *Example:
   * Import:
   *  import { DatabaseService } from './lib/DatabaseService';
   * Constructor:
   *  constructor(private readonly db: DatabaseService,) {}
   * 
   *  const result = await this.db
      .execute("Select 'val' as col")
      .catch((error) => {
        console.error('Error:', error.message);
      });
   */  
  execute(query: string): Promise<any> {
    const result = AppDataSource.manager.query(query);
    return result;
  }
}
