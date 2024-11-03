import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'src/modules/shared/infrastructure/filters/http-exception.filter';

export const setApplicationConfig = (app: INestApplication) => {
  const config = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE'
  });
  setGlobalFilters(app);
};

const setGlobalFilters = (app: INestApplication) => {
  app.useGlobalFilters(
   new HttpExceptionFilter()
  );
};
