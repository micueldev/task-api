import { INestApplication } from '@nestjs/common';
import base from '../base';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from 'src/modules/tasks/domain/task.repository';
import { DataSource } from 'typeorm';
import { TypeOrmTaskEntity as TaskEntity } from 'src/modules/tasks/infrastructure/persistence/typeorm-task.entity';
import { UuidMother } from 'tests/unit/modules/shared/domain/mothers/uuid.mother';
import { TaskMother } from 'tests/unit/modules/tasks/domain/mothers/task.mother';
import { TaskCriteria } from 'src/modules/tasks/domain/task-criteria';
import { TaskPriorityMother } from 'tests/unit/modules/tasks/domain/mothers/task-priority.mother';

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

  it('should get tasks', async () => {
    let res = await base.getTasks(app);
    base.expectOk(res);
    base.expectTypeJson(res);
    let body = res.body;
    expect(body.length).toEqual(0);

    await base.createTaskModel(taskRepository, {});
    await base.createTaskModel(taskRepository, {});
    await base.createTaskModel(taskRepository, {});
    await base.createTaskModel(taskRepository, {});

    res = await base.getTasks(app);
    base.expectOk(res);
    base.expectTypeJson(res);
    body = res.body;
    expect(body.length).toEqual(4);
  });

  it('should get a task', async () => {
    const task = await base.createTaskModel(taskRepository, {});

    const res = await base.getTask(app, task.getId());
    base.expectOk(res);
    base.expectTypeJson(res);
    const body = res.body;
    expect(body).toEqual(task.toPrimitives());
  });

  it('should get http error with a not existing task', async () => {
    const res = await base.getTask(app, UuidMother.random());
    base.expectNotFound(res);
    base.expectTypeJson(res);
  });

  it('should create a task', async () => {
    const task = TaskMother.create({
      isCompleted: false,
    });

    const res = await base.createTask(app, { ...task.toPrimitives() });
    base.expectOkCreated(res);
    base.expectTypeEmpty(res);

    const taskSaved = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskSaved).toEqual(task);
  });

  it('should update a task', async () => {
    const task = await base.createTaskModel(taskRepository, {});

    const newPriority = TaskPriorityMother.random();

    const res = await base.updateTask(app, task.getId(), {
      priority: newPriority,
    });
    base.expectedNoContent(res);
    base.expectTypeEmpty(res);

    const taskUpdated = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskUpdated.getPriority()).toEqual(newPriority);
  });

  it('should http error on update a not existing task', async () => {
    const newPriority = TaskPriorityMother.random();

    const res = await base.updateTask(app, UuidMother.random(), {
      priority: newPriority,
    });
    base.expectNotFound(res);
    base.expectTypeJson(res);
  });

  it('should delete a task', async () => {
    const task = await base.createTaskModel(taskRepository, {});

    const res = await base.deleteTask(app, task.getId());
    base.expectedNoContent(res);
    base.expectTypeEmpty(res);

    const taskSearched = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskSearched).toBeNull();
  });

  it('should http error on delete a task', async () => {
    const res = await base.deleteTask(app, UuidMother.random());
    base.expectNotFound(res);
    base.expectTypeJson(res);
  });
});
