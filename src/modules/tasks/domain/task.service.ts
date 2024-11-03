import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskCriteria } from './task-criteria';
import { Task } from './task';
import { TaskNotFoundError } from './task-not-found.error';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async findTask(criteria: TaskCriteria): Promise<Task> {
    const task = await this.searchTask(criteria);
    if(!task){
      throw new TaskNotFoundError();
    }
    return task;
  }

  async searchTask(criteria: TaskCriteria): Promise<Task | null> {
    return this.taskRepository.searchOneTaskBy(criteria);
  }
}
