import { CreateTaskUseCase } from "src/modules/tasks/application/use-cases/create-task.use-case";
import { MockTaskRepository } from "tests/unit/__mocks__/tasks/mock-task.repository";
import { TaskMother } from "../domain/mothers/task.mother";

describe('CreateTask UseCase', () => {
  const TaskRepository = new MockTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(
    TaskRepository,
  );

  it('should save the task', async () => {
    const Task = TaskMother.create({
      isCompleted: false,
      deletedAt: null,
    });

    await createTaskUseCase.run(
      Task.toPrimitives()
    );

    TaskRepository.assertCreateTaskHasBeenCalledWith(Task);
  });
});
