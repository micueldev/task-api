import { Inject } from '@nestjs/common';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from '../../domain/task.repository';
import { Task } from '../../domain/task';
import { FindTaskInput } from '../dtos/find-task.input';
import { TaskService } from '../../domain/task.service';

export class SearchTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_ALIAS)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({ criteria }: FindTaskInput): Promise<Task[]> {
    return this.taskRepository.searchTasksBy(criteria);
  }
}
