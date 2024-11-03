import { Inject } from '@nestjs/common';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from '../../domain/task.repository';
import { TaskService } from '../../domain/task.service';
import { TaskCriteria } from '../../domain/task-criteria';
import { UpdateTaskInput } from '../dtos/update-task.input';

export class UpdateTaskUseCase {
  private readonly taskService: TaskService;

  constructor(
    @Inject(TASK_REPOSITORY_ALIAS)
    private readonly taskRepository: TaskRepository,
  ) {
    this.taskService = new TaskService(this.taskRepository);
  }

  async run({
    id,
    title,
    description,
    priority,
  }: UpdateTaskInput): Promise<void> {
    const criteria = TaskCriteria.createById(id);
    const task = await this.taskService.findTask(criteria);
    task.updateValues({
      title,
      description,
      priority,
    });
    return this.taskRepository.updateTask(task);
  }
}
