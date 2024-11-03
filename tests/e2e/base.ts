import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import Actions from './actions';
import Expects from './expects';

const getTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .compile();

  const app = moduleFixture.createNestApplication();
  return app;
};

export default {
  ...Actions,
  ...Expects,
  getTestingApp,
};
