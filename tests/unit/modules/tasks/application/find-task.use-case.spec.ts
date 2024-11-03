import { FindTaskUseCase } from "src/modules/tasks/application/use-cases/find-task.use-case";
import { TaskCriteria } from "src/modules/tasks/domain/task-criteria";
import { TaskNotFoundError } from "src/modules/tasks/domain/task-not-found.error";
import { MockTaskRepository } from "tests/unit/__mocks__/tasks/mock-task.repository";
import { TaskMother } from "../domain/mothers/task.mother";

describe('FindTask UseCase', () => {
  const taskRepository = new MockTaskRepository();
  const findTaskUseCase = new FindTaskUseCase(taskRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the Task', async () => {
    const Task = TaskMother.random();
    taskRepository.returnOnSearchOneTaskBy(Task);

    const criteria = TaskCriteria.createEmpty();
    const response = await findTaskUseCase.run({criteria});

    expect(response).toEqual(Task);
    taskRepository.assertSearchOneTaskByHasBeenCalledWith(criteria);
  });

  it('should throw a not found error', async () => {
    taskRepository.returnOnSearchOneTaskBy(null);

    const criteria = TaskCriteria.createEmpty();
    await expect(findTaskUseCase.run({criteria})).rejects.toThrow(
      TaskNotFoundError,
    );
    taskRepository.assertSearchOneTaskByHasBeenCalledWith(criteria);
  });
});
