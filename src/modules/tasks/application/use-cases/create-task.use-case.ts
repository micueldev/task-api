import { Inject } from '@nestjs/common';
import {
  TASK_REPOSITORY_ALIAS,
  TaskRepository,
} from '../../domain/task.repository';
import { Task } from '../../domain/task';
import { CreateTaskInput } from '../dtos/create-task.input';

export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_ALIAS)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({
    id,
    title,
    description,
    priority,
  }: CreateTaskInput): Promise<void> {
    const task = Task.create({ id, title, description, priority });
    return this.taskRepository.createTask(task);
  }
}
