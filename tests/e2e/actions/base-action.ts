import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Request, Response } from 'supertest';

export enum Method {
  GET = 'get',
  POST = 'post',
}

export const requestApi = ({
  app,
  method,
  path,
  body,
}: {
  app: INestApplication;
  method: Method;
  path: string;
  body?: any;
}): Promise<Response> => {
  const apiPath = `${path}`;
  const httpApp = request(app.getHttpServer());

  let _request: Request;
  if (method === Method.POST) {
    _request = httpApp.post(apiPath).send(body);
  } else {
    _request = httpApp.get(apiPath);
  }

  return _request;
};
