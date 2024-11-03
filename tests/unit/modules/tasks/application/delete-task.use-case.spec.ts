import { MockTaskRepository } from 'tests/unit/__mocks__/tasks/mock-task.repository';
import { DeleteTaskUseCase } from 'src/modules/tasks/application/use-cases/delete-task.use-case';
import { UuidMother } from '../../shared/domain/mothers/uuid.mother';

describe('DeleteTask UseCase', () => {
  const taskRepository = new MockTaskRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

  it('should update the task', async () => {
    const taskId = UuidMother.random();
    await deleteTaskUseCase.run({
      taskId,
    });

    taskRepository.assertDeleteTaskHasBeenCalledWith(taskId);
  });
});
