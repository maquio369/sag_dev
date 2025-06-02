import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: 'postgres',
      host: process.env.POSTGRES_HOST?.toString(),
      port: parseInt(process.env.POSTGRES_PORT?.toString() ?? '5432', 10),
      username: process.env.POSTGRES_USER?.toString(),
      password: process.env.POSTGRES_PASSWORD?.toString(),
      database: process.env.POSTGRES_DATABASE?.toString(),
      entities: [__dirname + '/api/**/*.entity{.ts,.js}'],
      logging: false, // Habilita el registro de consultas SQL en la consola
    });