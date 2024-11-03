import { Inject } from '@nestjs/common';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from '../../domain/task.repository';
import { DeleteTaskInput } from '../dtos/delete-task.input';

export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_ALIAS)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({ taskId }: DeleteTaskInput): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
}
