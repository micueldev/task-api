import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Request, Response } from 'supertest';

export enum Method {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
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
  const apiPath = `/api${path}`;
  const httpApp = request(app.getHttpServer());

  let _request: Request;
  if (method === Method.POST) {
    _request = httpApp.post(apiPath).send(body);
  } else if (method === Method.PATCH) {
    _request = httpApp.patch(apiPath).send(body);
  } else if (method === Method.DELETE) {
    _request = httpApp.delete(apiPath);
  } else {
    _request = httpApp.get(apiPath);
  }

  return _request;
};
