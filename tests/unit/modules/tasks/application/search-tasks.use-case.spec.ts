import { TaskCriteria } from 'src/modules/tasks/domain/task-criteria';
import { MockTaskRepository } from 'tests/unit/__mocks__/tasks/mock-task.repository';
import { TaskMother } from '../domain/mothers/task.mother';
import { SearchTasksUseCase } from 'src/modules/tasks/application/use-cases/search-tasks.use-case';

describe('SearchTasks UseCase', () => {
  const taskRepository = new MockTaskRepository();
  const searchTasksUseCase = new SearchTasksUseCase(taskRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the Tasks', async () => {
    const task1 = TaskMother.random();
    const task2 = TaskMother.random();
    const task3 = TaskMother.random();
    const tasks = [task1, task2, task3];
    taskRepository.returnOnSearchTasksBy(tasks);

    const criteria = TaskCriteria.createEmpty();
    const response = await searchTasksUseCase.run({ criteria });

    expect(response).toEqual(tasks);
    taskRepository.assertSearchTasksByHasBeenCalledWith(criteria);
  });
});
