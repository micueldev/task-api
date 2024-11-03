import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import Actions from './actions';
import Expects from './expects';
import { setApplicationConfig } from 'src/config/app';
import { EmptyLogger } from 'tests/unit/modules/shared/integratiom/logers/empty-logger';

const getTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new EmptyLogger())
    .compile();

  const app = moduleFixture.createNestApplication();
  setApplicationConfig(app);
  return app;
};

export default {
  ...Actions,
  ...Expects,
  getTestingApp,
};
