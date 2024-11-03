import { CreateTaskUseCase } from 'src/modules/tasks/application/use-cases/create-task.use-case';
import { MockTaskRepository } from 'tests/unit/__mocks__/tasks/mock-task.repository';
import { TaskMother } from '../domain/mothers/task.mother';

describe('CreateTask UseCase', () => {
  const taskRepository = new MockTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);

  it('should save the task', async () => {
    const task = TaskMother.create({
      isCompleted: false,
    });

    await createTaskUseCase.run(task.toPrimitives());

    taskRepository.assertCreateTaskHasBeenCalledWith(task);
  });
});
