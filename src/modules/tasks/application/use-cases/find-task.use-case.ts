import { Inject } from '@nestjs/common';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from '../../domain/task.repository';
import { Task } from '../../domain/task';
import { FindTaskInput } from '../dtos/find-task.input';
import { TaskService } from '../../domain/task.service';

export class FindTaskUseCase {
  private readonly taskService: TaskService;

  constructor(
    @Inject(TASK_REPOSITORY_ALIAS)
    private readonly taskRepository: TaskRepository,
  ) {
    this.taskService = new TaskService(this.taskRepository);
  }

  async run({ criteria }: FindTaskInput): Promise<Task> {
    return this.taskService.findTask(criteria);
  }
}
