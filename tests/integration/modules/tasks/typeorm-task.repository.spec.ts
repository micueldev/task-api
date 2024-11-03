import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/modules/tasks/domain/task';
import { TaskCriteria } from 'src/modules/tasks/domain/task-criteria';
import { TaskNotFoundError } from 'src/modules/tasks/domain/task-not-found.error';
import { TypeOrmTestingModule } from 'tests/integration/base';
import { UuidMother } from 'tests/unit/modules/shared/domain/mothers/uuid.mother';
import { TaskMother } from 'tests/unit/modules/tasks/domain/mothers/task.mother';
import { DataSource } from 'typeorm';
import { TypeOrmTaskEntity as TaskEntity } from 'src/modules/tasks/infrastructure/persistence/typeorm-task.entity';
import { TypeOrmTaskRepository as TaskRepository } from 'src/modules/tasks/infrastructure/persistence/typeorm-task.repository';
import { StringMother } from 'tests/unit/modules/shared/domain/mothers/string.mother';
import { TaskPriorityMother } from 'tests/unit/modules/tasks/domain/mothers/task-priority.mother';

describe('TypeOrmTaskRepository test', () => {
  let taskRepository: TaskRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule(),
        TypeOrmModule.forFeature([TaskEntity]),
      ],
      providers: [TaskRepository],
    }).compile();
    dataSource = moduleRef.get<DataSource>(DataSource);
    taskRepository = moduleRef.get<TaskRepository>(TaskRepository);
  });

  beforeEach(async () => {
    await dataSource.getRepository(TaskEntity).clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should search tasks', async () => {
    const task1 = await createRandomTask(taskRepository);
    const task2 = await createRandomTask(taskRepository);
    const task3 = await createRandomTask(taskRepository);
    const tasks = [task1, task2, task3];

    const taskFound = await taskRepository.searchTasksBy(
      TaskCriteria.createEmpty(),
    );
    expect(taskFound).toEqual(tasks);
  });

  it('should not return task because it does not exist', async () => {
    const task = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(UuidMother.random()),
    );
    expect(task).toBeNull();
  });

  it('should create a task', async () => {
    const task = await createRandomTask(taskRepository);

    const taskCreated = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskCreated).toEqual(task);
  });

  it('should test update a exists task', async () => {
    const task = await createRandomTask(taskRepository);

    const newTitle = StringMother.random();
    const newPriority = TaskPriorityMother.random();
    task.updateValues({
      title: newTitle,
      priority: newPriority,
    });
    await taskRepository.updateTask(task);

    const taskUpdated = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskUpdated.getTitle()).toEqual(newTitle);
    expect(taskUpdated.getPriority()).toEqual(newPriority);
  });

  it('should throw error on update a not exists task', async () => {
    const task = TaskMother.random();

    await expect(taskRepository.updateTask(task)).rejects.toThrow(
      TaskNotFoundError,
    );
  });

  it('should test delete a exists task', async () => {
    const task = await createRandomTask(taskRepository);

    await taskRepository.deleteTask(task.getId());

    const taskSaved = await taskRepository.searchOneTaskBy(
      TaskCriteria.createById(task.getId()),
    );
    expect(taskSaved).toBeNull();
  });

  it('should throw error on delete a not exists task', async () => {
    const task = TaskMother.random();

    await expect(taskRepository.deleteTask(task.getId())).rejects.toThrow(
      TaskNotFoundError,
    );
  });
});

const createRandomTask = async (
  taskRepository: TaskRepository,
): Promise<Task> => {
  const task = TaskMother.random();
  await taskRepository.createTask(task);
  return task;
};
