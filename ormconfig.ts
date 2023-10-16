import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const datasource: DataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  migrationsTableName: 'migrations',
  migrations: [`*/migrations/*{.ts,.js}`],
  entities: ['*/**/*.entity{.ts,.js}'],
});

datasource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((err) =>
    console.error('Error during Data source initialization', err),
  );

export default datasource;
