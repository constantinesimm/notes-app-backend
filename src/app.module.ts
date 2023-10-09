import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { TypeormService } from './core/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
