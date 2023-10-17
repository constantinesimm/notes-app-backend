import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { raw } from 'express';

@Controller({
  host: ':api',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@I18n() i18n: I18nContext): Promise<string> {
    return await i18n.t('errors.hello');
  }
}
