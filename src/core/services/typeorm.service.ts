import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(private cfg: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.cfg.get<string>('DB_URL'),
      logging: this.cfg.get('NODE_ENV') !== 'production',
      synchronize: false,
      migrationsRun: false,
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
    };
  }
}
