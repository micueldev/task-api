import { MockTaskRepository } from 'tests/unit/__mocks__/tasks/mock-task.repository';
import { TaskMother } from '../domain/mothers/task.mother';
import { UpdateTaskUseCase } from 'src/modules/tasks/application/use-cases/update-task.use-case';
import { StringMother } from '../../shared/domain/mothers/string.mother';
import { BooleanMother } from '../../shared/domain/mothers/boolean.mother';
import { TaskPriorityMother } from '../domain/mothers/task-priority.mother';
import { TaskCriteria } from 'src/modules/tasks/domain/task-criteria';
import { TaskNotFoundError } from 'src/modules/tasks/domain/task-not-found.error';

describe('UpdateTask UseCase', () => {
  const taskRepository = new MockTaskRepository();
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

  it('should update the task', async () => {
    const task = TaskMother.create({});
    taskRepository.returnOnSearchOneTaskBy(task);

    const newTitle = StringMother.random();
    const newDescription = StringMother.random();
    const newPriority = TaskPriorityMother.random();
    const newIsCompleted = BooleanMother.random();
    await updateTaskUseCase.run({
      id: task.getId(),
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      isCompleted: newIsCompleted,
    });

    taskRepository.assertUpdateTaskHasBeenCalledWith(task);
    taskRepository.assertSearchOneTaskByHasBeenCalledWith(
      TaskCriteria.createById(task.getId()),
    );
  });

  it('should throw error with not saved task', async () => {
    const task = TaskMother.random();
    taskRepository.returnOnSearchOneTaskBy(null);

    const newTitle = StringMother.random();
    const newDescription = StringMother.random();
    const newPriority = TaskPriorityMother.random();
    const newIsCompleted = BooleanMother.random();

    await expect(
      updateTaskUseCase.run({
        id: task.getId(),
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        isCompleted: newIsCompleted,
      }),
    ).rejects.toThrow(TaskNotFoundError);
  });
});
