import { INestApplication } from '@nestjs/common';
import base from '../base';
import { TASK_REPOSITORY_ALIAS, TaskRepository } from 'src/modules/tasks/domain/task.repository';
import { DataSource } from 'typeorm';
import { TypeOrmTaskEntity as TaskEntity } from 'src/modules/tasks/infrastructure/persistence/typeorm-task.entity';

describe('TasksController test', () => {
  let app: INestApplication;
  let taskRepository: TaskRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    app = await base.getTestingApp();
    await app.init();
    dataSource = app.get<DataSource>(DataSource);
    taskRepository = app.get<TaskRepository>(TASK_REPOSITORY_ALIAS);
  });

  beforeEach(async () => {
    await dataSource.getRepository(TaskEntity).clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a task', async () => {
    const task = await base.createTaskModel(taskRepository,{});

    const res = await base.getTask(
      app,
      task.getId(),
    );
    base.expectOk(res);
    base.expectTypeJson(res);
    const body = res.body;
    expect(body).toEqual(task.toPrimitives());
  });
});
